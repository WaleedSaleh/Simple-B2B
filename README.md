# Simple B2B

Simple B2B App works with nodejs and typescript

## Technologies Used

- **Node.js**: Runtime environment for the backend.
- **TypeORM**: ORM tool for database management.
- **PostgreSQL**: Database for storing application data.
- **Docker**: Containerization of the application and its environment for easy deployment.
- **Express**: Web application framework for Node.js.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js (at least v14.x).
- You have installed PostgreSQL and it is running on the default port.
- You have installed Docker and Docker Compose if you intend to use Docker for running the application.

## Setup Instructions

### Cloning the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/WaleedSaleh/Simple-B2B.git 
cd your-project-name

Configuration

Copy the sample environment configuration file and edit it to match your local setup:
cp .env.example .env

Edit the .env file to include your database connection details and any other environment specific variables.



Install Dependencies

npm install

Running the Application Manually

npm run build

Database Migrations

Run the following command to perform database migrations:


npm run typeorm -- migration:generate src/migrations/InitialSchema -d src/data-source.ts

npm run typeorm migration:run -- -d src/data-source.ts

Database Seeding

Seed the database to populate initial data:

npm run seed

Starting the Application

Start the server with:

npm run serve

The server should now be running on http://localhost:3000.


Running the Application with Docker

Build the Docker image and run the container using Docker Compose:

docker-compose up --build

This command builds the Docker image, sets up the entire environment, and starts the services defined in your docker-compose.yml, including your application and the PostgreSQL database.
Accessing the Application

Once the application is running, you can access it via:

http://localhost:3000

Replace localhost with the server IP if deployed on a remote machine.
