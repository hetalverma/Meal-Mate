"use client";

import * as React from "react";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  Bell, 
  LogOut, 
  ChevronRight, 
  Calendar, 
  Smartphone, 
  MessageSquare, 
  Store, 
  Filter,
  Users,
  Info
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const avatarImg = PlaceHolderImages.find(img => img.id === 'avatar-user');

  const handleLogout = () => {
    localStorage.removeItem("mealmate_onboarded");
    router.push("/");
  };

  const SectionHeader = ({ title, count }: { title: string; count?: string }) => (
    <div className="flex items-center justify-between px-1 mb-3">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      {count && (
        <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0">
          {count}
        </Badge>
      )}
    </div>
  );

  const FeatureItem = ({ 
    icon: Icon, 
    title, 
    desc, 
    badge, 
    badgeColor = "bg-green-100 text-green-700",
    dotColor = "bg-green-500",
    showChevron = true,
    children
  }: { 
    icon: any; 
    title: string; 
    desc?: string[]; 
    badge?: string; 
    badgeColor?: string;
    dotColor?: string;
    showChevron?: boolean;
    children?: React.ReactNode;
  }) => (
    <div className="group flex items-start gap-4 p-4 hover:bg-muted/30 transition-colors border-b last:border-0 relative">
      <div className={cn("absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ml-1", dotColor)} />
      <div className="flex-1 space-y-1 ml-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">{title}</span>
          {badge && (
            <Badge variant="secondary" className={cn("text-[8px] py-0 px-1.5 h-4 italic font-bold", badgeColor)}>
              {badge}
            </Badge>
          )}
        </div>
        {desc && desc.map((d, i) => (
          <p key={i} className="text-[11px] text-muted-foreground flex items-center gap-2">
            <span className="opacity-50">—</span> {d}
          </p>
        ))}
        {children}
      </div>
      {showChevron && (
        <div className="pt-1">
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Profile" />
      
      <main className="p-4 space-y-8 max-w-md mx-auto">
        {/* User Profile Summary */}
        <section className="flex flex-col items-center gap-3 py-4">
          <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
            <AvatarImage src={avatarImg?.imageUrl || ""} />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-bold font-headline">Alex Miller</h2>
            <p className="text-sm text-muted-foreground">miller.alex@google.com</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-full mt-2 h-8 text-xs font-bold border-2">
            Edit Profile
          </Button>
        </section>

        {/* ACCOUNT SECTION */}
        <section className="space-y-1">
          <SectionHeader title="Account" />
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <FeatureItem 
                icon={User}
                title="Profile management"
                desc={["Name, photo, email from Google", "Edit diet goals and calorie targets"]}
                badge="Supporting"
              />
              <FeatureItem 
                icon={Bell}
                title="Notification preferences"
                desc={["Prep reminders, grocery run alerts, streak nudges"]}
                badge="Supporting"
              >
                <div className="flex gap-4 mt-3">
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-muted-foreground">Prep</span>
                     <Switch className="scale-75" defaultChecked />
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-muted-foreground">Streak</span>
                     <Switch className="scale-75" />
                   </div>
                </div>
              </FeatureItem>
              <FeatureItem 
                icon={Users}
                title="Roommate / sharing mode"
                desc={["Share plan with flatmates"]}
                badge="v2"
                badgeColor="bg-purple-100 text-purple-700"
                dotColor="bg-purple-500"
              />
            </CardContent>
          </Card>
        </section>

        {/* INTEGRATIONS SECTION */}
        <section className="space-y-1">
          <SectionHeader title="Integrations" />
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <FeatureItem 
                icon={Calendar}
                title="Google Calendar sync"
                desc={["Two-way sync — meals appear as events", "Ingredients in event description field"]}
                badge="Integration"
                badgeColor="bg-blue-100 text-blue-700"
                dotColor="bg-blue-500"
              />
              <FeatureItem 
                icon={Smartphone}
                title="Apple Calendar + Siri"
                desc={["Apple Calendar sync", "Siri shortcut: \"What's for dinner tonight?\""]}
                badge="Integration"
                badgeColor="bg-blue-100 text-blue-700"
                dotColor="bg-blue-500"
              />
              <FeatureItem 
                icon={MessageSquare}
                title="WhatsApp shopping list share"
                desc={["One-tap share of weekly shopping list to WhatsApp"]}
                badge="Integration"
                badgeColor="bg-blue-100 text-blue-700"
                dotColor="bg-blue-500"
              />
            </CardContent>
          </Card>
        </section>

        {/* SETTINGS SECTION */}
        <section className="space-y-1">
          <SectionHeader title="Settings" />
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <FeatureItem 
                icon={Store}
                title="Preferred stores"
                desc={["Set default: Blinkit, Zepto, BigBasket etc.", "Store priority order for shopping list links"]}
                badge="Supporting"
              />
              <FeatureItem 
                icon={Filter}
                title="Diet preferences"
                desc={["Update veg / non-veg / allergy filters anytime"]}
                badge="Supporting"
              />
            </CardContent>
          </Card>
        </section>

        {/* LOGOUT */}
        <section className="pt-4">
          <Button 
            variant="ghost" 
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 h-14 rounded-2xl flex items-center justify-center gap-2 font-bold"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" /> Sign Out from Meal Mate
          </Button>
          <p className="text-[10px] text-center text-muted-foreground mt-4 font-medium uppercase tracking-widest">
            App Version 1.4.2 (Build 92)
          </p>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
