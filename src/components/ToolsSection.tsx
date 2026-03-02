import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scale, Flame, Droplets, Moon, Heart, ArrowRight } from "lucide-react";

const tools = [
  { icon: Scale, title: "BMI Calculator", desc: "Calculate your Body Mass Index instantly", path: "/bmi-calculator" },
  { icon: Flame, title: "Calories Calculator", desc: "Find your daily caloric needs", path: "/calories-calculator" },
  { icon: Droplets, title: "Water Intake", desc: "Personalized hydration recommendations", path: "/water-intake" },
  { icon: Moon, title: "Sleep Score", desc: "Evaluate your sleep quality", path: "/sleep-score" },
  { icon: Heart, title: "Heart Rate Analyzer", desc: "Discover your training heart rate zones", path: "/heart-rate-analyzer" },
];

const ToolsSection = () => {
  return (
    <section id="insights" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Health <span className="text-gradient">Tools</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Interactive calculators and analyzers to help you understand and improve your health.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                to={tool.path}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 card-shadow transition-all duration-300 hover:card-shadow-hover hover:border-primary/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-primary/10">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold text-card-foreground">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
