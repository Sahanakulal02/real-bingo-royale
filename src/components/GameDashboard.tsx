import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, Trophy, Settings, Bell, Crown } from "lucide-react";

interface User {
  id: string;
  name: string;
  isOnline: boolean;
  gamesWon: number;
}

const mockUsers: User[] = [
  { id: "1", name: "Alex", isOnline: true, gamesWon: 12 },
  { id: "2", name: "Sarah", isOnline: true, gamesWon: 8 },
  { id: "3", name: "Mike", isOnline: false, gamesWon: 15 },
  { id: "4", name: "Emma", isOnline: true, gamesWon: 6 },
];

interface GameInvite {
  id: string;
  from: string;
  createdAt: Date;
}

const mockInvites: GameInvite[] = [
  { id: "1", from: "Sarah", createdAt: new Date(Date.now() - 300000) },
  { id: "2", from: "Alex", createdAt: new Date(Date.now() - 600000) },
];

const GameDashboard = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("play");

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              Bingo Royale
            </h1>
            <p className="text-muted-foreground">Ready to play? Choose your game mode!</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {mockInvites.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
                  {mockInvites.length}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger 
              value="play" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Game
            </TabsTrigger>
            <TabsTrigger 
              value="invites"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              Invites
              {mockInvites.length > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
                  {mockInvites.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="leaderboard"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          {/* New Game Tab */}
          <TabsContent value="play" className="space-y-6">
            <Card className="card-shadow bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Select Players
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {mockUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => toggleUserSelection(user.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedUsers.includes(user.id)
                          ? 'border-primary bg-primary/10 glow-effect'
                          : 'border-border bg-card/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{user.name}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              user.isOnline ? 'bg-success' : 'bg-muted-foreground'
                            }`} />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {user.gamesWon} games won
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full glow-effect bg-primary hover:bg-primary/90"
                  disabled={selectedUsers.length === 0}
                >
                  Start Game ({selectedUsers.length} player{selectedUsers.length !== 1 ? 's' : ''})
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invites Tab */}
          <TabsContent value="invites" className="space-y-4">
            {mockInvites.length === 0 ? (
              <Card className="card-shadow bg-card/80 backdrop-blur">
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No pending invites</p>
                </CardContent>
              </Card>
            ) : (
              mockInvites.map((invite) => (
                <Card key={invite.id} className="card-shadow bg-card/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-accent text-accent-foreground">
                            {invite.from.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{invite.from} invited you to play</p>
                          <p className="text-sm text-muted-foreground">
                            {Math.floor((Date.now() - invite.createdAt.getTime()) / 60000)} minutes ago
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Decline
                        </Button>
                        <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                          Accept
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="card-shadow bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Top Players
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers
                    .sort((a, b) => b.gamesWon - a.gamesWon)
                    .map((user, index) => (
                    <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-center w-8 h-8">
                        {index === 0 ? (
                          <Crown className="h-5 w-5 text-accent" />
                        ) : (
                          <span className="text-lg font-bold text-muted-foreground">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <Avatar>
                        <AvatarFallback className={index === 0 ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}>
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.gamesWon} wins</p>
                      </div>
                      {index === 0 && (
                        <Badge className="bg-accent text-accent-foreground">
                          Champion
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GameDashboard;