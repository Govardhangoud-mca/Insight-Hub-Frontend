import React, { useState } from "react";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/api/auth/login", { email, password }, { withCredentials: true });

      const { role, email: userEmail, sessionId } = response.data;

      // Save session and role in localStorage
      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("userRole", role);
      localStorage.setItem("email", userEmail);

      // 🔹 Dispatch event so Navbar updates immediately
      window.dispatchEvent(new Event("loginUpdate"));

      // Navigate based on role
      if (role === "ADMIN") navigate("/admin-dashboard");
      else if (role === "FACULTY") navigate("/faculty-dashboard");
      else if (role === "STUDENT") navigate("/student-dashboard");
      else setError("Invalid role. Please contact support.");
    } catch (err: any) {
      setError(err.response?.data?.error || "Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="********"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
