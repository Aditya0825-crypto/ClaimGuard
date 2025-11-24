🚀 ClaimGuard – Smart Insurance Fraud Detection & Claim Management

ClaimGuard is an intelligent dual-portal system enabling seamless communication between insurance users and admins, backed by a secure and scalable Node.js API.

✨ Key Features
🔐 Authentication & Security

JWT-based authentication

Secure password hashing with bcrypt

Role-based access system

📄 Claim Management

Submit claims with documents

Track claim progress

Admin review dashboard

Approval / rejection workflows

🤖 Smart & Automated

Duplicate claim detection

Auto-verification checks

Modular, maintainable architecture

🏗️ Project Structure (Monorepo)
ClaimGuard/
│
├── admin-frontend/      # 🛠️ Admin portal (React + Tailwind)
│
├── user-frontend/       # 🧑‍💼 User portal (React + Tailwind)
│
└── backend/             # 🔧 Common backend API (Node.js + Express + MongoDB)
    ├── src/
    ├── server.js
    ├── package.json
    └── .env

🖥️ Frontend Overview
🎨 User Portal
Feature	Description
🧾 Claim Submission	Users can file claims with documents
📊 Dashboard	View status & updates
🔄 Status Tracking	Real-time claim progress
👤 Profile Management	Edit and manage user info
🛡️ Admin Portal
Feature	Description
📁 Claim Review	View, approve, reject claims
🧩 Verification Tools	Detect inconsistencies & fraud
📊 Analytics Dashboard	Overview of active & resolved claims
👨‍💼 User Oversight	Manage registered users
🔧 Backend Overview 

The backend is built using Node.js, Express, and MongoDB, designed with a clean modular structure for scalability.

🌐 What it handles

Authentication (JWT + bcrypt)

Claim creation, updates, & verification logic

File/document management

Secure API routing

Structured models for Users & Claims

The backend is shared by both portals, ensuring consistent data flow and unified claim handling.

🛠️ Tech Stack
🌐 Frontend

React

TailwindCSS

Axios

React Router

🖥️ Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

🚀 Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/Aditya0825-crypto/ClaimGuard
cd ClaimGuard

2️⃣ Install dependencies
cd backend && npm install
cd ../user-frontend && npm install
cd ../admin-frontend && npm install

3️⃣ Start the backend
cd backend
npm run dev

4️⃣ Start the frontends
cd user-frontend   → npm start
cd admin-frontend  → npm start

🤝 Contributing

Pull requests and feature suggestions are always welcome!

📜 License

MIT License — Free for personal & commercial use.
