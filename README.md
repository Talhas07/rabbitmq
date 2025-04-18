# NestJS Microservices with RabbitMQ & GraphQL

This guide explains how to set up and run a microservices architecture with NestJS applications using GraphQL and RabbitMQ for inter-service communication.

## Architecture Overview

Our system consists of two NestJS microservices:

- **Auth Service** (port 3002): Acts as a RabbitMQ client and exposes a GraphQL API
- **users Service** (port 3001): Acts as a RabbitMQ server and handles users data operations

The services communicate via RabbitMQ message broker, with the Auth Service sending requests and the users Service responding with users data.

## Prerequisites

- Node.js 
- RabbitMQ server running ([Installation guide](#rabbitmq-windows-setup-guide))
- NPM or Yarn

## RabbitMQ Setup
  Exlained Below this tutorial

## Starting the Services: Open two terminals on the main repository and run these commands on each terminal 

### users Service (RabbitMQ Server) & Auth Service (RabbitMQ Client)

1. Navigate to the users service directory in one terminal and auth service directory in the other 
   ```bash
   cd users-service
   ```
      ```bash
   cd auth-service
   ```

2. Install dependencies on each terminal:
   ```bash
   npm install
   ```

3. Start the service on each terminal:
   ```bash
   npm run start
   ```

4. The users Service will start on port 3001 and establish itself as a RabbitMQ server
    The Auth Service will start on port 3002 and connect to RabbitMQ as a client

## How RabbitMQ Works in Our Setup

1. **Message Queue**: RabbitMQ acts as a message broker that facilitates communication between our services
   
2. **Producer/Consumer Model**:
   - Auth Service (producer) sends messages to RabbitMQ
   - users Service (consumer) listens for messages and processes them
   - users Service sends responses back through RabbitMQ
   - Auth Service receives and processes these responses

3. **Flow of a Request**:
   - Client sends a GraphQL query to Auth Service
   - Auth Service sends a message to RabbitMQ
   - users Service receives the message, processes it, and sends the result back
   - Auth Service returns the response to the client

## Testing the API

To test the microservices communication:

1. Ensure both services and RabbitMQ are running
2. Use a GraphQL client (like Apollo Studio, Insomnia, Postman) or cURL to send this query to the Auth Service:

   Endpoint: `http://localhost:3002/graphql`

   Query:
   ```graphql
   query Validate {
       validate(id: "123") {
           id
           name
       }
   }
   ```

3. You should receive the following response:
   ```json
   {
       "data": {
           "validate": {
               "id": "123",
               "name": "John Doe"
           }
       }
   }
   ```

## How It Works Behind the Scenes

When you send the GraphQL query to the Auth Service:

1. Auth Service receives the GraphQL query
2. It creates a message with the users ID and publishes it to a RabbitMQ exchange
3. The message is routed to a queue that the users Service is subscribed to
4. users Service consumes the message, retrieves the users data for ID "123"
5. users Service publishes a response message to a reply queue
6. Auth Service receives the response from the reply queue
7. Auth Service formats and returns the GraphQL response to the client

## Troubleshooting

- **Services won't start**: Ensure RabbitMQ is running with `rabbitmqctl status`
- **Connection refused errors**: Check if the RabbitMQ connection settings match in both services
- **No response from API**: Verify both services are running and check logs for errors
- **GraphQL errors**: Make sure the GraphQL schema is properly defined in both services



For more information about NestJS microservices with RabbitMQ, visit the [NestJS documentation](https://docs.nestjs.com/microservices/rabbitmq).



# RabbitMQ Windows Setup Guide

A minimal guide for installing RabbitMQ on Windows, setting up PATH, and configuring the management plugin.

## Install Erlang

1. Download Erlang from the [official website](https://www.erlang.org/downloads)
2. Run the installer with administrator privileges
3. Verify installation:
   ```bash
   erl -version
   ```

## Install RabbitMQ

1. Download RabbitMQ installer from the [official website](https://www.rabbitmq.com/download.html)
2. Run the installer as administrator
3. Verify installation:
   ```bash
   rabbitmqctl status
   ```
4. If the service isn't running:
   ```bash
   net start RabbitMQ
   ```

## PATH Configuration

RabbitMQ should automatically add its binary directory to your PATH:
- `C:\Program Files\RabbitMQ Server\rabbitmq_server-x.y.z\sbin`

If commands aren't recognized, add to PATH manually:
1. Press `Win + X` and select "System"
2. Click "Advanced system settings" → "Environment Variables"
3. Find "Path" in System variables, click "Edit"
4. Click "New" and add the RabbitMQ sbin directory path
5. Click "OK" to save changes
6. Open a new Command Prompt to apply changes

## Enable Management Plugin

1. Run as administrator:
   ```bash
   rabbitmq-plugins enable rabbitmq_management
   ```
2. Restart the RabbitMQ service:
   ```bash
   net stop RabbitMQ
   net start RabbitMQ
   ```
3. Access the management interface at [http://localhost:15672/](http://localhost:15672/)
4. Default credentials:
   - usersname: `guest`
   - Password: `guest`
   - Note: These credentials only work when connecting from localhost

## Create Admin users (Optional)

```bash
rabbitmqctl add_users admin strong_password
rabbitmqctl set_users_tags admin administrator
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

## Common RabbitMQ Commands

```bash
# Check service status
rabbitmqctl status

# List queues
rabbitmqctl list_queues

# List userss
rabbitmqctl list_userss

# List exchanges
rabbitmqctl list_exchanges

# List connections
rabbitmqctl list_connections
```

---

For more detailed information, visit the [official RabbitMQ documentation](https://www.rabbitmq.com/documentation.html).
