import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/ToolLayout";

const HeartRateAnalyzer = () => {
  const [age, setAge] = useState("");
  const [restingHR, setRestingHR] = useState("");
  const [maxHR, setMaxHR] = useState("");
  const [result, setResult] = useState<{
    maxHR: number;
    restingHR: number;
    zones: { name: string; min: number; max: number; desc: string; color: string }[];
    fitness: string;
    fitnessColor: string;
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const rhr = parseFloat(restingHR);
    if (!a || !rhr || a <= 0 || rhr <= 0) return;

    const estimatedMax = maxHR ? parseFloat(maxHR) : Math.round(220 - a);
    const hrReserve = estimatedMax - rhr;

    const zones = [
      { name: "Zone 1 — Recovery", min: Math.round(rhr + hrReserve * 0.5), max: Math.round(rhr + hrReserve * 0.6), desc: "Warm-up, cool-down, and recovery", color: "bg-blue-400" },
      { name: "Zone 2 — Fat Burn", min: Math.round(rhr + hrReserve * 0.6), max: Math.round(rhr + hrReserve * 0.7), desc: "Aerobic endurance and fat burning", color: "bg-primary" },
      { name: "Zone 3 — Cardio", min: Math.round(rhr + hrReserve * 0.7), max: Math.round(rhr + hrReserve * 0.8), desc: "Cardiovascular fitness improvement", color: "bg-amber-500" },
      { name: "Zone 4 — Threshold", min: Math.round(rhr + hrReserve * 0.8), max: Math.round(rhr + hrReserve * 0.9), desc: "Lactate threshold training", color: "bg-orange-500" },
      { name: "Zone 5 — Max Effort", min: Math.round(rhr + hrReserve * 0.9), max: estimatedMax, desc: "Maximum performance, sprint training", color: "bg-red-500" },
    ];

    let fitness: string;
    let fitnessColor: string;
    if (rhr < 60) { fitness = "Excellent"; fitnessColor = "text-primary"; }
    else if (rhr < 70) { fitness = "Good"; fitnessColor = "text-primary"; }
    else if (rhr < 80) { fitness = "Average"; fitnessColor = "text-amber-500"; }
    else { fitness = "Below Average"; fitnessColor = "text-red-500"; }

    setResult({ maxHR: estimatedMax, restingHR: rhr, zones, fitness, fitnessColor });
  };

  return (
    <ToolLayout
      title="Heart Rate Analyzer"
      description="Analyze your heart rate zones using the Karvonen method for optimized training."
      icon={<Heart className="h-7 w-7 text-primary" />}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          <div className="space-y-4">
            <div>
              <Label htmlFor="hr-age">Age</Label>
              <Input id="hr-age" type="number" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} min="1" max="120" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="resting-hr">Resting Heart Rate (BPM)</Label>
              <Input id="resting-hr" type="number" placeholder="65" value={restingHR} onChange={(e) => setRestingHR(e.target.value)} min="30" max="200" className="mt-1" />
              <p className="mt-1 text-xs text-muted-foreground">Measure first thing in the morning while still in bed</p>
            </div>

            <div>
              <Label htmlFor="max-hr">Max Heart Rate (BPM) — Optional</Label>
              <Input id="max-hr" type="number" placeholder="Auto-calculated" value={maxHR} onChange={(e) => setMaxHR(e.target.value)} min="100" max="250" className="mt-1" />
              <p className="mt-1 text-xs text-muted-foreground">Leave blank to use 220 - age formula</p>
            </div>

            <Button onClick={calculate} className="w-full">
              Analyze Heart Rate
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          {result ? (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-secondary p-3">
                  <div className="font-display text-2xl font-bold text-foreground">{result.restingHR}</div>
                  <div className="text-xs text-muted-foreground">Resting BPM</div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <div className="font-display text-2xl font-bold text-foreground">{result.maxHR}</div>
                  <div className="text-xs text-muted-foreground">Max BPM</div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <div className={`font-display text-lg font-bold ${result.fitnessColor}`}>{result.fitness}</div>
                  <div className="text-xs text-muted-foreground">Fitness Level</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Training Zones (Karvonen Method)</h4>
                {result.zones.map((zone) => (
                  <div key={zone.name} className="overflow-hidden rounded-lg border border-border">
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${zone.color}`} />
                        <div>
                          <div className="text-sm font-medium text-foreground">{zone.name}</div>
                          <div className="text-xs text-muted-foreground">{zone.desc}</div>
                        </div>
                      </div>
                      <div className="font-display text-sm font-bold text-foreground">
                        {zone.min}–{zone.max} BPM
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-muted">
                      <div
                        className={`h-full ${zone.color}`}
                        style={{ width: `${((zone.max - zone.min) / (result.maxHR - result.restingHR)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-muted-foreground">
              <p>Enter your age and resting heart rate to see your training zones.</p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default HeartRateAnalyzer;
