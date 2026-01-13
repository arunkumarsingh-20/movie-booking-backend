# 🎬 Movie Booking API

A robust backend API for a movie theater booking system built with Node.js, Express, and PostgreSQL.

## 🚀 Key Features
* **User Authentication:** Secure JWT-based login/signup with password hashing.
* **Role-Based Access:** Protected routes for booking and administrative tasks.
* **Booking Engine:** Real-time seat availability checks and cost calculation.
* **Database:** Relational data modeling (Users, Movies, Showtimes, Bookings).

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL & Sequelize ORM
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt

## ⚙️ How to Run Locally

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/movie-booking-backend.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment:**
    Create a `.env` file and add your DB credentials.
4.  **Run Server:**
    ```bash
    npm run dev
    ```

## 🧪 API Endpoints
* `POST /api/auth/register` - Create account
* `POST /api/auth/login` - Login & Get Token
* `POST /api/movies` - Add a new movie (Auth required)
* `POST /api/bookings` - Book tickets (Auth required)
