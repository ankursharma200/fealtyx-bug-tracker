export const USERS = [
  { id: 1, name: "Alice Dev", role: "DEVELOPER", email: "dev@test.com", password: "123" },
  { id: 2, name: "Bob Manager", role: "MANAGER", email: "manager@test.com", password: "123" }
];

export const INITIAL_TASKS = [
  {
    id: 1,
    title: "Fix Login Bug",
    description: "Login button not working on Safari.",
    priority: "High",
    status: "In Progress",
    assignee: "Alice Dev",
    createdDate: "2023-10-01",
    timeSpent: 2,
    history: []
  }
];