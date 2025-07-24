import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Target, TrendingUp, DollarSign } from "lucide-react";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FinancialChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI financial advisor. I'm here to help you achieve your financial goals. What would you like to work on today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const suggestedPrompts = [
    "Help me create a budget",
    "I want to save for a house",
    "How should I invest $10,000?",
    "Reduce my monthly expenses"
  ];

  const mockResponses = [
    "That's a great financial goal! Let me help you create a plan to achieve it.",
    "Based on your situation, I'd recommend starting with these key steps...",
    "Here's a personalized strategy that can help you reach your target faster.",
    "Let's break this down into manageable monthly actions you can take."
  ];

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    // setTimeout(() => {
    //   const botMessage: Message = {
    //     id: (Date.now() + 1).toString(),
    //     content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
    //     // content: openAiResponse()
    //     sender: 'bot',
    //     timestamp: new Date()
    //   };
    //   setMessages(prev => [...prev, botMessage]);
    // }, 1000);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model:"gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a financial advisor assistant." },
            { role: "user", content: content }
          ],
        }),
      });
  
      const data = await response.json();
      console.log(data);
      const botReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
  
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botReply,
        sender: 'bot',
        timestamp: new Date()
      };
  
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("OpenAI error:", error);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Something went wrong while fetching a response. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow p-6 text-primary-foreground">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Bachat Buddy</h1>
            <p className="text-primary-foreground/80">Your Personal Financial Advisor</p>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-muted/30">
        <Card className="p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Target className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Financial Goals</p>
              <p className="text-xl font-semibold">3 Active</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Progress Score</p>
              <p className="text-xl font-semibold">78%</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Savings</p>
              <p className="text-xl font-semibold">$1,250</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : 'bg-card border shadow-sm'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 bg-secondary">
                    <AvatarFallback>
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-sm text-muted-foreground mb-3">Try asking about:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start text-left h-auto p-3"
                  onClick={() => handleSendMessage(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 border-t bg-card">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your finances..."
              className="flex-1"
            />
            <Button 
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-primary to-primary-glow"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialChatbot;