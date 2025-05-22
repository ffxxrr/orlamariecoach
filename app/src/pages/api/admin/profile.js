import { connectToDatabase } from '../../../utils/db/connect';
import CoachProfile from '../../../utils/db/models/CoachProfile';
import { checkAuthSession } from '../../../utils/auth/session'; // Correct function name
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// Define the directory where profile images will be stored relative to the *app* directory
// IMPORTANT: This path must resolve to inside the `app/public` directory to be publicly accessible.
const UPLOAD_DIR_RELATIVE = 'public/uploads/profile'; // Relative to app dir (process.cwd())
const UPLOAD_DIR_PUBLIC_PATH = '/uploads/profile'; // The base URL path

// Ensure the upload directory exists
const ensureUploadDirExists = async () => {
  const currentCwd = process.cwd();
  const uploadPath = path.resolve(currentCwd, UPLOAD_DIR_RELATIVE);
  console.log(`[Upload Debug] Current working directory (cwd): ${currentCwd}`);
  console.log(`[Upload Debug] Relative upload dir: ${UPLOAD_DIR_RELATIVE}`);
  console.log(`[Upload Debug] Attempting to ensure/create upload directory at resolved path: ${uploadPath}`);
  try {
    await fs.mkdir(uploadPath, { recursive: true });
    // Check if it actually exists after trying to create
    try {
        await fs.access(uploadPath);
        console.log(`[Upload Debug] Upload directory successfully ensured/verified: ${uploadPath}`);
    } catch (accessError) {
         console.error(`[Upload Debug] FAILED to access upload directory after mkdir attempt: ${uploadPath}`, accessError);
         throw new Error(`Failed to create or access upload directory: ${uploadPath}`);
    }
  } catch (error) {
    console.error(`[Upload Debug] Error during fs.mkdir for ${uploadPath}:`, error);
    // Decide if this should be a fatal error for the endpoint
    throw new Error('Could not create upload directory.');
  }
};

export async function GET({ request, cookies }) {
  // Pass an object mimicking the Astro global to checkAuthSession
  const sessionPayload = checkAuthSession({ request, cookies });
  // checkAuthSession returns the payload directly, or null if invalid/not found
  if (!sessionPayload) {
    return new Response(JSON.stringify({ message: 'Unauthorized - Invalid or missing session' }), { status: 401 });
  }

  try {
    await connectToDatabase();
    // Find the single profile document. Since it's a singleton, findOne without args works.
    const profile = await CoachProfile.findOne({});

    if (!profile) {
      // Return a default structure or null if no profile exists yet
      return new Response(JSON.stringify(null), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(profile), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching coach profile:', error);
    return new Response(JSON.stringify({ message: 'Error fetching profile', error: error.message }), { status: 500 });
  }
}

export async function PUT({ request, cookies }) {
  const sessionPayload = checkAuthSession({ request, cookies });
  if (!sessionPayload) {
    return new Response(JSON.stringify({ message: 'Unauthorized - Invalid or missing session' }), { status: 401 });
  }

  try {
    await ensureUploadDirExists(); // Make sure the upload directory is ready

    const formData = await request.formData();
    await connectToDatabase();

    const dataToUpdate = {
      title: formData.get('title'),
      bio: formData.get('bio'),
      // We will conditionally add imageUrl based on file upload
    };

    const profileImageFile = formData.get('profileImage');
    let oldImagePath = null;

    // Fetch the current profile to check for an existing image
    const currentProfile = await CoachProfile.findOne({});
    console.log('[Upload Debug] Current profile data fetched:', currentProfile); // Log fetched data
    if (currentProfile && currentProfile.imageUrl) {
        // Construct the server path from the public URL path, relative to app dir (process.cwd())
        const potentialPath = currentProfile.imageUrl.startsWith('/') ? currentProfile.imageUrl.substring(1) : currentProfile.imageUrl;
        // Check if potentialPath starts with 'uploads/' as expected
        if (potentialPath.startsWith('uploads/')) {
             oldImagePath = path.resolve(process.cwd(), 'public', potentialPath);
             console.log(`[Upload Debug] Constructed old image server path for deletion: ${oldImagePath}`); // Log constructed path
        } else {
             console.warn(`[Upload Debug] Unexpected imageUrl format for old image path calculation: ${currentProfile.imageUrl}`);
             oldImagePath = null; // Avoid deleting something unexpected
        }
    } else {
         console.log('[Upload Debug] No existing profile or imageUrl found.');
    }


    // Check if a file was actually uploaded and has size > 0
    if (profileImageFile && typeof profileImageFile === 'object' && profileImageFile.size > 0) {
      // --- File Upload Handling ---
      const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(profileImageFile.type)) {
        throw new Error('Invalid file type. Only PNG, JPG, GIF, WEBP allowed.');
      }
      if (profileImageFile.size > maxSize) {
        throw new Error('File size exceeds 5MB limit.');
      }

      // Generate unique filename
      const fileExtension = path.extname(profileImageFile.name);
      const uniqueSuffix = crypto.randomBytes(8).toString('hex');
      const uniqueFilename = `${Date.now()}-${uniqueSuffix}${fileExtension}`;

      const savePath = path.resolve(process.cwd(), UPLOAD_DIR_RELATIVE, uniqueFilename);
      let publicImageUrl = `${UPLOAD_DIR_PUBLIC_PATH}/${uniqueFilename}`;
       // Ensure it starts with a slash, just in case
      if (!publicImageUrl.startsWith('/')) {
          publicImageUrl = '/' + publicImageUrl;
      }

      console.log(`[Upload Debug] Attempting to save file to: ${savePath}`);
      console.log(`[Upload Debug] Final public URL path to be saved in DB: ${publicImageUrl}`); // Log final path

      try {
        // Convert file data to buffer and write to disk
        const buffer = Buffer.from(await profileImageFile.arrayBuffer());
        await fs.writeFile(savePath, buffer);
        console.log(`[Upload Debug] File write successful: ${savePath}`);
      } catch (writeError) {
        console.error(`[Upload Debug] File write FAILED for ${savePath}:`, writeError);
        // Re-throw the error to be caught by the main try-catch block
        throw new Error(`Failed to save uploaded file: ${writeError.message}`);
      }


      // Add the public URL path to the data to be saved in DB
      dataToUpdate.imageUrl = publicImageUrl;

      // Delete the old image file if it exists and is different from the new one
      if (oldImagePath && oldImagePath !== savePath) {
          try {
              console.log(`[Upload Debug] Attempting to delete old image file: ${oldImagePath}`); // Log deletion attempt
              await fs.unlink(oldImagePath);
              console.log(`[Upload Debug] Old image deleted successfully: ${oldImagePath}`); // Log success
          } catch (unlinkError) {
              // Log error but don't fail the request if old file deletion fails
              console.error(`[Upload Debug] Failed to delete old image ${oldImagePath}:`, unlinkError); // Log failure
          }
      }
      // --- End File Upload Handling ---
    } else if (currentProfile) {
        // No new file uploaded, retain the existing image URL unless explicitly told to remove
        // (We haven't added a 'removeImage' flag yet, so just keep the old one)
        dataToUpdate.imageUrl = currentProfile.imageUrl;
    } else {
        // No new file and no current profile, set imageUrl to null or undefined
        dataToUpdate.imageUrl = null;
    }


    // Use findOneAndUpdate with upsert:true to create if not found, update if found.
    // The filter {} matches any document, effectively targeting the singleton.
    const updatedProfile = await CoachProfile.findOneAndUpdate(
      {}, // Find any document (the singleton)
      dataToUpdate, // The potentially updated data including new imageUrl
      {
        new: true, // Return the updated document
        upsert: true, // Create if it doesn't exist
        runValidators: true, // Ensure schema validation runs on update
      }
    );

    return new Response(JSON.stringify({ message: 'Profile updated successfully', profile: updatedProfile }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating coach profile:', error);
    // Handle validation errors specifically if needed
    if (error.name === 'ValidationError') {
      return new Response(JSON.stringify({ message: 'Validation Error', errors: error.errors }), { status: 400 });
    }
    return new Response(JSON.stringify({ message: 'Error updating profile', error: error.message }), { status: 500 });
  }
}

// Optional: Add DELETE if you want to allow removing the profile entirely
// export async function DELETE({ request, cookies }) { ... }

// Handle other methods if necessary
export async function ALL({ request }) {
  if (request.method !== 'GET' && request.method !== 'PUT') {
    return new Response(JSON.stringify({ message: `Method ${request.method} Not Allowed` }), { status: 405 });
  }
  // Fallback or default response if needed
}
