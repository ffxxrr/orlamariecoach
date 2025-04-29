// src/pages/api/ping.js - Simple test route

export async function GET() {
  console.log("--- Reached /api/ping GET handler ---");
  return new Response(JSON.stringify({ message: 'pong' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
