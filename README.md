# Chatbot

## Project Description

The BMW Chatbot is a specialized assistant designed to help users select and recommend the most suitable BMW car according to their preferences. It provides information on car availability in showrooms, along with detailed insights into various BMW models available. Built with a focus on user engagement, the chatbot offers real-time recommendations and availability checks through an intuitive chat interface.

## Installation

### Backend Setup

To set up the BMW Chatbot backend, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the `backend` directory.
3. Install the necessary dependencies by running:
    ```
    npm install
    ```

### Running the Server

To start the backend server, execute:

```
node server.js
```

The server will start and listen for incoming connections, facilitating real-time communication with users through a socket-based chat interface.

### Frontend Setup

The frontend of the BMW Chatbot is built with React and styled with custom CSS to provide a user-friendly interface for interacting with the chatbot. 

#### Installation

Before running the frontend application, ensure Node.js and npm (or Yarn) are installed on your system. Then, follow these steps:

1. Navigate to the `frontend` directory within your project in another terminal.
2. Install the necessary dependencies with the command:
    ```
    npm install
    ```

#### Running the Application

To start the frontend development server, run:

```
npm start
```

This will serve the application on a local web server, usually accessible via `http://localhost:3000`, and open it in your default web browser.

### Components and Styling

The frontend application is composed of several React components and CSS files for styling:

- **App.js & App.css**: The main application component that orchestrates the display of chat messages, input fields, and the chat header.
- **ChatHeader.js & ChatHeader.css**: Displays the chatbot header, including the BMW logo and chatbot name.
- **ChatMessage.js & ChatMessage.css**: Manages the display of chat messages exchanged between the user and the chatbot.
- **InputField.js & InputField.css**: Provides the input field for users to type their messages.
- **Message.js & Message.css**: Defines the structure and appearance of individual messages.
- **index.js**: The entry point for the React application.
- **index.html**: The main HTML file where the React application is mounted.
- **styles.css**: Global styles applied across the application.

## Usage

After starting the application, users can interact with the BMW Chatbot by typing messages into the input field. The chatbot will respond with car recommendations, availability information, or details about BMW models based on the user's queries.

## Technology Stack

- Node.js
- Socket.IO
- React
- Custom CSS for styling

## Contributing

Contributions to the BMW Chatbot project are most welcomed! If you have suggestions for improving the backend, feel free to create a pull request or open an issue.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
