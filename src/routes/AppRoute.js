import SignIn from "../pages/auth/SignIn";
import CreateBlog from "../pages/createblog/CreateBlog";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const { Routes, Route } = require("react-router-dom");

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-blog"
        element={
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoute;
