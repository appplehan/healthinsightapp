import { motion } from "framer-motion";
import { Heart, Brain, Salad, Activity, Dna, Eye } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Cardiac Analysis",
    description: "Real-time heart rate variability and cardiovascular risk assessment powered by advanced algorithms.",
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    description: "Cognitive health tracking with stress pattern recognition and personalized mindfulness recommendations.",
  },
  {
    icon: Salad,
    title: "Nutrition Insights",
    description: "Macro and micronutrient analysis with AI-generated meal plans tailored to your health goals.",
  },
  {
    icon: Activity,
    title: "Vital Monitoring",
    description: "Continuous tracking of blood pressure, oxygen levels, and body temperature patterns.",
  },
  {
    icon: Dna,
    title: "Genetic Factors",
    description: "Understand hereditary health predispositions and optimize prevention strategies accordingly.",
  },
  {
    icon: Eye,
    title: "Sleep Quality",
    description: "Deep sleep analysis with circadian rhythm optimization and recovery score tracking.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Comprehensive Health <span className="text-gradient">Analysis</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Six dimensions of health intelligence working together to give you
            the most complete picture of your wellbeing.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group rounded-xl border border-border bg-card p-6 card-shadow transition-all duration-300 hover:card-shadow-hover hover:border-primary/20"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
