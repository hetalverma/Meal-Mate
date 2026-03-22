"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GripVertical, Store } from "lucide-react";

const INITIAL_STORES = [
  { id: "blinkit", name: "Blinkit", priority: 1 },
  { id: "zepto", name: "Zepto", priority: 2 },
  { id: "bigbasket", name: "BigBasket", priority: 3 },
  { id: "swiggy", name: "Swiggy Instamart", priority: 4 },
];

export default function PreferredStoresPage() {
  const router = useRouter();
  const [stores, setStores] = React.useState(INITIAL_STORES);

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Preferred Stores" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="p-0 h-auto flex gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Button>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Shopping Priority</CardTitle>
            <p className="text-xs text-muted-foreground">Set store priority order for shopping list links.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {stores.map((store, index) => (
              <div key={store.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-transparent hover:border-primary/20 transition-all">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{store.name}</p>
                </div>
                <span className="text-xs font-black text-primary/50">#{index + 1}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Note:</strong> When you generate a shopping list, we will prioritize checkout links for these stores in your selected order.
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
