// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Menu,
  X,
  LogOut,
  Home,
  Info,
  Users,
  Video,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { Tooltip } from "@mui/material";
import AOS from "aos";
import SignInModal from "../pages/SignIn";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [role, setRole] = useState<string | null>(
    localStorage.getItem("userRole")
  );
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false); // hide on scroll down
  const [showSignInModal, setShowSignInModal] = useState(false); // SignIn modal
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    let lastScrollY = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.body.scrollHeight;
      const halfPage = pageHeight / 2;

      setScrolled(scrollY > 20);

      if (scrollY > lastScrollY && scrollY > 50) {
        // scrolling down
        setHidden(true);
      } else {
        // scrolling up
        setHidden(false);
        if (scrollY > halfPage) {
          setShowSignInModal(true); // show modal
        }
      }

      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleLoginUpdate = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("userRole"));
    };
    window.addEventListener("loginUpdate", handleLoginUpdate);
    return () => window.removeEventListener("loginUpdate", handleLoginUpdate);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        setToken(null);
        setRole(null);
        window.dispatchEvent(new Event("loginUpdate"));
        Swal.fire({
          icon: "success",
          title: "Logged Out Successfully!",
          timer: 2000,
          showConfirmButton: false,
          background: "#1f2937",
          color: "#fff",
        });
        navigate("/");
      }
    });
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const isActiveLink = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: Info },
    { path: "/teachers", label: "Teachers", icon: Users },
    { path: "/live-sessions", label: "Live Sessions", icon: Video },
  ];

  const NavLink: React.FC<{
    to: string;
    label: string;
    icon?: React.ElementType;
    onClick?: () => void;
  }> = ({ to, label, icon: Icon, onClick }) => {
    const isActive = isActiveLink(to);
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to={to}
          onClick={onClick}
          className={`relative px-3 py-1.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group ${
            isActive ? "text-blue-500" : "text-white/90 hover:text-blue-400"
          }`}
        >
          {Icon && <Icon className="w-4 h-4" />}
          {label}
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
        </Link>
      </motion.div>
    );
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-lg h-16"
            : "bg-white/10 backdrop-blur-lg h-16"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <GraduationCap className="h-8 w-8 text-blue-500 drop-shadow-lg" />
            <span className="text-xl font-bold text-white/90">Gates Institute</span>
            <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} label={link.label} icon={link.icon} />
            ))}

            {token && role === "STUDENT" && <NavLink to="/student-dashboard" label="Dashboard" icon={LayoutDashboard} />}
            {token && role === "FACULTY" && <NavLink to="/faculty-dashboard" label="Dashboard" icon={LayoutDashboard} />}

            {!token ? (
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="px-4 py-1.5 rounded-lg text-white/90 hover:bg-white/20 transition"
                >
                  Sign In
                </button>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-blue-300/50 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <Tooltip title="Logout" arrow>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow transition"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </motion.button>
              </Tooltip>
            )}
          </div>

          {/* Mobile Menu */}
          <motion.div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu Items */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/20 backdrop-blur-xl border-t border-white/20"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActiveLink(link.path) ? "bg-blue-500/50 text-white shadow-lg" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <link.icon className="w-5 h-5" /> {link.label}
                  </Link>
                ))}

                {token && role === "STUDENT" && (
                  <Link
                    to="/student-dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 bg-blue-500/50 text-white shadow-lg"
                  >
                    <LayoutDashboard className="w-5 h-5" /> Student Dashboard
                  </Link>
                )}

                {token && role === "FACULTY" && (
                  <Link
                    to="/faculty-dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 bg-blue-500/50 text-white shadow-lg"
                  >
                    <LayoutDashboard className="w-5 h-5" /> Faculty Dashboard
                  </Link>
                )}

                <div className="pt-3 border-t border-white/20">
                  {!token ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowSignInModal(true)}
                        className="block w-full px-3 py-2 text-center rounded-lg text-white bg-white/10 hover:bg-white/20 transition"
                      >
                        Sign In
                      </button>
                      <Link
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full px-3 py-2 text-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow transition"
                      >
                        Sign Up
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow transition"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* SignIn Modal */}
      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
    </>
  );
};

export default Navbar;
