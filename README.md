# 📚 Study Mate – Client

**Study Mate** is a modern, scalable **React + TypeScript** client application focused on **authentication, user discovery, filtering, and pagination**.  
It uses **Redux Toolkit for global auth state management** and **TanStack React Query for efficient server-state handling (data fetching & mutations)**.

---

## 🚀 Tech Stack

### Core

- React 19
- TypeScript
- Vite

### State Management

- Redux Toolkit – Authentication & global state
- TanStack React Query – Server state, caching, pagination, mutations

### Routing & Forms

- React Router v7
- React Hook Form

### UI & Styling

- Tailwind CSS v4
- Radix UI
- Lucide Icons / React Icons
- Motion
- SweetAlert2 / React Toastify

### Data & Charts

- Axios
- Recharts

### Authentication

- Firebase Authentication
- JWT-based backend integration

---

## 🧠 Architecture Overview

```text
src/
├── app/
│   ├── store.ts
│   └── authSlice.ts
├── features/
│   ├── auth/
│   ├── users/
│   └── pagination/
├── hooks/
├── services/
├── routes/
├── components/
├── pages/
└── utils/
```

---

## 🔐 Authentication (Redux)

- Firebase authentication
- Auth state stored in Redux Toolkit
- Protected routes powered by global auth state

---

## 🔄 Data Fetching (React Query)

All server-side data is handled with **TanStack React Query**.

```ts
useQuery({
  queryKey: ["users", page, filters],
  queryFn: fetchUsers,
  keepPreviousData: true,
});
```

---

## 🔍 Features

- Search users
- Filter by subject, experience, study mode
- Pagination (scales to 100+ pages)
- Optimistic UI updates
- Smooth animations

---

## 📦 Installation

```bash
git clone https://github.com/your-username/study-mate-client.git
cd study-mate-client
npm install
```

---

## ▶️ Run

```bash
npm run dev
```

---

## 🏗️ Build

```bash
npm run build
npm run preview
```

---

## 🔧 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000/api/v2
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## 📄 License

MIT License

---

## 👤 Author

** Polas Chandra Barmon 
Full-Stack Developer
