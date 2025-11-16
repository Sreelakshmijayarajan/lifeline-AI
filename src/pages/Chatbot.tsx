import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Phone, Ambulance, AlertTriangle, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  timestamp: string;
}

const quickActions = [
  { icon: AlertTriangle, label: "Report Accident", color: "emergency-red" },
  { icon: Ambulance, label: "Need Ambulance", color: "health-green" },
  { icon: Phone, label: "Emergency Call", color: "primary" },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your AI LifeLine assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content: "I understand your concern. Let me help you with that. Emergency services have been notified of your location.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content: `Processing your request for: ${action}. Emergency services are being dispatched to your location.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: "bot",
        content: "Chat cleared. How can I assist you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
          <p className="text-muted-foreground mt-1">Get instant help and emergency support</p>
        </div>
        <Button variant="outline" size="sm" onClick={clearChat}>
          <Trash2 size={16} className="mr-2" />
          Clear Chat
        </Button>
      </div>

      {/* Chat Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Chat Messages */}
        <Card className="lg:col-span-2 flex flex-col p-6">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start gap-3 ${
                    message.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      message.type === "bot"
                        ? "bg-primary/10"
                        : "bg-secondary"
                    }`}
                  >
                    {message.type === "bot" ? (
                      <Bot size={20} className="text-primary" />
                    ) : (
                      <User size={20} className="text-foreground" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.type === "user" ? "text-right" : ""}`}>
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.type === "bot"
                          ? "bg-muted"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSend}>
              <Send size={20} />
            </Button>
          </div>
        </Card>

        {/* Quick Actions Panel */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, idx) => (
              <motion.div
                key={action.label}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-4"
                  onClick={() => handleQuickAction(action.label)}
                >
                  <div className={`p-2 rounded-lg bg-${action.color}/10`}>
                    <action.icon className={`text-${action.color}`} size={20} />
                  </div>
                  <span className="font-medium">{action.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3">Suggested Questions</h3>
            <div className="space-y-2">
              {[
                "What's the nearest hospital?",
                "How do I perform CPR?",
                "Report a fire emergency",
                "Check my emergency contacts",
              ].map((question, idx) => (
                <motion.button
                  key={question}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  onClick={() => setInputValue(question)}
                  className="w-full text-left text-sm p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> In case of life-threatening emergency, call emergency services directly at <strong>911</strong>
            </p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
