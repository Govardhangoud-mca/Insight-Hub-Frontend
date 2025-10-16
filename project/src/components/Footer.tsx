import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, Heart, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Tooltip } from '@mui/material';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      Swal.fire({
        icon: 'success',
        title: 'Successfully Subscribed!',
        text: `We'll send updates to ${email}`,
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#8b5cf6',
        timer: 3000,
      });
      setEmail('');
    }
  };

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Live Sessions', path: '/live-sessions' },
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, name: 'Twitter', url: '#', color: 'hover:text-sky-400' },
    { icon: Instagram, name: 'Instagram', url: '#', color: 'hover:text-pink-500' },
    { icon: Linkedin, name: 'LinkedIn', url: '#', color: 'hover:text-blue-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <Sparkles className="h-8 w-8 text-yellow-400" />
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gates Institute
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering students with flexible learning solutions and comprehensive educational resources for a brighter future.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Tooltip key={social.name} title={social.name} arrow>
                  <motion.a
                    href={social.url}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-full bg-white/10 backdrop-blur-sm ${social.color} transition-all duration-300 hover:bg-white/20 hover:shadow-lg`}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                </Tooltip>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.path}
                    className="group flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-all duration-300"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              <h3 className="text-xl font-bold text-white">Contact Info</h3>
            </div>
            <div className="space-y-4">
              <motion.a
                href="mailto:info@gatesinstitute.com"
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
              >
                <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-all duration-300">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="font-medium">info@gatesinstitute.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+15551234567"
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-300 hover:text-purple-400 transition-all duration-300 group"
              >
                <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-all duration-300">
                  <Phone className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="font-medium">+1 (555) 123-4567</p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-300 group"
              >
                <div className="p-2 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/30 transition-all duration-300">
                  <MapPin className="h-5 w-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="font-medium">123 Education Street, Learning City</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full" />
              <h3 className="text-xl font-bold text-white">Newsletter</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Subscribe to get the latest updates, news, and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group"
              >
                <span>Subscribe</span>
                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-gray-400 text-sm flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              &copy; {new Date().getFullYear()} Gates Institute. Made with
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              </motion.span>
              All rights reserved.
            </motion.p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, color: '#60a5fa' }}
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Privacy Policy
              </motion.a>
              <span className="text-gray-600">|</span>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, color: '#60a5fa' }}
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Terms of Service
              </motion.a>
              <span className="text-gray-600">|</span>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, color: '#60a5fa' }}
                className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-1"
              >
                Cookie Policy
                <ExternalLink className="h-3 w-3" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
    </footer>
  );
};

export default Footer;
