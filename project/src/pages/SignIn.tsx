// src/components/SignInModal.tsx
import React, { useState } from "react";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { role, email: userEmail, sessionId } = response.data;

      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("userRole", role);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("token", sessionId);

      window.dispatchEvent(new Event("loginUpdate"));

      if (role === "ADMIN") navigate("/admin-dashboard");
      else if (role === "FACULTY") navigate("/faculty-dashboard");
      else if (role === "STUDENT") navigate("/student-dashboard");
      else setError("Invalid role. Please contact support.");
      onClose(); // close modal on successful login
    } catch (err: any) {
      setError(err.response?.data?.error || "Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 bg-opacity-95 p-8 rounded-3xl w-full max-w-md relative shadow-2xl border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-pink-400"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 bg-slate-700 text-white rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Password</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 bg-slate-700 text-white rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md bg-pink-500 hover:bg-pink-600 text-white font-semibold transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
