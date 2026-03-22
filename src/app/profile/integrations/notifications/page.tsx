"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bell, Share2 } from "lucide-react";

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Notifications & Sharing" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="p-0 h-auto flex gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Button>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" /> Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="font-bold">Prep Reminders</Label>
                <p className="text-xs text-muted-foreground">Get notified when it's time to start cooking.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="font-bold">Grocery Run Alerts</Label>
                <p className="text-xs text-muted-foreground">Reminders to buy ingredients before they run out.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="font-bold">Streak Nudges</Label>
                <p className="text-xs text-muted-foreground">Stay on track with your healthy eating streaks.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Share2 className="h-5 w-5 text-green-600" /> WhatsApp Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="font-bold">One-tap Shopping Share</Label>
                <p className="text-xs text-muted-foreground">Enable quick share button for shopping lists.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button variant="outline" className="w-full text-green-600 border-green-200 bg-green-50 font-bold">
              Test WhatsApp Connection
            </Button>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
}
