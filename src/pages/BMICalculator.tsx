import { useState } from "react";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/ToolLayout";

type BMICategory = "Underweight" | "Normal" | "Overweight" | "Obese";

const getBMICategory = (bmi: number): { category: BMICategory; color: string; advice: string } => {
  if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500", advice: "Consider consulting a nutritionist to develop a healthy weight gain plan with balanced meals." };
  if (bmi < 25) return { category: "Normal", color: "text-primary", advice: "Great job! Maintain your healthy weight with regular exercise and a balanced diet." };
  if (bmi < 30) return { category: "Overweight", color: "text-amber-500", advice: "Consider increasing physical activity and reviewing your diet. Small changes can make a big difference." };
  return { category: "Obese", color: "text-red-500", advice: "We recommend speaking with a healthcare professional to create a personalized weight management plan." };
};

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [result, setResult] = useState<number | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;

    let bmi: number;
    if (unit === "metric") {
      const heightM = h / 100;
      bmi = w / (heightM * heightM);
    } else {
      bmi = (w / (h * h)) * 703;
    }
    setResult(Math.round(bmi * 10) / 10);
  };

  const bmiInfo = result ? getBMICategory(result) : null;

  const bmiRangePercent = result ? Math.min(Math.max(((result - 10) / 35) * 100, 0), 100) : 0;

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index and understand your weight category."
      icon={<Scale className="h-7 w-7 text-primary" />}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          <div className="mb-6 flex gap-2">
            <Button
              variant={unit === "metric" ? "default" : "outline"}
              size="sm"
              onClick={() => { setUnit("metric"); setResult(null); setHeight(""); setWeight(""); }}
            >
              Metric (cm/kg)
            </Button>
            <Button
              variant={unit === "imperial" ? "default" : "outline"}
              size="sm"
              onClick={() => { setUnit("imperial"); setResult(null); setHeight(""); setWeight(""); }}
            >
              Imperial (in/lbs)
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === "metric" ? "e.g., 175" : "e.g., 69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="1"
                max={unit === "metric" ? "300" : "120"}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
              <Input
                id="weight"
                type="number"
                placeholder={unit === "metric" ? "e.g., 70" : "e.g., 154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="1"
                max={unit === "metric" ? "500" : "1100"}
                className="mt-1"
              />
            </div>
            <Button onClick={calculateBMI} className="w-full">
              Calculate BMI
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          {result && bmiInfo ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="font-display text-6xl font-bold text-foreground">
                  {result}
                </div>
                <div className={`mt-2 font-display text-xl font-semibold ${bmiInfo.color}`}>
                  {bmiInfo.category}
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
                  <div className="absolute inset-y-0 left-0 w-[25%] bg-blue-400/40" />
                  <div className="absolute inset-y-0 left-[25%] w-[25%] bg-primary/40" />
                  <div className="absolute inset-y-0 left-[50%] w-[18%] bg-amber-400/40" />
                  <div className="absolute inset-y-0 left-[68%] w-[32%] bg-red-400/40" />
                  <div
                    className="absolute top-0 h-4 w-1 rounded-full bg-foreground transition-all"
                    style={{ left: `${bmiRangePercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>

              <div className="rounded-lg bg-secondary p-4">
                <p className="text-sm leading-relaxed text-secondary-foreground">
                  {bmiInfo.advice}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-muted-foreground">
              <p>Enter your height and weight to see your BMI result.</p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default BMICalculator;
