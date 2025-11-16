import { motion } from "framer-motion";
import { Car, Flame, Heart, Cloud, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const historyCategories = [
  {
    id: 1,
    title: "Road Accidents",
    icon: Car,
    color: "emergency.red",
    bgColor: "bg-emergency-red/10",
    borderColor: "border-emergency-red",
    count: 127,
    description: "Track history of traffic collisions and vehicle incidents",
  },
  {
    id: 2,
    title: "Fire Emergencies",
    icon: Flame,
    color: "fire.orange",
    bgColor: "bg-fire-orange/10",
    borderColor: "border-fire-orange",
    count: 43,
    description: "Building fires, forest fires, and explosion incidents",
  },
  {
    id: 3,
    title: "Health Emergencies",
    icon: Heart,
    color: "health.green",
    bgColor: "bg-health-green/10",
    borderColor: "border-health-green",
    count: 89,
    description: "Medical emergencies including cardiac and stroke cases",
  },
  {
    id: 4,
    title: "Natural Disasters",
    icon: Cloud,
    color: "disaster.purple",
    bgColor: "bg-disaster-purple/10",
    borderColor: "border-disaster-purple",
    count: 12,
    description: "Floods, earthquakes, storms and other natural calamities",
  },
];

export default function IncidentHistory() {
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
        <h1 className="text-3xl font-bold text-foreground">Incident History</h1>
        <p className="text-muted-foreground mt-1">
          View and analyze past emergency incidents by category
        </p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Incidents", value: "271", change: "+12%" },
          { label: "This Month", value: "43", change: "+8%" },
          { label: "Avg Response Time", value: "4.2 min", change: "-15%" },
          { label: "Success Rate", value: "96.8%", change: "+2%" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex items-end justify-between mt-2">
                <p className="text-2xl font-bold">{stat.value}</p>
                <span className="text-xs text-health-green font-medium">{stat.change}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {historyCategories.map((category, idx) => (
          <motion.div
            key={category.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className={`p-6 border-2 ${category.borderColor} ${category.bgColor} cursor-pointer transition-all hover:shadow-lg`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`p-4 rounded-xl ${category.bgColor}`}
                  >
                    <category.icon size={32} className={`text-${category.color}`} />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{category.description}</p>
                    <div className="mt-4 flex items-center gap-4">
                      <div>
                        <p className="text-2xl font-bold">{category.count}</p>
                        <p className="text-xs text-muted-foreground">Total Cases</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <ChevronRight size={20} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Timeline Preview */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity Timeline</h2>
        <div className="space-y-4">
          {[
            { time: "2 hours ago", type: "Health", event: "Cardiac emergency resolved" },
            { time: "5 hours ago", type: "Fire", event: "Building fire contained" },
            { time: "1 day ago", type: "Accident", event: "Traffic collision cleared" },
            { time: "2 days ago", type: "Health", event: "Stroke patient transported" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 pb-4 border-b border-border last:border-0"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.event}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                {item.type}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
