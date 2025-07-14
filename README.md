# Swift Fintech Server

Back-end service for managing partner-based financial transactions with audit logging. Built using **Node.js**, **Express**, and **MongoDB**.

##  Features

- Partner-to-partner transaction creation
- Role-based access control (RBAC)
- Admin approval/rejection of transactions
- Personal transaction history
- Regional/global admin access to all transactions
- Full audit logging for key actions

---

##  Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Role-based Middleware (RBAC)
- Dotenv for environment config
- Audit logging

---

## API Endpoints

###  Authentication Middleware Required

| Method | Endpoint                    | Roles Allowed                          | Description                                  |
|--------|-----------------------------|----------------------------------------|----------------------------------------------|
| POST   | `/api/transactions/`        | `partner-sender`                       | Create a transaction                         |
| GET    | `/api/transactions/mine`    | `partner-sender`, `partner-receiver`   | View user-related transactions               |
| GET    | `/api/transactions/`        | `regional-admin`, `global-admin`       | View all transactions (filtered by region)   |
| PATCH  | `/api/transactions/:id/status` | `regional-admin`, `global-admin`     | Approve/Reject a transaction                 |

and `http://localhost:5000/api/rates?from=USD&to=USDC` for rates caching

---

## Audit Logging

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

##  Testing via Postman

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

##  Next Steps

- Add routes & views for Audit Logs (admin only)
- Connect frontend for partner interaction and admin control panel
- Write unit/integration tests

---


Pagination & Filtering: Tables (transactions, audit logs) are paginated and filtered client-side after server-side slicing, minimizing rendering load.

Lazy Loading: Break large components into chunks and load them on demand using React's lazy() and Suspense.

Static Asset Optimization: Leverage Next.js features like automatic image optimization and compression.

2. Modular Architecture
UI is built in atomic components and utilities to enable easy testing, reuse, and on-demand loading.

Role-based routing ensures minimal rendering logic per user type, reducing render computation.

3. Backend Separation & Load Management
Microservices-ready: Auth, audit logging, and transactions logic can be separated into services using REST or GraphQL gateways.

Queue System: Use job queues (e.g., Bull or RabbitMQ) to handle high-volume audit logging asynchronously.

API Caching: External API responses (e.g., Cybrid rates) are cached in memory using NodeCache or Redis to reduce latency and avoid API rate limits.

I can suggest also using Nest.js for scaling as it's built above express tho, otherwise we can use express but with clusters to utilize all CPU cores to handle multiple requests simultaneously

Also using monolith Archeticture would be good, and i am comfortable with the idea of using Microservices tho

4. Database Performance
Index fields like timestamp, region, and user in both transactions and audit_logs collections.

Archive old logs or rarely accessed data to reduce primary collection size.

Use read-replicas in MongoDB for read-heavy scenarios.

5. Infrastructure & DevOps
Dockerized setup allows horizontal scaling via Kubernetes or Docker Swarm.

CI/CD pipelines can be integrated with GitHub Actions for smooth deployment.

Use CDN for static asset delivery and load balancers to distribute frontend/backend traffic.



##  Author

**Youssef Ali**  
Full-Stack Web Developer

---


