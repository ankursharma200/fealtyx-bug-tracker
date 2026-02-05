# 🐞 FealtyX Bug Tracker

A robust, role-based Bug & Task Tracking application built with **React.js**, **Vite**, and **Tailwind CSS**. This application allows Developers to manage tasks and log time, while Managers oversee progress and approve task closures.

## 🚀 Features

### 🔐 Authentication & Roles
* **Developer Role:** Can create tasks, log time, delete tasks, and request to mark tasks as "Done".
* **Manager Role:** Can view all tasks, view analytics, and **Approve** or **Reject** task closures.

### 📊 Dashboard & Analytics
* **Task Overview:** Real-time count of active tasks.
* **Trend Chart:** Visual line chart displaying task concurrency over the week (powered by *Recharts*).

### 📝 Task Management
* **CRUD Operations:** Create, Read, Update (Edit Title), and Delete tasks.
* **Workflow Automation:**
    * *Open* → *Pending Approval* (Dev requests closure) → *Closed* (Manager approves).
    * Manager can also *Reject* a closure, sending the task back to *In Progress*.
* **Filtering:** Filter tasks by Priority (High, Medium, Low).
* **Important Dates:** Tracks both *Created Date* and *Due Date*.

### ⏱️ Time Tracking
* Developers can log hours spent on individual tasks.
* Total hours are displayed in the main table.

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Charts:** Recharts
* **Icons:** Lucide React
* **State Management:** React Context API

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/fealtyx-bug-tracker.git](https://github.com/your-username/fealtyx-bug-tracker.git)
    cd fealtyx-bug-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Visit `http://localhost:5173`

---

## 🔑 Test Credentials

Use the following credentials to test the different roles:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Developer** | `dev@test.com` | `123` | Create tasks, Log time, Request Closure |
| **Manager** | `manager@test.com` | `123` | View All, Approve/Reject Tasks, View Charts |

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── Layout.jsx        # Main app shell (Navbar)
│   ├── TaskFormModal.jsx # Modal for creating tasks
│   ├── TaskList.jsx      # Main table with Filtering & Actions
│   └── TrendChart.jsx    # Analytics Chart
├── context/
│   ├── AuthContext.jsx   # Handles Login/Logout logic
│   ├── TaskContext.jsx   # Handles Task CRUD & Workflow logic
│   └── MockData.js       # Initial dummy data
├── pages/
│   ├── Dashboard.jsx     # Main landing page after login
│   └── Login.jsx         # Login screen
└── App.jsx               # Routing setup