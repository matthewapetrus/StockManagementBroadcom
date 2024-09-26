# Stock Management Application

This project is a Stock Management Application that consists of a frontend UI and a mock backend. It allows users to view stock data, filter stocks by tags, and perform actions like deleting stocks.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Mock Backend](#running-the-mock-backend)
- [Running the Frontend](#running-the-frontend)
- [GitHub Repository](#github-repository)

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: JSON file as a mock database

## Setup Instructions

1. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/matthewapetrus/StockManagementBroadcom.git

2. **Change to the Project Directory**

    cd StockManagementBroadcom

3. **Install Dependencies**

    Make sure you have Node.js installed. Then, run the following command to install the required dependencies:

    npm install

## Running the Mock Backend

1. **Navigate to the Backend Directory**

    cd server

2. **Start the Backend Server**

    node server.js

    The server will start and be accessible at http://localhost:3001.

## Running the Frontend

1. **Serve UI using Express**

    In server.js, "app.use(express.static(path.join(__dirname, '../client')));" 
    serves the frontend files located in the client directory when the backend server 
    is running.
    
    Visit http://localhost:3001 to show the UI.

## GitHub Repository**
    
1. **GitHub Repository Link**

    https://github.com/matthewapetrus/StockManagementBroadcom.git