import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Car, GraduationCap, Plus } from "lucide-react";

interface FinancialGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  icon: React.ReactNode;
  category: string;
}

const GoalTracker = () => {
  const goals: FinancialGoal[] = [
    {
      id: "1",
      title: "Emergency Fund",
      target: 10000,
      current: 7500,
      deadline: "Dec 2024",
      icon: <Home className="h-5 w-5" />,
      category: "Safety"
    },
    {
      id: "2", 
      title: "New Car Down Payment",
      target: 5000,
      current: 2800,
      deadline: "Jun 2025",
      icon: <Car className="h-5 w-5" />,
      category: "Purchase"
    },
    {
      id: "3",
      title: "Education Fund",
      target: 15000,
      current: 4200,
      deadline: "Aug 2026",
      icon: <GraduationCap className="h-5 w-5" />,
      category: "Investment"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Safety': return 'bg-success/10 text-success';
      case 'Purchase': return 'bg-primary/10 text-primary';  
      case 'Investment': return 'bg-accent/10 text-accent';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Financial Goals</h2>
          <p className="text-muted-foreground">Track your progress towards financial freedom</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary-glow">
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="grid gap-4">
        {goals.map((goal) => {
          const progress = getProgressPercentage(goal.current, goal.target);
          const remaining = goal.target - goal.current;
          
          return (
            <Card key={goal.id} className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {goal.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getCategoryColor(goal.category)}>
                          {goal.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Due: {goal.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{Math.round(progress)}%</p>
                    <p className="text-sm text-muted-foreground">Complete</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <Progress value={progress} className="h-3" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                    </span>
                    <span className="font-medium text-primary">
                      {formatCurrency(remaining)} remaining
                    </span>
                  </div>
                  
                  {progress >= 100 ? (
                    <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-success font-medium text-sm">
                        🎉 Goal achieved! Congratulations on reaching your target!
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Suggested monthly savings:</span> {formatCurrency(remaining / 12)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GoalTracker;