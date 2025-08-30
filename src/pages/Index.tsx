import { useState } from "react";
import GameLanding from "@/components/GameLanding";
import GameDashboard from "@/components/GameDashboard";
import BingoGame from "@/components/BingoBoard";

type GameState = "landing" | "dashboard" | "game";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // For demo purposes, we'll simulate authentication
  const handleAuth = () => {
    setIsAuthenticated(true);
    setGameState("dashboard");
  };

  const startGame = () => {
    setGameState("game");
  };

  const goToDashboard = () => {
    setGameState("dashboard");
  };

  if (!isAuthenticated && gameState === "landing") {
    return <GameLanding />;
  }

  if (gameState === "dashboard") {
    return <GameDashboard />;
  }

  if (gameState === "game") {
    return <BingoGame />;
  }

  return <GameLanding />;
};

export default Index;
