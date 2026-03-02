import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const tools = [
  { label: "BMI Calculator", path: "/bmi-calculator" },
  { label: "Calories Calculator", path: "/calories-calculator" },
  { label: "Water Intake", path: "/water-intake" },
  { label: "Sleep Score", path: "/sleep-score" },
  { label: "Heart Rate Analyzer", path: "/heart-rate-analyzer" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Health<span className="text-primary">Insight</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {isHome && (
            <>
              <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">How It Works</a>
            </>
          )}

          <div className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Tools <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            {toolsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setToolsOpen(false)} />
                <div className="absolute right-0 top-8 z-50 w-56 rounded-xl border border-border bg-card p-2 card-shadow">
                  {tools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => setToolsOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        location.pathname === tool.path
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-card-foreground hover:bg-secondary"
                      }`}
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link to="/bmi-calculator">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="text-foreground md:hidden">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-border bg-background px-6 py-4 md:hidden"
        >
          {isHome && (
            <>
              <a href="#features" className="block py-2 text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>Features</a>
              <a href="#how-it-works" className="block py-2 text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>How It Works</a>
            </>
          )}
          <div className="border-t border-border pt-2 mt-2">
            <p className="py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tools</p>
            {tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="block py-2 text-sm text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                {tool.label}
              </Link>
            ))}
          </div>
          <Link to="/bmi-calculator" onClick={() => setIsOpen(false)}>
            <Button size="sm" className="mt-2 w-full">Get Started</Button>
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
