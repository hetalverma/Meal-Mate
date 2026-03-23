"use client";

import * as React from "react";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const avatarImg = PlaceHolderImages.find((img) => img.id === "avatar-user");

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
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0"
        >
          {count}
        </Badge>
      )}
    </div>
  );

  const FeatureItem = ({
    title,
    dotColor = "bg-primary",
    onClick,
  }: {
    title: string;
    dotColor?: string;
    onClick?: () => void;
  }) => (
    <div
      onClick={onClick}
      className="group flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors border-b last:border-0 relative cursor-pointer"
    >
      <div className={cn("w-1.5 h-1.5 rounded-full", dotColor)} />
      <div className="flex-1">
        <span className="text-sm font-bold">{title}</span>
      </div>
      <div>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
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
        </section>

        {/* 1. ACCOUNT SECTION */}
        <section className="space-y-1">
          <SectionHeader title="Account" />
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <FeatureItem
                title="Profile management"
                onClick={() => router.push("/profile/account")}
              />
            </CardContent>
          </Card>
        </section>

        {/* 2. SETTINGS SECTION */}
        <section className="space-y-1">
          <SectionHeader title="Settings" />
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <FeatureItem
                title="Preferred stores"
                onClick={() => router.push("/profile/settings/stores")}
              />
              <FeatureItem
                title="Diet preferences"
                onClick={() => router.push("/profile/settings/diet")}
              />
              <FeatureItem
                title="Notification preferences"
                onClick={() => router.push("/profile/integrations/notifications")}
              />
              <FeatureItem
                title="Roommate / sharing mode"
                dotColor="bg-purple-500"
                onClick={() => router.push("/profile/integrations/sharing")}
              />
            </CardContent>
          </Card>
        </section>

        {/* 3. INTEGRATIONS SECTION */}
        <section className="space-y-1">
          <SectionHeader title="Integrations" />
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <FeatureItem
                title="Calendar Sync"
                dotColor="bg-blue-500"
                onClick={() => router.push("/profile/integrations/calendars")}
              />
              <FeatureItem
                title="Apple Calendar + Siri"
                dotColor="bg-blue-500"
                onClick={() => router.push("/profile/integrations/calendars")}
              />
              <FeatureItem
                title="WhatsApp shopping list share"
                dotColor="bg-green-500"
                onClick={() => router.push("/profile/integrations/notifications")}
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
            Sign Out from Meal Mate
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
