import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import DailyProgress from "./pages/DailyProgress";

import AdminAddMember from "./pages/AdminAddMember";
import AdminMembers from "./pages/AdminMembers";
import AdminEditMember from "./pages/AdminEditMember";
import AdminAddTrainer from "./pages/AdminAddTrainer";
import AdminTrainers from "./pages/AdminTrainers";
import AdminEditTrainer from "./pages/AdminEditTrainer";
import AdminServices from "./pages/AdminServices";
import AdminAddService from "./pages/AdminAddService";
import AdminAppointments from "./pages/AdminAppointments";
import AdminPayments from "./pages/AdminPayments";
import AdminNotifications from "./pages/AdminNotifications";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Role-based dashboard entry */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Admin dashboard */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        {/* Member dashboard */}
        <Route
          path="/member-dashboard"
          element={<MemberDashboard />}
        />

        {/* Trainer dashboard */}
        <Route
          path="/trainer-dashboard"
          element={<TrainerDashboard />}
        />

        {/* =================================
            MEMBER DAILY PROGRESS
        ================================= */}

        <Route
          path="/member/daily-progress"
          element={
            <DailyProgress section="overview" />
          }
        />

        <Route
          path="/member/daily-progress/tasks"
          element={
            <DailyProgress section="tasks" />
          }
        />

        <Route
          path="/member/daily-progress/progress"
          element={
            <DailyProgress section="progress" />
          }
        />

        <Route
          path="/member/daily-progress/wellness"
          element={
            <DailyProgress section="wellness" />
          }
        />

        <Route
          path="/member/daily-progress/trainers"
          element={
            <DailyProgress section="trainers" />
          }
        />

        <Route
  path="/admin-dashboard"
  element={<AdminDashboard />}
/>

<Route
  path="/admin/members"
  element={<AdminMembers />}
/>

<Route
  path="/admin/add-member"
  element={<AdminAddMember />}
/>

<Route
  path="/admin/edit-member/:memberId"
  element={<AdminEditMember />}
/>

<Route
  path="/admin/trainers"
  element={<AdminTrainers />}
/>

<Route
  path="/admin/add-trainer"
  element={<AdminAddTrainer />}
/>

<Route
  path="/admin/edit-trainer/:trainerId"
  element={<AdminEditTrainer />}
/>

<Route
  path="/admin/services"
  element={<AdminServices />}
/>

<Route
  path="/admin/add-service"
  element={<AdminAddService />}
/>

<Route
  path="/admin/appointments"
  element={<AdminAppointments />}
/>

<Route
  path="/admin/payments"
  element={<AdminPayments />}
/>

<Route
  path="/admin/notifications"
  element={<AdminNotifications />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;