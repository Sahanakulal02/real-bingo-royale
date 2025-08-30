import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroBg from "@/assets/bingo-hero-bg.jpg";

const GameLanding = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 10, 6, 0.8), rgba(240, 8, 10, 0.9)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="bingo-header gradient-text">
            <span className="bingo-b">B</span>
            <span className="bingo-i">I</span>
            <span className="bingo-n">N</span>
            <span className="bingo-g">G</span>
            <span className="bingo-o">O</span>
          </h1>
          <p className="text-muted-foreground text-lg">Royale Edition</p>
        </div>

        {/* Auth Card */}
        <Card className="card-shadow border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center text-foreground">
              {isSignUp ? "Join the Game" : "Welcome Back"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={isSignUp ? "signup" : "signin"} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger 
                  value="signin" 
                  onClick={() => setIsSignUp(false)}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  onClick={() => setIsSignUp(true)}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password"
                    className="bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>
                <Button className="w-full glow-effect bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Playing
                </Button>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Choose your game name"
                    className="bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    placeholder="Create a password"
                    className="bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>
                <Button className="w-full accent-glow bg-accent hover:bg-accent/90 text-accent-foreground">
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            🎮 Real-time multiplayer gameplay
          </p>
          <p className="text-sm text-muted-foreground">
            🏆 Global leaderboards & scoring
          </p>
          <p className="text-sm text-muted-foreground">
            📱 Play anywhere, any device
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameLanding;