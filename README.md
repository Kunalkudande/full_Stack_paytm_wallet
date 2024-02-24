# Simple Full Stack Paytm Wallet

Welcome to the Simple Full Stack Paytm Wallet project! This project provides a basic implementation of a wallet system where users can sign up, sign in, dashboard, and send money to them.

## Project Preview

Check out the project preview [here](https://paytm-wallet-front.vercel.app/).

## Features

- **User Authentication**: Users can sign up with their email, password, first name, last name, and a random amount between 1 to 10000. User passwords are securely hashed for storage.
- **Login**: Users can sign in with their email and password to access the dashboard.
- **Dashboard**: Upon logging in, users are presented with a dashboard where they can view other users and send money to them.
- **Logout**: Users have the option to log out, which removes the JWT token from local storage for security.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Zod library
