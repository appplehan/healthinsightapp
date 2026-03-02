import { motion } from "framer-motion";
import { Upload, Cpu, BarChart3, Lightbulb } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Input Your Data",
    description: "Upload health records or connect your wearable devices for seamless data sync.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Processing",
    description: "Our algorithms analyze patterns across thousands of biomarkers in seconds.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Get Insights",
    description: "Receive detailed reports with clear visualizations of your health trends.",
  },
  {
    icon: Lightbulb,
    step: "04",
    title: "Take Action",
    description: "Follow personalized recommendations backed by clinical research data.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-secondary/50 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From raw data to actionable insights in four simple steps.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative text-center"
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-primary">
                Step {step.step}
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
