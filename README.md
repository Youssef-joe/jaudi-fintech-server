# Swift Fintech Server

Back-end service for managing partner-based financial transactions with audit logging. Built using **Node.js**, **Express**, and **MongoDB**.

## 📦 Features

- Partner-to-partner transaction creation
- Role-based access control (RBAC)
- Admin approval/rejection of transactions
- Personal transaction history
- Regional/global admin access to all transactions
- Full audit logging for key actions

---

## 🛠️ Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Role-based Middleware (RBAC)
- Dotenv for environment config
- Audit logging

---

## 🧩 API Endpoints

### 🔐 Authentication Middleware Required

| Method | Endpoint                    | Roles Allowed                          | Description                                  |
|--------|-----------------------------|----------------------------------------|----------------------------------------------|
| POST   | `/api/transactions/`        | `partner-sender`                       | Create a transaction                         |
| GET    | `/api/transactions/mine`    | `partner-sender`, `partner-receiver`   | View user-related transactions               |
| GET    | `/api/transactions/`        | `regional-admin`, `global-admin`       | View all transactions (filtered by region)   |
| PATCH  | `/api/transactions/:id/status` | `regional-admin`, `global-admin`     | Approve/Reject a transaction                 |

---

## 📒 Audit Logging

Every action is tracked in the `AuditLog` model:

| Field         | Description                           |
|---------------|---------------------------------------|
| action        | `create`, `status-approved`, etc.     |
| performedBy   | User who performed the action         |
| targetModel   | e.g. `Transaction`                    |
| targetId      | MongoDB ID of the affected document   |
| details       | Custom info about the action          |
| timestamp     | Auto-generated on creation            |

---

## 🧪 Testing via Postman

1. **Create Transaction**  
   - `POST /api/transactions`  
   - Requires: `amountUSD`, `amountUSDC`, `receiverId`  
   - Header: `Authorization: Bearer <token>`

2. **Get My Transactions**  
   - `GET /api/transactions/mine`  
   - Header: `Authorization: Bearer <token>`

3. **Get All Transactions (Admin)**  
   - `GET /api/transactions/`  
   - Header: `Authorization: Bearer <token>`

4. **Update Transaction Status**  
   - `PATCH /api/transactions/:id/status`  
   - Body: `{ "status": "approved" | "rejected" }`  
   - Header: `Authorization: Bearer <token>`

---

## 📂 Folder Structure

jaudi-fintech-server/
│
├── controllers/
│ └── transactions.controller.js
│
├── middleware/
│ ├── auth.middleware.js
│ └── rbac.middleware.js
│
├── models/
│ ├── Transaction.js
│ ├── User.js
│ └── AuditLog.js
│
├── routes/
│ └── transactions.routes.js
│
├── utils/
│ └── logAudit.js
│
├── .env
├── server.js
└── app.js

yaml
Copy
Edit

---

## 🚀 Next Steps

- Add routes & views for Audit Logs (admin only)
- Connect frontend for partner interaction and admin control panel
- Write unit/integration tests

---

## 🧑‍💻 Author

**Youssef Ali**  
Full-Stack Web Developer

---


