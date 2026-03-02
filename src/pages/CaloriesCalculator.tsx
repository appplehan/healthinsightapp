import { useState } from "react";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/ToolLayout";

const CaloriesCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [result, setResult] = useState<number | null>(null);

  const activityLevels = [
    { value: "1.2", label: "Sedentary", desc: "Little or no exercise" },
    { value: "1.375", label: "Light", desc: "Exercise 1-3 days/week" },
    { value: "1.55", label: "Moderate", desc: "Exercise 3-5 days/week" },
    { value: "1.725", label: "Active", desc: "Exercise 6-7 days/week" },
    { value: "1.9", label: "Very Active", desc: "Hard exercise daily" },
  ];

  const calculate = () => {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const act = parseFloat(activity);
    if (!a || !h || !w || a <= 0 || h <= 0 || w <= 0) return;

    let bmr: number;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }
    setResult(Math.round(bmr * act));
  };

  return (
    <ToolLayout
      title="Calories Calculator"
      description="Estimate your daily caloric needs based on your body metrics and activity level."
      icon={<Flame className="h-7 w-7 text-primary" />}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={gender === "male" ? "default" : "outline"}
                size="sm"
                onClick={() => setGender("male")}
                className="flex-1"
              >
                Male
              </Button>
              <Button
                variant={gender === "female" ? "default" : "outline"}
                size="sm"
                onClick={() => setGender("female")}
                className="flex-1"
              >
                Female
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} min="1" max="120" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cal-height">Height (cm)</Label>
                <Input id="cal-height" type="number" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)} min="1" max="300" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cal-weight">Weight (kg)</Label>
                <Input id="cal-weight" type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} min="1" max="500" className="mt-1" />
              </div>
            </div>

            <div>
              <Label>Activity Level</Label>
              <div className="mt-2 space-y-2">
                {activityLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setActivity(level.value)}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      activity === level.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="text-sm font-medium text-foreground">{level.label}</div>
                    <div className="text-xs text-muted-foreground">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate Calories
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          {result ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Daily Caloric Needs</p>
                <div className="font-display text-6xl font-bold text-foreground">
                  {result.toLocaleString()}
                </div>
                <p className="mt-1 text-lg text-muted-foreground">calories/day</p>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Weight Loss", cal: Math.round(result * 0.8), desc: "20% deficit", color: "bg-blue-500" },
                  { label: "Maintenance", cal: result, desc: "Current level", color: "bg-primary" },
                  { label: "Weight Gain", cal: Math.round(result * 1.15), desc: "15% surplus", color: "bg-accent" },
                ].map((goal) => (
                  <div key={goal.label} className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${goal.color}`} />
                      <div>
                        <div className="text-sm font-medium text-foreground">{goal.label}</div>
                        <div className="text-xs text-muted-foreground">{goal.desc}</div>
                      </div>
                    </div>
                    <div className="font-display text-lg font-bold text-foreground">
                      {goal.cal.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-secondary p-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Macronutrient Split (Balanced)</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="font-display text-lg font-bold text-foreground">{Math.round(result * 0.3 / 4)}g</div>
                    <div className="text-xs text-muted-foreground">Protein</div>
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-foreground">{Math.round(result * 0.45 / 4)}g</div>
                    <div className="text-xs text-muted-foreground">Carbs</div>
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-foreground">{Math.round(result * 0.25 / 9)}g</div>
                    <div className="text-xs text-muted-foreground">Fat</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-muted-foreground">
              <p>Fill in your details to see your caloric needs.</p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default CaloriesCalculator;
