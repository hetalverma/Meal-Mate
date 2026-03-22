"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GripVertical, Store, Link as LinkIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const INITIAL_STORES = [
  { id: "blinkit", name: "Blinkit", priority: 1, connected: true, color: "bg-yellow-400", logo: "https://logo.clearbit.com/blinkit.com" },
  { id: "zepto", name: "Zepto", priority: 2, connected: false, color: "bg-purple-600", logo: "https://logo.clearbit.com/zepto.co" },
  { id: "bigbasket", name: "BigBasket", priority: 3, connected: false, color: "bg-green-600", logo: "https://logo.clearbit.com/bigbasket.com" },
  { id: "swiggy", name: "Swiggy Instamart", priority: 4, connected: false, color: "bg-orange-500", logo: "https://logo.clearbit.com/swiggy.com" },
  { id: "amazon", name: "Amazon Fresh", priority: 5, connected: false, color: "bg-black", logo: "https://logo.clearbit.com/amazon.in" },
  { id: "flipkart", name: "Flipkart Minutes", priority: 6, connected: false, color: "bg-blue-500", logo: "https://logo.clearbit.com/flipkart.com" },
  { id: "spencers", name: "Spencers", priority: 7, connected: false, color: "bg-red-600", logo: "https://logo.clearbit.com/spencersretail.com" },
  { id: "jiomart", name: "Jio Mart", priority: 8, connected: false, color: "bg-blue-700", logo: "https://logo.clearbit.com/jiomart.com" },
  { id: "countrydelight", name: "Country Delight", priority: 9, connected: false, color: "bg-emerald-500", logo: "https://logo.clearbit.com/countrydelight.in" },
  { id: "dmart", name: "Dmart", priority: 10, connected: false, color: "bg-green-700", logo: "https://logo.clearbit.com/dmartindia.com" },
  { id: "deliveroo", name: "Deliveroo", priority: 11, connected: false, color: "bg-teal-400", logo: "https://logo.clearbit.com/deliveroo.com" },
  { id: "dunzo", name: "Dunzo", priority: 12, connected: false, color: "bg-blue-400", logo: "https://logo.clearbit.com/dunzo.in" },
  { id: "licious", name: "Licious", priority: 13, connected: false, color: "bg-rose-600", logo: "https://logo.clearbit.com/licious.in" },
  { id: "milkbasket", name: "Milkbasket", priority: 14, connected: false, color: "bg-blue-600", logo: "https://logo.clearbit.com/milkbasket.com" },
  { id: "naturesbasket", name: "Nature's Basket", priority: 15, connected: false, color: "bg-lime-600", logo: "https://logo.clearbit.com/naturesbasket.co.in" },
  { id: "porter", name: "Porter", priority: 16, connected: false, color: "bg-sky-600", logo: "https://logo.clearbit.com/porter.in" },
];

export default function PreferredStoresPage() {
  const router = useRouter();
  const [stores, setStores] = React.useState(INITIAL_STORES);
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  const toggleConnect = (id: string) => {
    setStores(prev => prev.map(store => 
      store.id === id ? { ...store, connected: !store.connected } : store
    ));
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Preferred Stores" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="p-0 h-auto flex gap-2 text-muted-foreground hover:bg-transparent">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Button>

        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-lg">Shopping Priority</CardTitle>
            <p className="text-xs text-muted-foreground">Manage connections and set your preferred order for grocery apps.</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {stores.map((store, index) => (
                <div key={store.id} className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-all group">
                  <GripVertical className="h-4 w-4 text-muted-foreground/40 cursor-grab shrink-0 group-hover:text-muted-foreground" />
                  
                  {/* Brand Logo Container */}
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center shadow-sm shrink-0 transition-transform group-hover:scale-105 overflow-hidden border relative",
                    store.color
                  )}>
                    {!imageErrors[store.id] ? (
                      <div className="relative w-full h-full bg-white">
                        <Image 
                          src={store.logo} 
                          alt={store.name} 
                          fill
                          sizes="48px"
                          className="object-contain p-2"
                          onError={() => {
                            setImageErrors(prev => ({ ...prev, [store.id]: true }));
                          }}
                        />
                      </div>
                    ) : (
                      <Store className="h-6 w-6 text-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 ml-1">
                    <p className="font-bold text-sm truncate">{store.name}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">Priority #{index + 1}</p>
                  </div>

                  <Button 
                    size="sm" 
                    variant={store.connected ? "secondary" : "outline"}
                    className={cn(
                      "h-8 text-[10px] font-bold uppercase rounded-full px-3 transition-all shrink-0",
                      store.connected ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : "border-primary/20 text-primary hover:bg-primary/5"
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
            </div>
          </CardContent>
        </Card>

        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
          <div className="flex gap-3">
            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <LinkIcon className="h-3 w-3 text-primary" />
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Linking your accounts allows <strong>Meal Mate AI</strong> to check stock, compare prices, and build instant shopping carts across your favorite stores.
            </p>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
