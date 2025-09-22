import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8083/students";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", grade: "", status: "Active" });

  // Fetch students when component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data && Array.isArray(response.data)) {
        setStudents(response.data);
      } else {
        console.error("Invalid student data received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Add a new student
  const addStudent = async () => {
    try {
      const response = await axios.post(API_URL, newStudent);
      if (response.data && response.data.id) {
        setStudents((prevStudents) => [...prevStudents, response.data]);
        setNewStudent({ name: "", email: "", grade: "", status: "Active" });
      } else {
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Update an existing student
  const updateStudent = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedData);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? { ...student, ...updatedData } : student
        )
      );
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  // Delete a student
  const deleteStudent = async (id) => {
    if (!id) return; // Prevent calling delete on undefined id
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold">Students List</h2>

      {/* Add Student Form */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Grade"
          value={newStudent.grade}
          onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={addStudent} className="bg-blue-500 text-white p-2 rounded">
          Add Student
        </button>
      </div>

      {/* Students Table */}
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Grade</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} className="border">
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.email}</td>
                <td className="border p-2">{student.grade}</td>
                <td className="border p-2">{student.status}</td>
                <td className="border p-2">
                  <button 
                    onClick={() => updateStudent(student.id, { ...student, name: "Updated Name" })} 
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteStudent(student.id)} 
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
  