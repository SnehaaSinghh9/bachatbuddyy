import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialChatbot from "@/components/FinancialChatbot";
import GoalTracker from "@/components/GoalTracker";
import { MessageCircle, Target } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto p-4 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-screen flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-card shadow-sm">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Advisor
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              My Goals
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex-1 min-h-0">
            <FinancialChatbot />
          </TabsContent>
          
          <TabsContent value="goals" className="flex-1 overflow-auto">
            <GoalTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
