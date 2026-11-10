# 🏥 MediBook - Hospital Appointment System

A full-stack Hospital Appointment Management System built with **Spring Boot** (Java) and **React** (TypeScript).

## 📸 Screenshots

### Login Page
<img width="483" height="584" alt="Login-page" src="https://github.com/user-attachments/assets/19c9d050-9420-45bf-a9de-2316c969a74a" />

### Dashboard
<img width="1911" height="805" alt="Dashboard" src="https://github.com/user-attachments/assets/7f9b150c-cb90-4f77-ae20-229bca338b93" />

### Book Appointment
<img width="1906" height="753" alt="Book-Appointment-page" src="https://github.com/user-attachments/assets/40132586-1db4-4793-97a4-14d5275a95e0" />

### Doctors Page
<img width="1911" height="805" alt="Doctors-page" src="https://github.com/user-attachments/assets/ebb08376-2fec-4146-bdc3-9e3cc13beb43" />

---

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

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login/register
- 👨‍⚕️ **Doctor Management** — Browse doctors by specialization
- 📅 **Book Appointments** — Select doctor, date/time, and reason
- 📊 **Dashboard** — View all appointments with status tracking
- ❌ **Cancel Appointments** — Cancel pending appointments
- 🏥 **Admin Panel** — Manage all appointments (admin role)

---

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

---

## 🔑 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Patient | patient1 | patient123 |
| Admin | admin | admin123 |

---

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

---

Built by **Anjalee Srivastava** | Java Full-Stack Developer
