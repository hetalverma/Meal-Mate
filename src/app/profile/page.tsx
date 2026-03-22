"use client";

import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, Settings, Shield, Bell, HelpCircle, LogOut, ChevronRight, CreditCard } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const avatarImg = PlaceHolderImages.find(img => img.id === 'avatar-user');

  const handleLogout = () => {
    localStorage.removeItem("mealmate_onboarded");
    router.push("/");
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Profile" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <section className="flex flex-col items-center gap-3 py-6">
          <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
            <AvatarImage src={avatarImg?.imageUrl || ""} />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-bold font-headline">Alex Miller</h2>
            <p className="text-sm text-muted-foreground">miller.alex@example.com</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-full mt-2">
            Edit Profile
          </Button>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Account Settings</h3>
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              {[
                { icon: User, label: "Personal Information" },
                { icon: CreditCard, label: "Subscription Plan" },
                { icon: Shield, label: "Security & Privacy" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg"><item.icon className="h-4 w-4 text-muted-foreground" /></div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Preferences</h3>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg"><Bell className="h-4 w-4 text-primary" /></div>
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Meal Reminders</Label>
                    <p className="text-[10px] text-muted-foreground">Notify me before next meal</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg"><Settings className="h-4 w-4 text-secondary" /></div>
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Smart Budget</Label>
                    <p className="text-[10px] text-muted-foreground">Adjust plans based on spend</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Support</h3>
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              {[
                { icon: HelpCircle, label: "Help Center" },
                { icon: Settings, label: "App Settings" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg"><item.icon className="h-4 w-4 text-muted-foreground" /></div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </CardContent>
          </Card>
        </section>

        <Button 
          variant="ghost" 
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 h-12"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}