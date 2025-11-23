ClaimGuard is a full-stack MERN application designed to simplify and secure insurance claim management.
It provides two separate interfaces:

🎯 User Portal – File and track claims effortlessly

🛡️ Admin Portal – Manage, verify, and approve claims

⚙️ Common Backend – Secure API powering both portals

ClaimGuard is designed for organizations, insurance providers, and digital platforms that want a fast, reliable, and transparent claim workflow.

✨ Features
🔹 User Portal

File new claims with document uploads

Real-time claim status tracking

Secure login/signup

View claim history

Receive notifications

🔹 Admin Portal

Verify submitted claims

Approve / Reject claims

Manage users

Dashboard for analytics

Role-based secure access

🔹 Backend API

JWT authentication

Mongoose-based models

Claim verification workflows

Secure password hashing

Modular service-controller setup

📁 Project Structure (Monorepo)
ClaimGuard/
│
├── admin-frontend/      # Admin portal (React)
├── user-frontend/       # User portal (React)
└── backend/             # Common backend (Node + Express + MongoDB)
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── app.js
    │   └── server.js
    ├── package.json
    └── .env

⚙️ Tech Stack

Frontend: React + Tailwind

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Auth: JWT, bcrypt

Tools: Git, VS Code

🚀 Running the Project
1️⃣ Clone the repository
git clone https://github.com/<your-username>/ClaimGuard.git
cd ClaimGuard

2️⃣ Install dependencies
Backend
cd backend
npm install

Frontends
cd ../admin-frontend && npm install
cd ../user-frontend && npm install

3️⃣ Setup Environment

Create .env inside backend:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

4️⃣ Start Development Servers
Backend:
npm run dev

User Frontend:
npm start

Admin Frontend:
npm start

🏆 Why ClaimGuard? (USP)

🔒 Highly secure with JWT, role-based access & hashing

📡 Real-time updates across portals

🧩 Modular architecture for easy scaling

⚡ Fast API optimized for claim workflows

🎯 User-friendly UI for both customers and admins

🤝 Contributing

Pull requests are welcome!
Please follow conventional commit messages & create a feature branch before submitting.

📜 License

This project is licensed under the MIT License.
