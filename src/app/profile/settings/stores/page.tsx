"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GripVertical, Store, Link as LinkIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const INITIAL_STORES = [
  { id: "blinkit", name: "Blinkit", priority: 1, connected: true },
  { id: "zepto", name: "Zepto", priority: 2, connected: false },
  { id: "bigbasket", name: "BigBasket", priority: 3, connected: false },
  { id: "swiggy", name: "Swiggy Instamart", priority: 4, connected: false },
  { id: "amazon", name: "Amazon Fresh", priority: 5, connected: false },
  { id: "flipkart", name: "Flipkart Minutes", priority: 6, connected: false },
  { id: "spencers", name: "Spencers", priority: 7, connected: false },
  { id: "jiomart", name: "Jio Mart", priority: 8, connected: false },
  { id: "countrydelight", name: "Country Delight", priority: 9, connected: false },
  { id: "dmart", name: "Dmart", priority: 10, connected: false },
  { id: "deliveroo", name: "Deliveroo", priority: 11, connected: false },
  { id: "dunzo", name: "Dunzo", priority: 12, connected: false },
  { id: "licious", name: "Licious", priority: 13, connected: false },
  { id: "milkbasket", name: "Milkbasket", priority: 14, connected: false },
  { id: "naturesbasket", name: "Nature's Basket", priority: 15, connected: false },
  { id: "porter", name: "Porter", priority: 16, connected: false },
];

export default function PreferredStoresPage() {
  const router = useRouter();
  const [stores, setStores] = React.useState(INITIAL_STORES);

  const toggleConnect = (id: string) => {
    setStores(prev => prev.map(store => 
      store.id === id ? { ...store, connected: !store.connected } : store
    ));
  };

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
            <p className="text-xs text-muted-foreground">Set store priority order and connect your accounts.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {stores.map((store, index) => (
              <div key={store.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-transparent hover:border-primary/20 transition-all">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
                <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{store.name}</p>
                  <p className="text-[10px] text-muted-foreground">Priority #{index + 1}</p>
                </div>
                <Button 
                  size="sm" 
                  variant={store.connected ? "secondary" : "outline"}
                  className={cn(
                    "h-8 text-[10px] font-bold uppercase rounded-full px-3 transition-all",
                    store.connected ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : "border-primary/20 text-primary"
                  )}
                  onClick={() => toggleConnect(store.id)}
                >
                  {store.connected ? (
                    <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Linked</span>
                  ) : (
                    <span className="flex items-center gap-1"><LinkIcon className="h-3 w-3" /> Connect</span>
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Note:</strong> Connecting your accounts allows Meal Mate to automatically build carts and check stock availability for your shopping lists.
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}