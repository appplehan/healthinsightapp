import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hero-gradient relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
              Start Your Health Journey Today
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
              Join thousands who have transformed their health with data-driven
              insights. Your first analysis is completely free.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 font-semibold"
            >
              Begin Free Analysis <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
