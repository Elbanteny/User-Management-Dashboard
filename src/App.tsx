import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import UsersPage from "./pages/users/UsersPage";
import UserDetailPage from "./pages/users/UserDetailPage";
import RolesPage from "./pages/roles/RolesPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { currentUser } from "./constants/users";
import AuthLayout from "./components/layout/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes — separate layout, no sidebar/header */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="/auth/login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Main app routes */}
        <Route path="/*" element={<Layout />}>
          <Route index element={<UsersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserDetailPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<Navigate to={`/profile/${currentUser.id}`} replace />} />
          <Route path="profile/:id" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;