# Your React Firebase Shop Application

This is a sample React application that uses Firebase for managing shops. Users can add, edit, and delete shops, and the application features a dynamic map that updates with changes to shop data.

## Prerequisites

Before starting, ensure you have the following tools installed on your system:

- Node.js: [Download here](https://nodejs.org/)
- npm (Node Package Manager): [Download here](https://www.npmjs.com/)

## Setup

1. Clone the repository:

git clone https://github.com/your-username/your-react-firebase-shop.git

2. Navigate to the project directory:

cd your-react-firebase-shop

3. Install the project dependencies:

npm install

4. Create a Firebase project and obtain your Firebase configuration. You can follow the guide [here](https://firebase.google.com/docs/web/setup).

5. Create a `.env` file in the project root and add your Firebase configuration:

REACT_APP_API_KEY=your_api_key REACT_APP_AUTH_DOMAIN=your_auth_domain REACT_APP_DATABASE_URL=your_database_url REACT_APP_PROJECT_ID=your_project_id REACT_APP_STORAGE_BUCKET=your_storage_bucket REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id REACT_APP_APP_ID=your_app_id

6. Start the development server:

npm run dev

Now, you should be able to access the application in your browser at http://localhost:3000.

## Build

To create a production build of the application, use the command:

npm run build
