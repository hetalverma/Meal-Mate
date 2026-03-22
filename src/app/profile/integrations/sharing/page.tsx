"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserPlus, Mail, Phone, Trash2 } from "lucide-react";

export default function SharingModePage() {
  const router = useRouter();
  const [invites, setInvites] = React.useState([
    { id: 1, type: "email", value: "sam.flatmate@example.com", status: "pending" },
  ]);

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Roommate Mode" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="p-0 h-auto flex gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Button>

        <Card className="border-none shadow-md bg-purple-50/50">
          <CardHeader>
            <CardTitle className="text-lg text-purple-900">Share Meal Plan</CardTitle>
            <p className="text-xs text-purple-700">Flatmates can see the weekly plan and add to shopping list.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Enter email or phone..." className="bg-white border-purple-200" />
              <Button className="bg-purple-600 hover:bg-purple-700 shrink-0">
                <UserPlus className="h-4 w-4 mr-2" /> Invite
              </Button>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">Active Members</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border">
               <div className="flex items-center gap-3">
                 <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">AM</div>
                 <div>
                   <p className="text-sm font-bold">You (Alex)</p>
                   <p className="text-[10px] text-muted-foreground uppercase font-bold">Owner</p>
                 </div>
               </div>
            </div>

            {invites.map((invite) => (
              <div key={invite.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    {invite.type === 'email' ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold truncate max-w-[150px]">{invite.value}</p>
                    <Badge variant="secondary" className="text-[8px] h-3 uppercase">{invite.status}</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
