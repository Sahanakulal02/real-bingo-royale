import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Crown, Clock, Users } from "lucide-react";

interface BingoCell {
  number: number;
  called: boolean;
  marked: boolean;
}

interface Player {
  id: string;
  name: string;
  score: number;
  isWinner: boolean;
}

const generateBingoCard = (): BingoCell[][] => {
  const card: BingoCell[][] = [];
  const ranges = [
    [1, 15],   // B
    [16, 30],  // I  
    [31, 45],  // N
    [46, 60],  // G
    [61, 75]   // O
  ];

  for (let col = 0; col < 5; col++) {
    const column: BingoCell[] = [];
    const [min, max] = ranges[col];
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    
    // Shuffle and pick 5 numbers
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    for (let row = 0; row < 5; row++) {
      column.push({
        number: row === 2 && col === 2 ? 0 : numbers[row], // Center is FREE
        called: row === 2 && col === 2, // Center starts as called
        marked: row === 2 && col === 2  // Center starts as marked
      });
    }
    card.push(column);
  }

  return card;
};

const BingoGame = () => {
  const [bingoCard, setBingoCard] = useState<BingoCell[][]>(generateBingoCard());
  const [currentCall, setCurrentCall] = useState<number | null>(null);
  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);

  const players: Player[] = [
    { id: "1", name: "You", score: 0, isWinner: false },
    { id: "2", name: "Sarah", score: 2, isWinner: false },
    { id: "3", name: "Alex", score: 1, isWinner: false },
  ];

  // Game timer
  useEffect(() => {
    if (!isGameActive) return;
    
    const timer = setInterval(() => {
      setGameTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameActive]);

  // Auto-call numbers every 3 seconds
  useEffect(() => {
    if (!isGameActive) return;

    const interval = setInterval(() => {
      const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
      const remainingNumbers = allNumbers.filter(num => !calledNumbers.includes(num));
      
      if (remainingNumbers.length > 0) {
        const nextNumber = remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)];
        setCurrentCall(nextNumber);
        setCalledNumbers(prev => [...prev, nextNumber]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [calledNumbers, isGameActive]);

  const handleCellClick = (colIndex: number, rowIndex: number) => {
    if (!isGameActive) return;
    
    setBingoCard(prev => {
      const newCard = prev.map(col => [...col]);
      const cell = newCard[colIndex][rowIndex];
      
      if (cell.called && !cell.marked) {
        cell.marked = true;
      }
      
      return newCard;
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getLetterForColumn = (col: number) => {
    return ['B', 'I', 'N', 'G', 'O'][col];
  };

  const getLetterColor = (col: number) => {
    return ['bingo-b', 'bingo-i', 'bingo-n', 'bingo-g', 'bingo-o'][col];
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Live Game</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTime(gameTime)}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {players.length} players
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Game Area */}
          <div className="xl:col-span-3 space-y-6">
            {/* Current Call */}
            <Card className="card-shadow bg-card/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Current Call</h2>
                  {currentCall ? (
                    <div className="space-y-2">
                      <div className="text-6xl md:text-8xl font-bold gradient-text">
                        {getLetterForColumn(Math.ceil(currentCall / 15) - 1)}-{currentCall}
                      </div>
                      <div className="text-xl text-muted-foreground">
                        Called: {calledNumbers.length} / 75
                      </div>
                      <Progress value={(calledNumbers.length / 75) * 100} className="w-full" />
                    </div>
                  ) : (
                    <div className="text-2xl text-muted-foreground">
                      Game starting...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Bingo Card */}
            <Card className="card-shadow bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-center">Your Bingo Card</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {/* Header Letters */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
                    <div 
                      key={letter} 
                      className={`text-center text-3xl font-bold ${getLetterColor(index)}`}
                    >
                      {letter}
                    </div>
                  ))}
                </div>

                {/* Bingo Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 5 }, (_, rowIndex) => 
                    Array.from({ length: 5 }, (_, colIndex) => {
                      const cell = bingoCard[colIndex][rowIndex];
                      return (
                        <div
                          key={`${colIndex}-${rowIndex}`}
                          onClick={() => handleCellClick(colIndex, rowIndex)}
                          className={`bingo-cell ${
                            cell.called ? 'called' : ''
                          } ${cell.marked ? 'marked' : ''}`}
                        >
                          {cell.number === 0 ? 'FREE' : cell.number}
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Players */}
            <Card className="card-shadow bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Players
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {players.map((player, index) => (
                  <div key={player.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={player.id === "1" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}>
                        {player.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{player.name}</span>
                        {player.isWinner && <Crown className="h-4 w-4 text-accent" />}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {player.score} lines completed
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Calls */}
            <Card className="card-shadow bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Recent Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {calledNumbers.slice(-15).reverse().map((number, index) => (
                    <div
                      key={number}
                      className={`p-2 rounded text-center text-sm font-semibold border ${
                        index === 0 
                          ? 'border-primary bg-primary/20 text-primary' 
                          : 'border-border bg-muted/30'
                      }`}
                    >
                      {getLetterForColumn(Math.ceil(number / 15) - 1)}{number}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground accent-glow">
                Call BINGO!
              </Button>
              <Button variant="outline" className="w-full">
                Leave Game
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BingoGame;