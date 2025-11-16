import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, MapPin, Heart, Eye, Lock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Privacy() {
  const [shareLocation, setShareLocation] = useState(true);
  const [shareHealth, setShareHealth] = useState(true);
  const [autoAlert, setAutoAlert] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Privacy & Security</h1>
        <p className="text-muted-foreground mt-1">
          Manage your data sharing preferences and security settings
        </p>
      </div>

      {/* Privacy Status Banner */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Card className="p-6 bg-primary/5 border-primary">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="text-primary" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Your Privacy is Protected</h3>
              <p className="text-sm text-muted-foreground mt-1">
                All data is encrypted and only shared with emergency services when necessary
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Privacy Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Sharing */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Location Sharing</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Share your real-time location with emergency services
                  </p>
                </div>
              </div>
              <Switch checked={shareLocation} onCheckedChange={setShareLocation} />
            </div>
            {shareLocation && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="p-3 bg-muted rounded-lg"
              >
                <p className="text-xs text-muted-foreground">
                  ✓ GPS location enabled<br />
                  ✓ Shared only during emergencies<br />
                  ✓ Automatic location updates every 30 seconds
                </p>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Health Data Sharing */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-health-green/10 rounded-lg">
                  <Heart className="text-health-green" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Health Data Sharing</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Share medical information with first responders
                  </p>
                </div>
              </div>
              <Switch checked={shareHealth} onCheckedChange={setShareHealth} />
            </div>
            {shareHealth && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="p-3 bg-muted rounded-lg"
              >
                <p className="text-xs text-muted-foreground">
                  ✓ Blood type information<br />
                  ✓ Known allergies<br />
                  ✓ Emergency contacts
                </p>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Auto Alert */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emergency-red/10 rounded-lg">
                  <AlertCircle className="text-emergency-red" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Automatic Alerts</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    AI detects incidents and sends automatic alerts
                  </p>
                </div>
              </div>
              <Switch checked={autoAlert} onCheckedChange={setAutoAlert} />
            </div>
          </Card>
        </motion.div>

        {/* Anonymous Mode */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Eye className="text-foreground" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Anonymous Mode</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Hide personal details from public incident reports
                  </p>
                </div>
              </div>
              <Switch checked={anonymousMode} onCheckedChange={setAnonymousMode} />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Data Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Lock,
            title: "End-to-End Encryption",
            description: "All data transmitted is encrypted using industry-standard protocols",
          },
          {
            icon: Shield,
            title: "Privacy Compliance",
            description: "Fully compliant with GDPR, HIPAA, and local privacy regulations",
          },
          {
            icon: Eye,
            title: "Data Access Control",
            description: "You control who sees your data and for how long",
          },
        ].map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
          >
            <Card className="p-6 text-center">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-3">
                <item.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline">Download My Data</Button>
        <Button variant="outline">Delete Account</Button>
        <Button>Save Changes</Button>
      </div>
    </motion.div>
  );
}
