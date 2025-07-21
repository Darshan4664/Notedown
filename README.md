# 📝 Notes & Tasks App

A simple and responsive Notes & Tasks web app built using **React** and **Tailwind CSS**, backed by a RESTful API. It allows users to create, view, complete, and delete tasks with optional date and time inputs.

# Features

- ✍️ Add notes or tasks
- 📅 Optional due date and time support
- ✅ Mark tasks as complete/incomplete
- ❌ Delete tasks
- 🖥️ Responsive UI using Tailwind CSS
- 🔄 Real-time updates after each action (add/delete/update)

# Tech Stack

# Frontend:
- React
- Tailwind CSS

# Backend:
- Node.js with Express 
- JSON-based REST API (`/tasks` endpoint)

# How It Works

1. **User enters a note** (optional due date and time).
2. Clicks **"Add"** to submit it.
3. Task is stored via a `POST` request to the backend.
4. Existing tasks are fetched via a `GET` request.
5. Users can:
   - Click a checkbox to mark as complete/incomplete (`PUT`)
   - Delete a task (`DELETE`)

# How to Run Locally

1. Clone the repo
```bash
git clone https://github.com/your-username/notes-tasks-app.git
cd notes-tasks-app
```

2. Install dependencies
```bash
npm install
```

3. Start the React frontend
```bash
npm start
```
> Make sure your backend is running on `http://localhost:5000`.


# Project Highlights & Learning Outcomes

- Built a full-featured task manager with React hooks (`useState`, `useEffect`)
- Applied Tailwind CSS for rapid and consistent styling across components 
- Integrated a RESTful API to handle real-time task operations (create, update, delete)
- Developed a lightweight task management app using React and modern UI practices
- Ensured the interface is responsive and mobile-friendly

# Future Improvements (Optional)

- Add user authentication (login/register)
- Support task editing
- Add task filters (e.g., completed, upcoming)
- Store data in a database like MongoDB

# License

This project is open-source and free to use.
