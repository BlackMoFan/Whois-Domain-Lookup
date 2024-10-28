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
- **Deployment**: Heroku (or alternative services like Vercel, Netlify, etc.)

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
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
   npm start
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

You can deploy your application to platforms like Heroku, Vercel, or Render. Below are instructions for deploying on Railway.

1. Go to [Railway](https://railway.app/) and create an account if you haven't already.
2. Create a new project.
3. Connect your GitHub repository or upload your project files.
4. In the Railway dashboard, create two services: - Backend Service: Set the environment variable for your API key in the Railway environment settings. - Frontend Service: Point it to the `frontend` directory.
   Deploy both services.

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

License
This project is licensed under the MIT License. See the LICENSE file for details.
