# 🚀 TeamFlow — Team Task Manager

Full-stack web app: **Plain HTML/JS + Node.js + Express + MongoDB**

---

## 📁 Project Structure

```
teamflow/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # JWT auth
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   └── index.js        # Entry point
│   ├── .env.example
│   └── package.json
└── frontend/
    └── index.html          # Complete frontend (single file)
```

---

## ⚙️ Local Setup (Apne Computer Pe)

### Step 1 — MongoDB Atlas free cluster banao
1. [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) pe jaao
2. Free cluster banao
3. Connection string copy karo (format: `mongodb+srv://user:pass@cluster.../teamflow`)

### Step 2 — Backend setup
```bash
cd backend
cp .env.example .env
# .env file mein apni values bharo (MONGO_URI, JWT_SECRET)
npm install
npm run dev
```

### Step 3 — App open karo
Browser mein jaao: **http://localhost:5000**

---

## 🌐 Railway Pe Deploy Karna

### Step 1 — Railway account
[railway.app](https://railway.app) pe sign up karo (GitHub se login karo)

### Step 2 — MongoDB Atlas ki URI lelo
Pehle MongoDB Atlas pe free cluster banao aur connection string lo.

### Step 3 — GitHub pe push karo
```bash
git init
git add .
git commit -m "Initial commit - TeamFlow"
git branch -M main
git remote add origin https://github.com/TUMHARA_USERNAME/teamflow.git
git push -u origin main
```

### Step 4 — Railway pe deploy
1. Railway dashboard pe **"New Project"** click karo
2. **"Deploy from GitHub repo"** choose karo
3. Apna `teamflow` repo select karo
4. **Root Directory** set karo: `backend`
5. **Environment Variables** add karo:
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=kuch_bhi_lamba_secret_likho
   PORT=5000
   ```
6. Deploy ho jaayega — Railway ek live URL dega!

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | New account banao |
| POST | `/api/auth/login` | Login karo |
| GET | `/api/auth/me` | Apni info lo |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Saare projects |
| POST | `/api/projects` | Naya project (Admin) |
| PUT | `/api/projects/:id` | Update project (Admin) |
| DELETE | `/api/projects/:id` | Delete project (Admin) |
| POST | `/api/projects/:id/members` | Member add karo |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Saare tasks |
| GET | `/api/tasks/dashboard` | Dashboard stats |
| POST | `/api/tasks` | Naya task (Admin) |
| PUT | `/api/tasks/:id` | Task update karo |
| DELETE | `/api/tasks/:id` | Task delete karo (Admin) |

### Team
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/team` | Saare members |
| PUT | `/api/team/:id/role` | Role change (Admin) |
| DELETE | `/api/team/:id` | Member remove (Admin) |

---

## 🛡️ Role-Based Access

| Feature | Admin | Member |
|---------|-------|--------|
| Projects create/delete | ✅ | ❌ |
| Tasks create/delete | ✅ | ❌ |
| Task status update | ✅ | ✅ |
| View all tasks | ✅ | Sirf apne |
| Team members remove | ✅ | ❌ |

---

## 📦 Tech Stack

- **Frontend:** Plain HTML, CSS, Vanilla JS (single file)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT + bcryptjs
- **Deploy:** Railway

---

## 🎥 Demo Video Tips (2-5 min)

1. Signup screen dikhao (Admin + Member dono)
2. Admin se project banao
3. Task create karo, member ko assign karo
4. Member se login karo — sirf apne tasks dikhte hain
5. Task complete karo (checkbox)
6. Dashboard stats dikhao
7. Live Railway URL dikhao

---

Made with ❤️ using TeamFlow
