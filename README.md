# Spendwise 💸

Spendwise is a **personal expense tracking web application** built with **React** and **Supabase** that helps users manage their income, expenses, and budgets in one place. The app provides insightful dashboards, monthly filters, and a clean user experience with **dark and light mode support**.

---

## 🚀 Features

### 🌗 User Experience

- Light mode and Dark mode toggle
- Clean, responsive, and beginner-friendly UI
- Informational landing page describing app features

### 🔐 Authentication

- User sign up and login using Supabase Authentication
- Secure session handling
- Logout functionality

### 📊 Dashboard

- **Income vs Expense** comparison shown using graphs
- **Expense Breakdown** displayed using a pie chart
- **Budget Summary** is also shown
- Monthly filtering is applied where relevant

### 💰 Income Management

- Add income sources with:

  - Source name
  - Amount
  - Emoji icon
  - Date

- Income entries are displayed immediately after creation

### 📁 Expense Tracking

- Add expenses with:

  - Category
  - Amount
  - Date

- Filter expenses by:

  - Month

### 🎯 Budget Management

- Create and manage budgets
- Filter budgets by monthly budgets
- View budget usage summary

### ⚙️ Account Settings

- Update user profile information
- Change password
- Upload and update profile picture

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Backend / Database:** Supabase
- **Authentication:** Supabase Auth
- **Charts & Visuals:** Graphs and pie charts for analytics
- **Notifications:** UI notifications for actions like login, logout, and account creation (React hot toasts)
- **Theme:** Dark mode / Light mode support

## 🧠 What This Project Demonstrates

- Building a full React application from scratch
- Integrating Supabase for authentication and database
- State management and component-based architecture
- Implementing protected routes and user sessions
- Data filtering and visualization by time period
- Real-world CRUD operations

## 📌 Project Status

This project was originally built as a learning-based personal project and can be further extended with additional features.

## 👤 Author

**Mahida**
Frontend / Full-Stack Developer (Learning Phase)

⭐ If you find this project helpful or interesting, feel free to star the repository!

## 🧑‍💻 Getting Started (Local Setup)

Follow these steps to run the project locally:

1️⃣ Clone the repository

git clone <your-repo-url>
cd spendwise

2️⃣ Install dependencies

npm install

3️⃣ Environment Setup This project requires Supabase. To connect your own instance:

Create a file named .env in the root directory.
Copy the contents of .env.example into .env.
Replace the placeholder values with your Project URL and Anon Key from the Supabase Dashboard.

4️⃣ Run the App

npm run dev

---
