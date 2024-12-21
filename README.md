# 📚 Appointment Management System Documentation
Welcome to the Appointment Management System documentation. This document provides an overview of the project, including installation steps, key endpoints, and usage instructions.

# 📝 Overview
The Appointment Management System is a web-based application designed to streamline appointment booking between users and providers. It includes authentication, role management, appointment scheduling, and real-time availability tracking.

# ⚙️ Tech Stack
Backend: Spring Boot 3.x
Database: PostgreSQL
Authentication: JWT (JSON Web Token)
API Documentation: Springdoc OpenAPI (Swagger UI)
Frontend: Next.js (Optional Integration)
# 💻 Setup and Installation
Clone the Repository

bash
Kodu kopyala
git clone https://github.com/your-repo/appointment-system.git
cd appointment-system
Setup Database

Create a PostgreSQL database (e.g., appointment_db)
Update application.properties with your database credentials.
Build the Project

bash
Kodu kopyala
mvn clean install
Run the Application

bash
Kodu kopyala
mvn spring-boot:run
Access API Documentation

Swagger UI: http://localhost:8080/swagger-ui.html
OpenAPI Docs: http://localhost:8080/v3/api-docs
# 📡 API Endpoints
# 🛡️ 1. Authentication Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login with credentials
POST	/api/auth/refresh	Refresh JWT token
GET	/api/auth/validateToken	Validate a token
Example Payload for Login:

json
Kodu kopyala
{
  "email": "user@example.com",
  "password": "securePassword"
}
# 👤 2. User Endpoints
Method	Endpoint	Description
GET	/api/user	Get all users
GET	/api/user/{email}	Get user by email
Example Response:

json
Kodu kopyala
{
  "userId": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "USER"
}
# 🩺 3. Provider Endpoints
Method	Endpoint	Description
POST	/api/provider/add	Add a user as a provider
GET	/api/provider/getAllProviders	Get all providers
GET	/api/provider/{providerId}	Get provider by ID
Example Payload for Add Provider:

json
Kodu kopyala
{
  "userId": 1
}
Example Response:

json
Kodu kopyala
{
  "providerId": 2,
  "firstName": "Alice",
  "lastName": "Smith"
}
# 📅 4. Appointment Endpoints
Method	Endpoint	Description
POST	/api/appointments/create	Create a new appointment
GET	/api/appointments/{userId}	Get appointments by user ID
GET	/api/appointments/availability/{providerId}	Get provider availability
Example Payload for Create Appointment:

json
Kodu kopyala
{
  "providerId": 2,
  "userId": 1,
  "date": "2024-12-25",
  "time": {
    "hour": 14,
    "minute": 30
  }
}
Example Response:

json
Kodu kopyala
{
  "providerId": 2,
  "userId": 1,
  "date": "2024-12-25",
  "time": {
    "hour": 14,
    "minute": 30
  }
}

# Screenshots

![Screenshot 2024-12-21 133404](https://github.com/user-attachments/assets/219f4021-6607-4e9c-b629-5f0f3a5b9cab)
![Screenshot 2024-12-21 133434](https://github.com/user-attachments/assets/72ed953e-c265-4e72-b56a-e54a15ec0a2e)
![Screenshot 2024-12-21 133442](https://github.com/user-attachments/assets/c9964632-572c-4921-8a9f-6e63cba0b83d)
![Screenshot 2024-12-21 133455](https://github.com/user-attachments/assets/05ccf847-c853-4ce6-9d00-80b10405d845)
![Screenshot 2024-12-21 133502](https://github.com/user-attachments/assets/8ca72e01-b636-4d66-8246-820b47be2579)
![Screenshot 2024-12-21 133515](https://github.com/user-attachments/assets/13f8fe7b-f287-45c7-b956-71cc5b13f086)
![Screenshot 2024-12-21 133522](https://github.com/user-attachments/assets/89c08c05-22c2-4cd8-8c65-41b0002747ca)
![Screenshot 2024-12-21 133541](https://github.com/user-attachments/assets/ae3cba02-62ba-470e-8dc3-a0d3f4508a02)



