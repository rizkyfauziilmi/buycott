# Contributing to the Buycott Project

Thank you for your interest in contributing to the Buycott project! This guide will help you get started with setting up the project on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js [install Node.js](https://nodejs.org/en/download/package-manager)
- pnpm [install pnpm](https://pnpm.io/installation)
- Docker [install Docker](https://docs.docker.com/get-docker/)

## Getting Started

To set up the Buycott project on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/rizkyfauziiilmi/buycott.git
   ```

2. Navigate to the project directory:

   ```bash
   cd buycott
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

5. Set up the database:
   - use docker to start the database (docker required)
   ```bash
    ./start-database.sh
   ```
   - or use your own database
     copy database url to .env file
   ```bash
    DATABASE_URL=your_database_url
   ```
6. Run the database migrations:

   ```bash
   pnpm db:push
   ```

7. Set up the seed data:

   ```bash
   pnpm db:seed
   ```

8. Set up Authentication Environment Variables:
    - To obtain the client id and secret see [Auth js oauth docs](https://authjs.dev/getting-started/authentication/oauth) 
    - Filled with your own client id and secret (.env file)
   ```bash
    DISCORD_CLIENT_ID=""
    DISCORD_CLIENT_SECRET=""
    ```

9. Start the development server:

   ```bash
   pnpm run dev
   ```

10. Open your browser and visit `http://localhost:3000` to see the Buycott application running.

## Contributing Guidelines

Please follow these guidelines when contributing to the Buycott project:

- Fork the repository and create a new branch for your feature or bug fix.
- Submit a pull request with a clear description of your changes.

## Feedback and Support

If you have any questions or need assistance, please feel free to reach out to us on our Discord server.

We appreciate your contributions and look forward to working with you!
