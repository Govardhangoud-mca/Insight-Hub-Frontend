import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // ✅ use same axios config

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
      role: Yup.string().oneOf(['ADMIN', 'STUDENT', 'FACULTY'], 'Invalid role').required('Role is required'),
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium">Role</label>
            <select
              id="role"
              {...formik.getFieldProps("role")}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            >
              <option value="">-- Select Role --</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="text-sm text-red-500">{formik.errors.role}</p>
            )}
          </div>

          {/* Messages */}
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
