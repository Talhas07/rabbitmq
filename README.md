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
   - Username: `guest`
   - Password: `guest`
   - Note: These credentials only work when connecting from localhost

## Create Admin User (Optional)

```bash
rabbitmqctl add_user admin strong_password
rabbitmqctl set_user_tags admin administrator
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

## Common Commands

```bash
# Check service status
rabbitmqctl status

# List queues
rabbitmqctl list_queues

# List users
rabbitmqctl list_users
```

---

For more detailed information, visit the [official RabbitMQ documentation](https://www.rabbitmq.com/documentation.html).
