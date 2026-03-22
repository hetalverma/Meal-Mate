"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Chrome, Apple } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const handleSignIn = (provider: string) => {
    // Mock authentication
    console.log(`Signing in with ${provider}`);
    const onboarded = typeof window !== 'undefined' ? localStorage.getItem("mealmate_onboarded") : null;
    if (onboarded) {
      router.push("/home");
    } else {
      router.push("/onboarding");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="mb-12 text-center space-y-4">
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto shadow-xl rotate-3">
          <Utensils className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold font-headline tracking-tight text-primary">Meal Mate</h1>
        <p className="text-muted-foreground text-lg max-w-xs mx-auto">
          Smarter meal planning for a healthier lifestyle and budget.
        </p>
      </div>

      <Card className="w-full max-w-md border-none shadow-2xl bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to start your journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full h-12 flex items-center justify-center gap-3 font-semibold text-base border-muted-foreground/20 hover:bg-muted"
            onClick={() => handleSignIn("Google")}
          >
            <Chrome className="h-5 w-5" />
            Continue with Google
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-12 flex items-center justify-center gap-3 font-semibold text-base border-muted-foreground/20 hover:bg-muted"
            onClick={() => handleSignIn("Apple")}
          >
            <Apple className="h-5 w-5" />
            Continue with Apple
          </Button>
          
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue as guest</span>
            </div>
          </div>

          <Button 
            variant="ghost" 
            className="w-full text-primary font-bold"
            onClick={() => handleSignIn("Guest")}
          >
            Explore App
          </Button>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-xs text-muted-foreground text-center max-w-xs">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}