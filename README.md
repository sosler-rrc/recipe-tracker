## Recipe Tracker Application

### Author: Shamus Osler

Recipe Tracker is an application that allows users to create recipes, save them and share them with their other users.

### Steps to run application

1. Create a new clerk account and project, copy the clerk publishable key

2. Clone the [recipe-tracker-db](https://github.com/sosler-rrc/recipe-tracker-db) project from Github and follow the setup steps in the README

3. Create an .env file at the base of the repo and add the following items:
   `VITE_API_BASE_URL` - This is the URL of the API application
   `VITE_CLERK_PUBLISHABLE_KEY` - This is your clerk publishable key

   ```sh
     VITE_API_BASE_URL=http://localhost:3000
     VITE_CLERK_PUBLISHABLE_KEY=<clerk_public_key>
   ```

4. Install dependencies
   `npm i`

5. Run the application
   `npm run dev`

#### User Stories

- As a user I want to create recipes
- As a user I want to view other users recipes
- As a user I want save my favourite recipes from other uers
