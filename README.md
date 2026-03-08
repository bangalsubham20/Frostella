# Frostella - The Artisanal Patisserie Boutique

Welcome to the **Frostella** repository. This is a high-fidelity, end-to-end e-commerce solution for a premium home-baked cake brand specializing in **100% Eggless** gourmet masterpieces.

## ✨ Boutique Features
- **Artisanal Product Gallery**: A curated menu with category-specific filtering and premium visual presentation.
- **Boutique Reservation System**: A sophisticated checkout flow with custom message support for cakes.
- **Identity & Personalization**: Secure authentication with JWT, user order history, and a private **Wishlist curation** vault.
- **Executive Admin Studio**: A comprehensive dashboard for managing menu inventory, logistics (orders), customer intelligence (reviews), and community members.
- **Gourmet Communications**: Automated HTML email receipts with boutique branding for every successful reservation.
- **Responsive Premium UI**: Built with a "Soft Mesh" design system, high-fidelity micro-animations (Framer Motion), and boutique typography (Playfair Display & Outfit).

## 🚀 Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Redux Toolkit, Framer Motion, Lucide Icons.
- **Backend**: Java 17, Spring Boot 3.2, Spring Security (JWT), Spring Data JPA, Hibernate.
- **Database**: MySQL 8.
- **Integrations**: Cloudinary (Media), Razorpay (Payments), Java Mail (Boutique Notifications).

## 📂 Project Structure
- **/frontend**: React-Vite application with modular component architecture.
- **/backend**: Spring Boot REST API following 3-tier architecture.
- **/docs**: System diagrams and database schemas.

## 🛠️ Installation & Setup

### 1. Database Initialization
Initialize your MySQL instance and run the schema found in `docs/database_schema.sql`.

### 2. Backend Configuration
Configure `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/frostella_db
spring.datasource.username=root
spring.datasource.password=your_password

# Security Credentials
jwt.secret=YOUR_64_CHARACTER_SECURE_KEY

# Integration Keys (Cloudinary, Razorpay, Mail)
cloudinary.cloud_name=...
cloudinary.api_key=...
cloudinary.api_secret=...

razorpay.key_id=...
razorpay.key_secret=...

spring.mail.username=...
spring.mail.password=...
```

### 3. Frontend Configuration
Create a `.env` in the `frontend` directory:
```env
VITE_API_URL=http://localhost:8080/api
VITE_RAZORPAY_KEY=YOUR_RAZORPAY_KEY
```

### 4. Direct Execution
```bash
# Terminal 1: Backend
cd backend && mvn spring-boot:run

# Terminal 2: Frontend
cd frontend && npm install && npm run dev
```

## 🏗️ Deployment
- **Frontend**: Best deployed on **Vercel** or **Netlify** (Root: `/frontend`).
- **Backend**: Optimized for **Render**, **Railway**, or **AWS Elastic Beanstalk**.
- **Database**: Compatible with **Tidb**, **PlanetScale**, or **RDS**.

---
*Designed with Precision for Frostella by Roshni Patra.*
