# Integrated Wellness Management System 

##  Project Overview

The **Integrated Wellness Management System (IWMS)** is a web-based application designed to manage wellness center activities through a centralized platform. It helps administrators, members, and trainers manage wellness services, appointments, memberships, payments, attendance, and daily progress.

The system follows a microservices architecture with a React frontend, Spring Boot backend services, and PostgreSQL database integration. It also supports semantic search for wellness content using vector embeddings.

##  Objectives

- Digitize wellness center management.
- Simplify member, trainer, and service management.
- Manage appointments, payments, attendance, and wellness progress.
- Provide secure authentication and role-based access.
- Enable semantic search for relevant wellness content.
- Use containerization to simplify application deployment.

##  Technologies Used

| Component | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript, CSS |
| Backend | Java, Spring Boot, REST APIs |
| Database | PostgreSQL |
| Vector Search | pgvector |
| Embedding Model | Sentence Transformers – `all-MiniLM-L6-v2` |
| Authentication | JWT |
| Inter-service Communication | REST APIs, Kafka integration |
| Containerization | Docker, Docker Compose |
| Build Tool | Maven |

##  System Architecture

```text
React Frontend (Vite)
        |
        v
   API Gateway
        |
        v
 Spring Boot Microservices
        |
        +------ PostgreSQL
        |
        +------ pgvector
        |
        +------ Kafka Integration
```

The frontend communicates with backend services through REST APIs. PostgreSQL stores application data, while pgvector supports similarity-based retrieval of wellness content using embeddings.

##  Microservices

The project contains the following services:

1. **Wellness API Gateway** – Entry point for routing client requests to backend services.
2. **Wellness Auth Service** – Handles user authentication and JWT-related functionality.
3. **Wellness Member Service** – Manages member-related operations.
4. **Wellness Trainer Service** – Handles trainer information and operations.
5. **Wellness Service** – Manages wellness-related features, progress, appointments, and content.
6. **Wellness Notification Service** – Supports notification and email-related functionality.
7. **Wellness Frontend** – Provides the user interface for administrators, members, and trainers.

##  Key Features

- User authentication and authorization using JWT.
- Member and trainer management.
- Wellness service management.
- Appointment management.
- Payment and attendance tracking.
- Daily wellness progress and task management.
- Wellness content storage and semantic search.
- REST API-based communication between frontend and backend.
- Docker Compose configuration for running the application services together.

##  Semantic Search

The semantic search component uses the `all-MiniLM-L6-v2` Sentence Transformer model to generate **384-dimensional embeddings** for wellness content.

The embeddings are stored in PostgreSQL using pgvector. When a user submits a query, the system can retrieve semantically similar content using vector similarity search.

### Workflow

1. Prepare wellness content.
2. Generate embeddings using Sentence Transformers.
3. Store the embeddings in PostgreSQL with pgvector.
4. Convert a user's search query into an embedding.
5. Retrieve similar content using vector similarity.
6. Return relevant results through the backend to the frontend.

##  Project Structure

```text
IWMS/
├── docker-compose.yml
├── .gitignore
├── wellness-api-gateway/
├── wellness-auth-service/
├── wellness-member-service/
├── wellness-notification-service/
├── wellness-service/
│   └── wellness-service/
├── wellness-trainer-service/
└── wellness-frontend/
    ├── public/
    ├── src/
    │   ├── pages/
    │   ├── assets/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── Dockerfile
```

##  Prerequisites

Install the following before running the project:

- Git
- Docker Desktop with Docker Compose
- Java and Maven if running backend services outside Docker
- Node.js and npm if running the frontend outside Docker
- PostgreSQL configured for the application

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sriramadasuanushka/A7_DBMS_G4.git
cd A7_DBMS_G4/IWMS
```

### 2. Configure environment variables

The application configuration uses environment-variable placeholders for database credentials, JWT secrets, and email credentials.

Configure the required variables before starting the services. Use your own local values and **never commit real passwords, tokens, API keys, or email credentials**.

The exact variables and database settings should match the configuration of each microservice.

### 3. Start the application

From the `IWMS` directory, run:

```bash
docker compose up --build
```

To run the services in the background:

```bash
docker compose up --build -d
```

To inspect running containers:

```bash
docker compose ps
```

To view logs:

```bash
docker compose logs -f
```

To stop the services:

```bash
docker compose down
```

**Note:** The application requires valid environment configuration and any required database or Kafka services. Configure these dependencies before expecting all features to work.

##  Security

- Sensitive configuration values are provided through environment variables.
- Local environment files should not be committed to GitHub.
- Use strong JWT secrets and database passwords.
- Do not publish personal credentials or production secrets.

##  Future Enhancements

- Enhanced wellness analytics and reporting.
- Personalized wellness recommendations.
- Improved multilingual support.
- More comprehensive automated testing.
- Enhanced monitoring and deployment automation.

##  Contributors

Developed as an academic project for wellness center management.


