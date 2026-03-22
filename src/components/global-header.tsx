"use client";

import { ShoppingListDrawer } from "./shopping-list/shopping-list-drawer";

export function GlobalHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-40 glass-morphism border-b px-4 py-3 flex justify-between items-center h-16">
      <h1 className="text-xl font-bold font-headline text-primary">
        {title === "Home" ? "Meal Mate" : title}
      </h1>
      <ShoppingListDrawer />
    </header>
  );
}