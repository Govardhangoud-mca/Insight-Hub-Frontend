import React, { useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from "aos"; // ✅ import AOS here
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import RecordedLectures from "./pages/features/RecordedLectures";
import StudyMaterials from "./pages/features/StudyMaterials";
import LiveSessions from "./pages/features/LiveSessions";
import Teachers from "./pages/Teachers";
import FacultyDashboard from "./pages/FacultyDashboard";
import UploadLecture from "./components/UploadLecture";
import LectureList from "./components/LectureList";
import StudentDashboard from "./pages/StudentDashboard";
import AddResource from "./pages/AddResource";
import ResourcesList from "./pages/ResourcesList";
import FileList from "./components/FileList";
import LectureList2 from "./components/LectureList2";
import FileList2 from "./components/Filelist2";
import ResourcesList2 from "./components/ResourcesList2";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true,    // animations happen only once when scrolling
      easing: "ease-in-out",
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/recorded-lectures" element={<RecordedLectures />} /> */}
            {/* <Route path="/study-materials" element={<StudyMaterials />} /> */}
            <Route path="/live-sessions" element={<LiveSessions />} />
            <Route path="/teachers" element={<Teachers />} />
            
            {/* Faculty Dashboard Routes */}
            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty-dashboard/lecturelist" element={<LectureList />} />
            <Route path="/faculty-dashboard/uploadlecture" element={<UploadLecture />} />
            <Route path="/faculty-dashboard/add-resource" element={<AddResource />} />
            <Route path="/faculty-dashboard/resources-list" element={<ResourcesList />} />
            <Route path="/faculty-dashboard/filelist" element={<FileList />} />
            
            {/* Student Dashboard Routes */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/student-dashboard/lecturelist2" element={<LectureList2 />} />
            <Route path="/student-dashboard/filelist2" element={<FileList2 />} />
            <Route path="/student-dashboard/resourcelist2" element={<ResourcesList2 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
