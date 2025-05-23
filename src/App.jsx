import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages";
import Layout from "./pages/layout";
import JobDetailsPage from "./pages/job-details";
import { useAuthStore } from "./zustand-store/auth/auth.store";

const App = () => {
  const { authToken } = useAuthStore();

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<HomePage />} />

      {/* Protected Routes */}
      {authToken ? (
        <Route path="/dashboard" element={<Layout />}>
          <Route path="jobs" element={<JobDetailsPage />} />
          <Route path="analytics" element={<div>Analytics</div>} />
          <Route path="settings" element={<div>Settings</div>} />
          <Route path="profile" element={<div>Profile</div>} />
        </Route>
      ) : (
        // Redirect to home (or login) if not authenticated
        <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
      )}

      {/* Catch-all route to redirect to home or 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
