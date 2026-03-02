import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-health.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="hero-gradient absolute inset-0 opacity-[0.03]" />
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
              <Zap className="h-3.5 w-3.5" />
              AI-Powered Health Analytics
            </div>

            <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Understand Your
              <br />
              <span className="text-gradient">Health Deeply</span>
            </h1>

            <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Advanced AI analysis transforms your health data into actionable
              insights. Track vitals, nutrition, and wellness with precision
              that empowers better decisions.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="gap-2">
                Start Analysis <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Shield className="h-4 w-4" /> Learn More
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                Real-time monitoring
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                HIPAA Compliant
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl card-shadow">
              <img
                src={heroImage}
                alt="AI-powered health analysis visualization showing human body vitals"
                className="w-full rounded-2xl"
                loading="eager"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
