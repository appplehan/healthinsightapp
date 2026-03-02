import { useState } from "react";
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/ToolLayout";

const SleepScore = () => {
  const [bedtime, setBedtime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [awakenings, setAwakenings] = useState("1");
  const [sleepLatency, setSleepLatency] = useState("15");
  const [feeling, setFeeling] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const [bH, bM] = bedtime.split(":").map(Number);
    const [wH, wM] = wakeTime.split(":").map(Number);

    let bedMin = bH * 60 + bM;
    let wakeMin = wH * 60 + wM;
    if (wakeMin <= bedMin) wakeMin += 1440;

    const latency = parseFloat(sleepLatency) || 0;
    const totalMin = wakeMin - bedMin - latency;
    const totalHours = totalMin / 60;

    const awk = parseInt(awakenings) || 0;

    // Duration score (max 40 pts, optimal 7-9h)
    let durationScore: number;
    if (totalHours >= 7 && totalHours <= 9) durationScore = 40;
    else if (totalHours >= 6 && totalHours < 7) durationScore = 30;
    else if (totalHours > 9 && totalHours <= 10) durationScore = 30;
    else if (totalHours >= 5) durationScore = 20;
    else durationScore = 10;

    // Latency score (max 15 pts)
    let latencyScore: number;
    if (latency <= 10) latencyScore = 15;
    else if (latency <= 20) latencyScore = 12;
    else if (latency <= 40) latencyScore = 8;
    else latencyScore = 4;

    // Awakenings score (max 20 pts)
    let awakScore: number;
    if (awk === 0) awakScore = 20;
    else if (awk === 1) awakScore = 15;
    else if (awk <= 3) awakScore = 10;
    else awakScore = 5;

    // Feeling score (max 25 pts)
    const feelScore = feeling * 5;

    const total = Math.min(durationScore + latencyScore + awakScore + feelScore, 100);
    setResult(total);
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return { label: "Excellent", color: "text-primary", emoji: "🌟" };
    if (score >= 70) return { label: "Good", color: "text-primary", emoji: "😊" };
    if (score >= 50) return { label: "Fair", color: "text-amber-500", emoji: "😐" };
    return { label: "Poor", color: "text-red-500", emoji: "😴" };
  };

  const scoreInfo = result !== null ? getScoreLabel(result) : null;

  return (
    <ToolLayout
      title="Sleep Score"
      description="Evaluate your sleep quality based on duration, latency, and disruptions."
      icon={<Moon className="h-7 w-7 text-primary" />}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="bedtime">Bedtime</Label>
                <Input id="bedtime" type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="waketime">Wake Time</Label>
                <Input id="waketime" type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="mt-1" />
              </div>
            </div>

            <div>
              <Label htmlFor="latency">Time to Fall Asleep (minutes)</Label>
              <Input id="latency" type="number" placeholder="15" value={sleepLatency} onChange={(e) => setSleepLatency(e.target.value)} min="0" max="180" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="awakenings">Night Awakenings</Label>
              <Input id="awakenings" type="number" placeholder="1" value={awakenings} onChange={(e) => setAwakenings(e.target.value)} min="0" max="20" className="mt-1" />
            </div>

            <div>
              <Label>How Did You Feel Waking Up?</Label>
              <div className="mt-2 flex justify-between gap-2">
                {([1, 2, 3, 4, 5] as const).map((val) => (
                  <button
                    key={val}
                    onClick={() => setFeeling(val)}
                    className={`flex-1 rounded-lg border p-3 text-center transition-all ${
                      feeling === val ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="text-xl">{["😫", "😴", "😐", "😊", "🌟"][val - 1]}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{["Terrible", "Poor", "Okay", "Good", "Great"][val - 1]}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate Sleep Score
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          {result !== null && scoreInfo ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl">{scoreInfo.emoji}</div>
                <div className="mt-2 font-display text-6xl font-bold text-foreground">
                  {result}
                </div>
                <div className={`mt-1 font-display text-xl font-semibold ${scoreInfo.color}`}>
                  {scoreInfo.label}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">out of 100</p>
              </div>

              <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: `${result}%` }}
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Tips to Improve</h4>
                {[
                  "Keep a consistent sleep schedule, even on weekends.",
                  "Avoid screens 1 hour before bedtime.",
                  "Keep your bedroom cool (65-68°F / 18-20°C).",
                  "Limit caffeine intake after 2 PM.",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-lg bg-secondary px-4 py-3">
                    <span className="text-primary">•</span>
                    <p className="text-sm text-secondary-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-muted-foreground">
              <p>Enter your sleep details to get your quality score.</p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default SleepScore;
