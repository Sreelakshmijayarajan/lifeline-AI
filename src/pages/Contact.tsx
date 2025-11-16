import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Plus, Trash2, Bell, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

export default function Contact() {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("emergencyContacts");
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  const saveContacts = (newContacts: EmergencyContact[]) => {
    localStorage.setItem("emergencyContacts", JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  const addContact = () => {
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Error",
        description: "Please enter both name and phone number",
        variant: "destructive",
      });
      return;
    }

    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
    };

    saveContacts([...contacts, newContact]);
    setName("");
    setPhone("");
    
    toast({
      title: "Contact Added",
      description: `${newContact.name} has been added to emergency contacts`,
    });
  };

  const removeContact = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    saveContacts(updated);
    
    toast({
      title: "Contact Removed",
      description: "Emergency contact has been removed",
    });
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    
    if (!isMonitoring) {
      toast({
        title: "Monitoring Started",
        description: "AI is now monitoring for emergency keywords and distress signals",
      });
    } else {
      toast({
        title: "Monitoring Stopped",
        description: "Emergency monitoring has been disabled",
      });
    }
  };

  const simulateEmergency = () => {
    if (contacts.length === 0) {
      toast({
        title: "No Contacts",
        description: "Please add emergency contacts first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "🚨 Emergency Alert Sent!",
      description: `Emergency SMS sent to ${contacts.length} contact(s)`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full p-6 space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground">Emergency Contacts</h1>
        <p className="text-muted-foreground mt-1">
          Add contacts who will be notified in case of emergency
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Contact Form */}
        <Card className="lg:col-span-1 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus size={20} />
            Add Contact
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                className="mt-1"
              />
            </div>
            <Button onClick={addContact} className="w-full">
              <Plus size={16} className="mr-2" />
              Add Contact
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Bell size={18} />
              Emergency Detection
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  AI monitors calls for keywords like "help", "emergency", "accident" and distress tone
                </p>
              </div>
              <Button
                onClick={toggleMonitoring}
                variant={isMonitoring ? "destructive" : "default"}
                className="w-full"
              >
                {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
              </Button>
              <Button
                onClick={simulateEmergency}
                variant="outline"
                className="w-full"
              >
                <AlertTriangle size={16} className="mr-2" />
                Test Emergency Alert
              </Button>
            </div>
          </div>
        </Card>

        {/* Contact List */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Phone size={20} />
            Emergency Contacts ({contacts.length})
          </h2>
          
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <Phone size={48} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No emergency contacts added yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add contacts who should be notified during emergencies
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {contacts.map((contact, idx) => (
                  <motion.div
                    key={contact.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Phone size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContact(contact.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground">
              <strong>How it works:</strong> When AI detects emergency keywords or distress signals during a call, 
              an automatic SMS with your location and emergency type will be sent to all contacts listed above.
            </p>
          </div>
        </Card>
      </div>

      {isMonitoring && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6"
        >
          <Card className="p-4 bg-primary text-primary-foreground shadow-lg">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Bell size={20} />
              </motion.div>
              <div>
                <p className="font-semibold">Monitoring Active</p>
                <p className="text-xs opacity-90">AI is listening for emergencies</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}