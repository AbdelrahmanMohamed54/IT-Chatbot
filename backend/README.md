# BMW Chatbot Backend

## Overview

The backend of the BMW Chatbot powers the chat functionality, handling user messages, executing the keyword spotting algorithm to recommend BMW cars, and checking for car availability in the showroom. Built with Node.js and Socket.IO, it facilitates real-time bi-directional event-based communication between the chatbot and users.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository to your local machine, if you haven't already.
2. Navigate to the `backend` folder.
3. Install the necessary dependencies by running:

```bash
npm install
```

This will install all the required packages, including `socket.io` for WebSocket communication.

### Running the Server

To start the server, run:

```bash
node server.js
```

This command launches the server on the default port `8000`. The server will now listen for connections and handle incoming messages from users.

## Project Structure

- **server.js**: The main server file that sets up the HTTP and WebSocket servers using `http` and `socket.io` libraries, respectively. It includes the logic for handling user connections, receiving messages, and sending responses.
- **Availability.json**: A JSON file containing data about the availability of BMW cars in the showroom. This file is read by the server to check car availability and recommend cars based on user queries.
- **package.json** & **package-lock.json**: These files manage the project dependencies and lock them to specific versions to ensure consistency across installations.

## Features

- **Real-time Chat**: Utilizes WebSockets to offer real-time communication between the server and clients.
- **Keyword Spotting Algorithm**: Analyzes user messages to match keywords related to car models, availability, and features, providing relevant responses.
- **Car Availability**: Reads from `Availability.json` to inform users about the availability of specific car models in the showroom.
- **Fallback Messages**: Offers helpful fallback responses when the chatbot fails to understand the user's query after several attempts.

## Usage

The backend server is designed to work in conjunction with the frontend part of the BMW Chatbot project. It listens for messages sent by users through the frontend interface, processes those messages, and sends back responses in real time.

## Contributing

Contributions are welcome! If you have suggestions for improving the backend, feel free to create a pull request or open an issue.

## License

This project is licensed under the MIT License. See the LICENSE file in the root directory for more information.
