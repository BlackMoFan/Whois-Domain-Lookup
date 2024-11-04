# Full-Stack Whois Lookup Application

This is a full-stack application that allows users to perform Whois lookups for domain names and contact information. The application consists of a frontend built with React and a backend using Node.js and Express.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Deploying the Application](#deploying-the-application)
- [Error Handling](#error-handling)
- [Additional Notes](#additional-notes)
- [Additional Documentation](#additional-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- Perform Whois lookups for domain names and contact information.
- User-friendly interface with real-time feedback.
- Error handling and toast notifications for user actions.
- Responsive design for better accessibility on various devices.

## Tech Stack

- **Frontend**: React, Axios, DaisyUI
- **Backend**: Node.js, Express, Axios
- **Database**: N/A (optional integration with a database for future features)
- **Deployment**: Railway (or alternative services like Vercel, Netlify, etc.)

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BlackMoFan/Whois-Domain-Lookup.git
   cd Whois-Domain-Lookup
   ```

2. Set up the backend:

   - Navigate to the backend directory:

   ```bash
       cd backend
   ```

   - Install the required dependencies:

   ```bash
       npm install
   ```

   - Create a .env file in the backend directory with the following content:

   ```bash
       WHOIS_API_KEY=your_api_key_here
       PORT=5000
   ```

   - Replace your_api_key_here with your actual Whois API key.

3. Set up the frontend:

   - Navigate back to the main directory and then to the frontend directory:

   ```bash
       cd ..
       cd frontend
   ```

   - Install the required dependencies:

   ```bash
       npm install
   ```

## Running the Application

1. Run the backend server:

   - Navigate to the backend directory:

   ```bash
       cd backend
   ```

   - Start the server:

   ```bash
       node server.js
   ```

   - The server will run on http://localhost:5000

2. Run the frontend application:

   - Open a new terminal window and navigate to the frontend directory:

   ```bash
       cd frontend
   ```

   - Start the React application:

   ```bash
       npm start
   ```

   - The application will run on http://localhost:3000

## Deploying the Application

You can deploy your application to platforms like Heroku, Vercel, or Render. Below are instructions for deploying the backend on Railway and the frontend on Vercel.

### Backend Deployment

1. Go to [Railway](https://railway.app/) and create an account if you haven't already.
2. Create a New Project.
   - Go to the Railway dashboard
   - Click New Project > Deploy from Github repo (connect your GitHub if you haven't already)
   - Choose your GitHub repository containing the Express.js app.
3. Configure the Environment Variables
   - Once Railway imports your project, go to the Settings tab in your Railway project.
   - Click on **Variables**.
   - Add the environment variable for the WHOIS API key:
     - Key: `WHOIS_API_KEY`
     - Value: `your_actual_whois_api_key`

Railway will inject this variable automatically during deployment, so your app can use it without needing the `.env` file locally.

4. Configure the Port

   - Railway uses the `PORT` environment variable by default, which your app already supports with `process.env.PORT || 5000`.
   - Railway will assign a port during runtime, so no additional configuration for the port is necessary.

5. Deploy the Project

   - Go back to your Railway project dashboard and click Deploy if it hasn’t started automatically.
   - Railway will start deploying your app by installing dependencies and building the project.

6. Test the Deployment
   - After a successful deployment, Railway will provide a public URL for your app.
   - Visit the provided URL to check if your app is running correctly.
   - Test your /api/whois endpoint by sending a POST request using tools like Postman or curl to make sure it’s functioning as expected.

### Frontend Deployment

1. Deploy Frontend to Vercel

   - Go to [Vercel](https://vercel.com/) and log in or create an account.
   - Import your frontend project from your Git repository.
   - During the import, Vercel will automatically detect it's a React app and configure the necessary build settings.

2. Set Up Environment Variables in Vercel

   - In the Vercel dashboard, go to your project settings.
   - Navigate to the Environment Variables section.
   - Add a new variable named `REACT_APP_BACKEND_URL` and set its value to the URL of your Railway backend, such as `https://your-backend-url/`.
   - Make sure to save the changes.

3. Redeploy the Project
   - Once the environment variable is set, trigger a redeployment by clicking Deploy in the Vercel dashboard.
   - This will ensure that your React app fetches the backend URL from the environment variable on Vercel.

## Error Handling

- The application handles various error scenarios:
  - Network errors when making API requests.
  - Backend errors when fetching data from the Whois API.
- Toast notifications are displayed for user feedback.

## Additional Notes

- Make sure to check the API limits for the WhoisXML API to avoid hitting rate limits during testing.
- You may want to implement additional error handling features, such as retry mechanisms and more detailed error logging.

## Additional Documentation

- [Axios Documentation](https://axios-http.com/docs/intro)
- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [DaisyUI Documentation](https://daisyui.com/)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute to this project.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
