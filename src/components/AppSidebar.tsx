import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Map, History, Shield, User, MessageSquare, Menu, X, Phone, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { title: "Map", icon: Map, path: "/map" },
  { title: "Incident History", icon: History, path: "/history" },
  { title: "Contact", icon: Phone, path: "/contact" },
  { title: "Profile", icon: UserCircle, path: "/profile" },
  { title: "Privacy", icon: Shield, path: "/privacy" },
  { title: "Admin", icon: User, path: "/admin" },
  { title: "Chatbot", icon: MessageSquare, path: "/chatbot" },
];

export function AppSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-primary-foreground p-2 rounded-lg shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: 0 }}
          animate={{ 
            width: isExpanded ? "280px" : "80px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground shadow-xl z-40 border-r border-sidebar-border"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--sidebar-background)) 0%, hsl(220 30% 10%) 100%)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border bg-sidebar-primary/5">
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-medium text-sidebar-foreground/70">Emergency Response</p>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden md:block hover:bg-sidebar-foreground/10 p-2 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-sidebar-primary/10 hover:shadow-lg group relative overflow-hidden"
                activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-lg shadow-sidebar-accent/20"
              >
                <item.icon size={24} className="flex-shrink-0" />
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm whitespace-nowrap"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 p-6 border-t border-sidebar-foreground/10"
            >
              <div className="text-xs text-sidebar-foreground/70 bg-sidebar-primary/5 rounded-lg p-3 border border-sidebar-border">
                <p className="font-medium text-sidebar-foreground/90">© 2025 AI LifeLine</p>
                <p className="mt-1">Emergency Response System</p>
              </div>
            </motion.div>
          )}
        </motion.aside>
      </AnimatePresence>
    </>
  );
}
