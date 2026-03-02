import { Activity } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              Health<span className="text-primary">Insight</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 HealthInsight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
