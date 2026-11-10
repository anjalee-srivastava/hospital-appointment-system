# 🏥 MediBook - Hospital Appointment System

A full-stack Hospital Appointment Management System built with **Spring Boot** (Java) and **React** (TypeScript).

## 🚀 Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.2
- Spring Security + JWT Authentication
- Spring Data JPA + Hibernate
- H2 In-Memory Database
- RESTful APIs

**Frontend:**
- React 18 + TypeScript
- React Router v6
- Axios (HTTP client)
- Context API (State management)

## ✨ Features

- 🔐 **JWT Authentication** — Secure login/register
- 👨‍⚕️ **Doctor Management** — Browse doctors by specialization
- 📅 **Book Appointments** — Select doctor, date/time, and reason
- 📊 **Dashboard** — View all appointments with status tracking
- ❌ **Cancel Appointments** — Cancel pending appointments
- 🏥 **Admin Panel** — Manage all appointments (admin role)

## 🛠️ Setup & Run

### Prerequisites
- Java 17+
- Node.js 16+
- Maven

### Backend
```bash
cd backend
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

H2 Console: http://localhost:8080/h2-console

### Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

## 🔑 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Patient | patient1 | patient123 |
| Admin | admin | admin123 |

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new patient |
| POST | /api/auth/login | Login & get JWT token |
| GET | /api/doctors | Get all doctors |
| GET | /api/doctors/available | Get available doctors |
| GET | /api/doctors/specialization/{spec} | Filter by specialization |
| POST | /api/appointments | Book appointment |
| GET | /api/appointments/my | Get my appointments |
| PUT | /api/appointments/{id}/status | Update status (admin) |
| DELETE | /api/appointments/{id} | Cancel appointment |

## 📸 Screenshots

**Login Page** → Clean login with demo credentials shown

**Dashboard** → Stats overview + appointment list with status badges

**Book Appointment** → Doctor selection with filter + date/time picker

**Doctors Page** → Doctor cards with specialization filter

---
Built by **Anjalee Srivastava** | Java Full-Stack Developer
