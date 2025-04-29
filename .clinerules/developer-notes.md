# OrlaMarie Coach Website

This repository contains the code for the OrlaMarie Coach website, built using Astro with Astrogon theme for the public site and Flowbite components for the admin interface.

## Development Guidelines

Important development guidelines and specifications are available in the `.clinerules` directory:

- `01-project-overview.md` - Project overview and general approach
- `02-content.md` - Content structure guidelines
- `03-flowbite-setup.md` - Flowbite integration guide for admin interface
- `04-technical-specifications.md` - Technical specifications
- `05-project-structure.md` - Recommended project structure
- `06-astrogon-theme.md` - Astrogon theme integration for public site
- `status.md` - Project status tracking (update this regularly)
- `tasks.md` - Project tasks tracking (update this regularly)
- `developer-notes.md` - this file
- `architecture.mermaid` - Mermaid

Developers should review all these documents before starting work on the project.
Developers should update these project files themselves, if necessary, as the project evolves.

**Important Operational Notes:**
- **Status & Task Updates:** Regularly update `.clinerules/status.md` and `.clinerules/tasks` to reflect the current project state after completing significant steps or phases.
- **Development Environment:** Development is being performed on a Windows PC. Ensure commands (especially CLI commands) are compatible with Windows PowerShell or specify `cmd.exe` if necessary. Use `;` for command chaining in PowerShell.

## Technology Stack

- **Public Site**: Astro 5.7 with Astrogon theme
- **Admin Interface**: Flowbite components
- **Styling**: Tailwind CSS
- **Database**: MongoDB (via Docker)
- **Booking System**: Digital Samba integration

## Project Structure

The project follows the recommended structure outlined in `.clinerules/05-project-structure.md`.

## Running Local Services (Docker)

This project uses Docker Compose to manage local development services, starting with MongoDB.

1.  **Install Docker:** Ensure you have Docker Desktop (or Docker Engine + Docker Compose) installed and running on your system.
2.  **Create `.env` file:** Copy the `.env.example` file to `.env` in the project root:
    ```bash
    # On Windows (Command Prompt)
    copy .env.example .env
    # On Windows (PowerShell)
    Copy-Item .env.example .env
    # On Linux/macOS
    cp .env.example .env
    ```
3.  **Update `.env`:** Edit the `.env` file and set a secure `MONGO_ROOT_PASSWORD`. The other defaults should work for local development.
4.  **Start MongoDB:** Run the following command in the project root directory:
    ```bash
    docker-compose up -d
    ```
    This will start the MongoDB container in detached mode. The database will be accessible at `mongodb://localhost:27017`.
5.  **Stop MongoDB:** To stop the container, run:
    ```bash
    docker-compose down
    ```

## Status Updates

Please keep the status document (`.clinerules/status.md`) updated as you progress through the project. This should include completed tasks, current focus, and any decisions made.
