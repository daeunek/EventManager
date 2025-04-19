## Project Overview

EventManager-Event Registration System is a full-stack web application for event registration and management. The system allows users to browse events, register for them, and manage their registrations. It includes dedicated admin functionality for creating and managing events, categories, and viewing registration data.

## Key Features

### For Users
- Browse and search available events
- Register for events
- View personal event registrations
- Cancel event registrations

### For Administrators
- Create, update, and delete events
- Manage event categories
- View all registrations for events
- Comprehensive event management dashboard

## Technical Architecture

The application follows a modern client-server architecture:

- **Frontend**: Angular application (EventUI)
- **Backend**: ASP.NET Core API (Event.Api)
- **Database**: SQL Server (running in Docker)

## How to Run the Application

### Prerequisites
- Docker installed
- .NET SDK 8.0 or newer
- Node.js and npm
- Angular CLI

### Setting Up the Database
1. Start the SQL Server Docker container:
   ```bash
   docker start sql1
   ```

   If you're setting up for the first time, create the Docker container:
   ```bash
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrongPassword" -p 1433:1433 --name sql1 -d mcr.microsoft.com/mssql/server:2022-latest
   ```
> [!NOTE]
> On Linux System like Ubuntu, you may need to prefix Docker commands with ```bash sudo ``` depending on your docker installation.

### Running the Backend API
1. Navigate to the API directory:
   ```bash
   cd EventManager/Event.Api
   ```

2. Start the API:
   ```bash
   dotnet run
   ```

### Running the Frontend
1. Navigate to the UI directory:
   ```bash
   cd EventManager/EventUI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular application:
   ```bash
   ng serve --open
   ```

The application will automatically open in your default browser at http://localhost:4200.

## Authentication

The system comes with a pre-configured admin account:
- **Email**: admin@event.com
- **Password**: 1234

As shown in the AuthDbContext.cs file, this admin user is seeded into the database with both Admin and User roles, allowing full access to all system features except register event.

## Database Design

The application uses Entity Framework Core with the following key entities:
- Users and Roles (via ASP.NET Core Identity)
- Events
- Categories
- EventRegistrations

The AuthDbContext handles user authentication and authorization with role-based access control.

## API Endpoints

The system exposes several API endpoints for interacting with the application:

- **Auth**: User registration and login
- **Events**: CRUD operations for events
- **Categories**: CRUD operations for categories
- **EventRegistrations**: Managing event registrations

## Technology Stack

- **Backend**: ASP.NET Core 8.0, Entity Framework Core
- **Frontend**: Angular, TypeScript
- **Database**: SQL Server
- **Authentication**: JWT token-based auth with ASP.NET Core Identity
- **Containerization**: Docker for database

## Project Structure

```
EventManager/
Event.Api/
├── Controllers/           # API endpoints for auth, events, categories, registrations
├── Data/                  # Database contexts and configurations 
│   ├── AuthDbContext.cs   # Identity database context with seeded admin user
│   └── EventDbContext.cs  # Main application database context
├── Models/                # Data models for events, categories, registrations
├── DTOs/                  # Data transfer objects
├── Repositories/          # Data access layer
├── Migrations/            # Database migrations
├── Program.cs             # Application entry point
└── appsettings.json       # Configuration files

EventUI/
├── src/
│   ├── app/
│   │   ├── components/    # Shared components (header, footer)
│   │   ├── features/      # Feature modules
│   │   │   ├── auth/      # Authentication (login, register)
│   │   │   ├── category/  # Category management
│   │   │   ├── event/     # Event management
│   │   │   └── registration/ # Registration management
│   │   ├── core/          # Core services, guards, interceptors
│   │   └── shared/        # Shared utilities and models
│   ├── assets/            # Static assets
│   └── environments/      # Environment configurations
├── angular.json           # Angular configuration
└── package.json           # NPM dependencies


