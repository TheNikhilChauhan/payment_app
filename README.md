# 💸 Payment Wallet App

A modern payment wallet application built with **Next.js** (frontend & backend), **Express** (for bank webhook simulation), and **PostgreSQL** as the database. The project is structured using **Turborepo** to manage monorepo architecture, making it scalable and maintainable.

---

## 🚀 Features

- **User App:** Seamless P2P transactions, payment history, and balance management.
- **Bank Webhook (Express):** Simulated webhook server to handle payment confirmations.
- **Merchant App (Coming Soon):** Dedicated interface for merchants to manage transactions.
- **Monorepo Architecture:** Managed using Turborepo for efficient development.
- **Database:** PostgreSQL with Prisma ORM for schema management.
- **Dockerized:** Fully containerized for easy deployment.

---

## 🗂️ Project Structure

```bash
payment-app/
├── apps/
│   ├── user-app/           # Next.js frontend & backend
│   └── bank-webhook/       # Express server simulating bank webhooks
├── packages/
│   ├── db/prisma           # Prisma schema & migrations
│   └── ui/                 # Reusable UI components
├── docker-compose.yml      # Docker configuration
├── turbo.json              # Turborepo configuration
└── README.md               # Project documentation
```

---

## ⚙️ Tech Stack

- **Frontend & Backend:** Next.js (App Router)
- **Database:** PostgreSQL with Prisma ORM
- **Webhook Server:** Express.js
- **Monorepo:** Turborepo
- **Containerization:** Docker
- **UI Folder:** Shared via the `@repo/ui` package
- **UI and Components:** used Tailwindcss

---

## 🐳 Getting Started with Docker

1. **Clone the repository:**

   ```bash
   cd payment-app
   git clone https://github.com/TheNikhilChauhan/payment_app/tree/main/payment-app
   ```

2. **Start the application:**

   ```bash
   docker-compose up --build
   ```

3. **Access the apps:**
   - User App:
   ```bash
   npm run dev
   ```
   - Bank Webhook Server:
   ```bash
   npm run dev
   ```

---

## 💾 Database Setup

Prisma is used to manage the PostgreSQL database.

1. **Apply migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

2. **Open Prisma Studio:**
   ```bash
   npx prisma studio
   ```

---

## 📬 Webhook Simulation

The **bank-webhook** service simulates payment confirmations from a bank.

- **Endpoint:** `POST /webhook`
- **Usage:** The User App triggers payments, and the webhook server updates the transaction status.

---

## 🚧 Merchant App (Planned)

Coming soon: A dedicated merchant interface for transaction management and analytics.

---

## 📄 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/payment_wallet
NEXT_PUBLIC_API_URL=http://localhost:3000/api
JWT_SECRET=your_jwt_secret
```

---
