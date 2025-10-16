import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
      role: Yup.string().oneOf(['STUDENT', 'FACULTY'], 'Invalid role').required('Role is required'),
    }),
    onSubmit: async (values) => {
      setError("");
      setSuccess("");
      try {
        const response = await axiosInstance.post("/api/auth/register", {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        });

        setSuccess(response.data || "Account created successfully!");
        setTimeout(() => navigate("/signin"), 1500);
      } catch (err: any) {
        setError(err.response?.data || "Signup failed. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-4 text-white">
      <div className="bg-slate-800 bg-opacity-90 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-4xl font-extrabold text-center mb-8 gradient-text">Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">Full Name</label>
            <input
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-slate-700 text-white rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-400">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-slate-700 text-white rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-400">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">Password</label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-slate-700 text-white rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-400">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-slate-700 text-white rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-sm text-red-400">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-200">Role</label>
            <select
              id="role"
              {...formik.getFieldProps("role")}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-slate-700 text-white rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
            >
              <option value="">-- Select Role --</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="text-sm text-red-400">{formik.errors.role}</p>
            )}
          </div>

          {/* Messages */}
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          {success && <div className="text-green-400 text-sm text-center">{success}</div>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
