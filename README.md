# My React.js App with Vite and Tailwind CSS

This is a React.js app built with Vite and styled with Tailwind CSS. The app is deployed on Netlify. This README provides instructions for installing and deploying the app.

## Installation

To run the app locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/tanjidulahad/spacex.git

2. Navigate to the project directory:

    ```bash
    cd my-react-vite-tailwind-app

3. Install the project dependencies using Yarn or npm:

    ```bash
    # Using Yarn
    yarn
    # Using npm
    npm install

4. Start the development server:

    ```bash
    # Using Yarn
    yarn dev

    # Using npm
    npm run dev
    The app will be available at http://127.0.0.1:5173/.

## Deployment on Netlify
To deploy the app on Netlify, I follow these steps:

1. Create a Netlify account if you don't already have one: Netlify Sign-Up

2. Log in to your Netlify account.

3. Click the "New site from Git" button on the Netlify dashboard.

4. Choose your Git provider (e.g., GitHub), and grant Netlify access to your repository.

5. Configure the build settings:

    * Build Command: yarn build (or npm run build)
    * Publish Directory: dist

6. Click the "Deploy Site" button to trigger the deployment.

7. Netlify will build and deploy your app. Once the deployment is complete, you'll receive a unique URL where your app is hosted.

Additional Configuration
You can customize the app and adjust the Tailwind CSS configuration as needed. Be sure to check the Vite and Tailwind CSS documentation for more information:

Vite Documentation: [Vite.js](https://vitejs.dev/)
Tailwind CSS Documentation: [Tailwind CSS](https://tailwindcss.com/)
