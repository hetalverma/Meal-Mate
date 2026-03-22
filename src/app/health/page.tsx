"use client";

import * as React from "react";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Flame, 
  Droplets, 
  Zap, 
  TrendingUp, 
  Wallet, 
  AlertTriangle, 
  Download, 
  Plus, 
  ChevronRight,
  PieChart,
  BarChart3,
  Calendar
} from "lucide-react";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import { cn } from "@/lib/utils";

const WEEKLY_DATA = [
  { day: "Mon", kcal: 2100, protein: 120, carbs: 200, fat: 65 },
  { day: "Tue", kcal: 1950, protein: 110, carbs: 180, fat: 60 },
  { day: "Wed", kcal: 2300, protein: 140, carbs: 220, fat: 75 },
  { day: "Thu", kcal: 1800, protein: 95, carbs: 160, fat: 55 },
  { day: "Fri", kcal: 2200, protein: 130, carbs: 210, fat: 70 },
  { day: "Sat", kcal: 2500, protein: 115, carbs: 280, fat: 85 },
  { day: "Sun", kcal: 2100, protein: 105, carbs: 200, fat: 65 },
];

export default function HealthPage() {
  const [goalMode, setGoalMode] = React.useState("maintenance");

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Health" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        {/* GOAL MODES */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              Goal Mode <Badge variant="secondary" className="text-[10px] py-0 bg-green-100 text-green-700">Supporting</Badge>
            </h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {["bulking", "cutting", "maintenance", "custom"].map((mode) => (
              <Badge 
                key={mode}
                variant={goalMode === mode ? "default" : "outline"}
                className={cn(
                  "capitalize cursor-pointer px-4 py-1.5 border-none shadow-sm whitespace-nowrap",
                  goalMode !== mode && "bg-white"
                )}
                onClick={() => setGoalMode(mode)}
              >
                {mode}
              </Badge>
            ))}
          </div>
        </section>

        {/* NUTRITION LOG */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nutrition Log</h3>
            <span className="text-[10px] font-bold text-destructive flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Sugar Limit Near
            </span>
          </div>

          <Card className="border-none shadow-md">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" /> Daily Macros
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold">Protein</span>
                  <span className="text-muted-foreground">85g / 120g</span>
                </div>
                <Progress value={70} className="h-2 bg-primary/10" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold">Carbs</span>
                  <span className="text-muted-foreground">150g / 250g</span>
                </div>
                <Progress value={60} className="h-2 bg-secondary/10" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold">Fats</span>
                  <span className="text-muted-foreground">45g / 70g</span>
                </div>
                <Progress value={64} className="h-2 bg-accent/10" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold">Fiber</span>
                  <span className="text-muted-foreground">18g / 30g</span>
                </div>
                <Progress value={60} className="h-2 bg-emerald-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" /> Micronutrients
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Vitamin C</p>
                <div className="flex items-center gap-2">
                  <Progress value={90} className="h-1 flex-1" />
                  <span className="text-[10px] font-bold">90%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Iron</p>
                <div className="flex items-center gap-2">
                  <Progress value={45} className="h-1 flex-1" />
                  <span className="text-[10px] font-bold">45%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Calcium</p>
                <div className="flex items-center gap-2">
                  <Progress value={60} className="h-1 flex-1" />
                  <span className="text-[10px] font-bold">60%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Vitamin D</p>
                <div className="flex items-center gap-2">
                  <Progress value={20} className="h-1 flex-1" />
                  <span className="text-[10px] font-bold">20%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* TRENDS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Weekly Trends</h3>
            <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold uppercase text-primary p-0 flex gap-1">
              <Download className="h-3 w-3" /> Export PDF
            </Button>
          </div>

          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="p-4 pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold">Calories History</CardTitle>
                  <CardDescription className="text-[10px]">Last 7 days avg: 2,130 kcal</CardDescription>
                </div>
                <div className="flex gap-1">
                   <div className="h-2 w-2 rounded-full bg-primary" />
                   <div className="h-2 w-2 rounded-full bg-primary/20" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_DATA}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 'bold' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="kcal" radius={[4, 4, 0, 0]}>
                    {WEEKLY_DATA.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.kcal > 2300 ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'} 
                        fillOpacity={entry.kcal > 2300 ? 0.8 : 1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex gap-3 items-start">
             <div className="p-2 bg-white rounded-xl shadow-sm">
                <TrendingUp className="h-5 w-5 text-amber-600" />
             </div>
             <div>
                <h4 className="text-xs font-bold text-amber-900">Unhealthy Streak Alert</h4>
                <p className="text-[10px] text-amber-700 mt-0.5">You've been low on protein for 3 days. Consider adding grilled chicken to your Tuesday lunch.</p>
             </div>
          </div>
        </section>

        {/* EXPENSE TRACKER */}
        <section className="space-y-4 pb-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expense Tracker</h3>
            <Badge variant="outline" className="text-[8px] h-4">Integration Ready</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-none shadow-md bg-white">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <Wallet className="h-3 w-3" /> Spend
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1">
                <p className="text-2xl font-black">$142.50</p>
                <p className="text-[10px] text-muted-foreground mt-1">Goal: $200.00/wk</p>
                <Progress value={71} className="h-1 mt-3" />
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <PieChart className="h-3 w-3" /> Saved
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1">
                <p className="text-2xl font-black text-green-600">$48.20</p>
                <p className="text-[10px] text-muted-foreground mt-1">vs Eating Out</p>
                <div className="flex items-center gap-1 text-[8px] font-bold text-green-600 mt-3">
                  <TrendingUp className="h-2 w-2" /> 12% better
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-md overflow-hidden">
             <CardHeader className="p-4 pb-2 border-b flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold">Recent Spend Log</CardTitle>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
             </CardHeader>
             <CardContent className="p-0">
                {[
                  { item: "Weekly Groceries", date: "Oct 24", price: "$84.20", type: "manual" },
                  { item: "Avocado Salmon Toast", date: "Oct 23", price: "$4.50", type: "est" },
                  { item: "Summer Quinoa Salad", date: "Oct 22", price: "$3.20", type: "est" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                    <div className="flex gap-3 items-center">
                      <div className="h-8 w-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                        {log.type === 'manual' ? <Wallet className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{log.item}</p>
                        <p className="text-[10px] text-muted-foreground">{log.date} • {log.type === 'manual' ? 'Receipt' : 'Meal Estimate'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black">{log.price}</p>
                      <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto mt-1" />
                    </div>
                  </div>
                ))}
             </CardContent>
          </Card>

          <Button variant="outline" className="w-full h-12 rounded-2xl border-2 border-dashed border-muted hover:border-primary/20 text-muted-foreground flex items-center justify-center gap-2 group">
             <Zap className="h-4 w-4 group-hover:text-primary transition-colors" />
             Scan Grocery Bill (OCR)
             <Badge variant="secondary" className="text-[8px] py-0 px-1 ml-1 opacity-50">v2</Badge>
          </Button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
