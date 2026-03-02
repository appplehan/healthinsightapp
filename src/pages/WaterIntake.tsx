import { useState } from "react";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/ToolLayout";

const WaterIntake = () => {
  const [weight, setWeight] = useState("");
  const [exercise, setExercise] = useState("30");
  const [climate, setClimate] = useState<"temperate" | "hot" | "cold">("temperate");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const ex = parseFloat(exercise);
    if (!w || w <= 0) return;

    let base = w * 0.033;
    const exerciseExtra = (ex / 30) * 0.35;
    const climateMultiplier = climate === "hot" ? 1.2 : climate === "cold" ? 0.9 : 1.0;

    const total = (base + exerciseExtra) * climateMultiplier;
    setResult(Math.round(total * 10) / 10);
  };

  const glasses = result ? Math.round(result / 0.25) : 0;

  return (
    <ToolLayout
      title="Water Intake Calculator"
      description="Find out how much water you should drink daily based on your body and lifestyle."
      icon={<Droplets className="h-7 w-7 text-primary" />}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          <div className="space-y-4">
            <div>
              <Label htmlFor="water-weight">Body Weight (kg)</Label>
              <Input id="water-weight" type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} min="1" max="500" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="exercise-min">Daily Exercise (minutes)</Label>
              <Input id="exercise-min" type="number" placeholder="30" value={exercise} onChange={(e) => setExercise(e.target.value)} min="0" max="480" className="mt-1" />
            </div>

            <div>
              <Label>Climate</Label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["cold", "temperate", "hot"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setClimate(c)}
                    className={`rounded-lg border p-3 text-center text-sm font-medium capitalize transition-all ${
                      climate === c ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {c === "cold" ? "❄️" : c === "hot" ? "☀️" : "🌤️"} {c}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate Intake
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          {result ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Recommended Daily Intake</p>
                <div className="font-display text-6xl font-bold text-foreground">
                  {result}
                </div>
                <p className="mt-1 text-lg text-muted-foreground">liters/day</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1">
                {Array.from({ length: glasses }).map((_, i) => (
                  <div key={i} className="text-2xl" title="1 glass (250ml)">
                    💧
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                That's about <span className="font-semibold text-foreground">{glasses} glasses</span> (250ml each)
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Hydration Schedule</h4>
                {[
                  { time: "7:00 AM", note: "Start your day with water", amount: "500ml" },
                  { time: "10:00 AM", note: "Mid-morning hydration", amount: "250ml" },
                  { time: "12:30 PM", note: "Before lunch", amount: "500ml" },
                  { time: "3:00 PM", note: "Afternoon boost", amount: "250ml" },
                  { time: "5:30 PM", note: "Pre-workout or evening", amount: "500ml" },
                  { time: "8:00 PM", note: "Evening hydration", amount: "250ml" },
                ].map((item) => (
                  <div key={item.time} className="flex items-center justify-between rounded-lg bg-secondary px-4 py-2">
                    <div>
                      <span className="text-sm font-medium text-foreground">{item.time}</span>
                      <span className="ml-2 text-xs text-muted-foreground">— {item.note}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-muted-foreground">
              <p>Enter your details to see your water intake recommendation.</p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default WaterIntake;
