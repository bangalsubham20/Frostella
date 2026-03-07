# Frostella Bakery - End-to-End System

Welcome to the Frostella Bakery repository. This repository contains the complete full-stack solution for Frostella, a home-baked cake brand.

## Deliverables Generated
- **Architecture Diagram**: [docs/architecture_diagram.md](docs/architecture_diagram.md)
- **Database Schema**: [docs/database_schema.sql](docs/database_schema.sql)
- **Spring Boot Backend**: Located in `backend/` directory.
- **React Frontend**: Located in `frontend/` directory.

## System Architecture summary
- **Frontend**: React, Vite, TailwindCSS, React Router, Redux (or Context API), Axios
- **Backend**: Java 17, Spring Boot 3.2.3, Spring Security, JWT Authentication, Spring Data JPA
- **Database**: MySQL 8+
- **External Dependencies**: Cloudinary (Images), Razorpay (Payment), Email notification services.

## Environment Configuration

### Backend (`application.properties`)
Create a `application-dev.properties` or configure your environment variables:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/frostella_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_db_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Security
jwt.secret=9a4f2c8d3b7a1e6f45c8a0b3f267d8b1d4e6f3c8a9d2b5f8e3a9c8b5f6v8a3d9
jwt.expiration=86400000

# Server
server.port=8080
```

### Frontend (`.env`)
Create a `.env` file in the `frontend` folder to connect to the backend:
```env
VITE_API_URL=http://localhost:8080/api
VITE_RAZORPAY_KEY=your_razorpay_test_key
```

## Running the Application Locally

### Database Initialization
Run the schema provided in `docs/database_schema.sql` on your MySQL server to initialize the database before running the backend.

### Backend Setup
1. Open terminal and navigate to `backend/`.
2. Run `mvn clean install` to install dependencies.
3. Run `mvn spring-boot:run` to start the server at `http://localhost:8080`.

### Frontend Setup
1. Open terminal and navigate to `frontend/`.
2. Run `npm install` to install React dependencies and TailwindCSS.
3. Run `npm run dev` to start the Vite development server.
4. Visit `http://localhost:5173`.

## Deployment Instructions

### Database (PlanetScale / AWS RDS)
1. Provision a MySQL database on PlanetScale or AWS RDS.
2. Run the `docs/database_schema.sql` against the new database.
3. Keep the host, username, and password credentials handy.

### Backend (Render)
1. Commit and push the code to a GitHub repository.
2. Log into Render and create a new Web Service.
3. Connect the GitHub repo and choose the `backend/` directory.
4. Build Command: `mvn clean package -DskipTests`
5. Start Command: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
6. Add Environment Variables from the configuration section above.

### Frontend (Vercel / Netlify)
1. Log into Vercel/Netlify and import your GitHub repository.
2. Select the `frontend` directory as the Root Directory.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add the `VITE_API_URL` pointing to your deployed Render backend URL.
6. Deploy your application.

## API Endpoints (Quick Reference)
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate and receive a JWT token
- `GET /api/products` - Retrieve all available cakes and items
- `POST /api/orders` - Place a new order
- `GET /api/orders/user/{userId}` - View orders for a specific user

## Sample Test Data (Optional)
Insert mock data directly using SQL to test features before creating the admin panel interface. See the database documentation for tables to populate (Products Table, etc.).
