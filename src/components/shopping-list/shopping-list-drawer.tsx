"use client";

import * as React from "react";
import { ShoppingCart, Plus, Check, Trash2, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Item {
  id: string;
  name: string;
  checked: boolean;
}

export function ShoppingListDrawer() {
  const [items, setItems] = React.useState<Item[]>([
    { id: "1", name: "Avocados", checked: false },
    { id: "2", name: "Whole Wheat Bread", checked: true },
    { id: "3", name: "Eggs", checked: false },
  ]);
  const [newItemName, setNewItemName] = React.useState("");

  const addItem = () => {
    if (!newItemName.trim()) return;
    setItems([{ id: Date.now().toString(), name: newItemName, checked: false }, ...items]);
    setNewItemName("");
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {items.some(i => !i.checked) && (
            <span className="absolute top-1 right-1 h-2 w-2 bg-secondary rounded-full border border-background" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Shopping List
          </SheetTitle>
        </SheetHeader>
        
        <div className="p-6 pb-0">
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add item..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
            />
            <Button onClick={addItem} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="space-y-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">Your list is empty</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={item.id}
                      checked={item.checked}
                      onCheckedChange={() => toggleItem(item.id)}
                    />
                    <label
                      htmlFor={item.id}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        item.checked ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {item.name}
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 h-8 w-8 text-destructive"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}