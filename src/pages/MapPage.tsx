import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Flame, Heart, RefreshCw, Navigation, Hospital, Ambulance } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Incident {
  id: number;
  type: "accident" | "fire" | "health";
  lat: number;
  lng: number;
  title: string;
  description: string;
  time: string;
}

interface NearbyService {
  id: number;
  name: string;
  distance: string;
  eta: string;
  type: "hospital" | "ambulance";
}

const incidents: Incident[] = [
  { id: 1, type: "accident", lat: 28.6139, lng: 77.2090, title: "Road Accident", description: "Multi-vehicle collision", time: "5 min ago" },
  { id: 2, type: "fire", lat: 28.5355, lng: 77.3910, title: "Fire Emergency", description: "Building fire reported", time: "12 min ago" },
  { id: 3, type: "health", lat: 28.7041, lng: 77.1025, title: "Medical Emergency", description: "Cardiac arrest patient", time: "8 min ago" },
];

const nearbyServices: NearbyService[] = [
  { id: 1, name: "City General Hospital", distance: "2.3 km", eta: "5 mins", type: "hospital" },
  { id: 2, name: "Emergency Medical Center", distance: "3.8 km", eta: "8 mins", type: "hospital" },
  { id: 3, name: "Ambulance Unit A-12", distance: "1.5 km", eta: "3 mins", type: "ambulance" },
  { id: 4, name: "Ambulance Unit B-08", distance: "2.1 km", eta: "4 mins", type: "ambulance" },
];

export default function MapPage() {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const getIconForType = (type: string) => {
    switch (type) {
      case "accident":
        return <AlertTriangle className="text-emergency-red" size={24} />;
      case "fire":
        return <Flame className="text-fire-orange" size={24} />;
      case "health":
        return <Heart className="text-health-green" size={24} />;
      default:
        return <MapPin size={24} />;
    }
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
          <h1 className="text-3xl font-bold text-foreground">Live Emergency Map</h1>
          <p className="text-muted-foreground mt-1">Real-time incident tracking and monitoring</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Navigation size={16} className="mr-2" />
            My Location
          </Button>
          <Button variant="default" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Map Display */}
        <Card className="lg:col-span-2 p-6 relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
          </div>
          
          {/* Map Markers */}
          <div className="relative h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-sm bg-background/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                📍 Interactive map with incident markers
              </p>
            </div>
            
            {/* Incident Markers */}
            {incidents.map((incident, idx) => (
              <motion.div
                key={incident.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="absolute cursor-pointer"
                style={{
                  left: `${20 + idx * 25}%`,
                  top: `${30 + idx * 15}%`,
                }}
                onClick={() => setSelectedIncident(incident)}
                whileHover={{ scale: 1.2 }}
              >
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-2 bg-primary/20 rounded-full"
                  />
                  <div className="relative bg-card border-2 border-primary rounded-full p-2 shadow-lg">
                    {getIconForType(incident.type)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Incident List */}
        <Card className="p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Active Incidents</h2>
          <div className="space-y-3">
            {incidents.map((incident) => (
              <motion.div
                key={incident.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedIncident(incident)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedIncident?.id === incident.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getIconForType(incident.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{incident.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{incident.description}</p>
                    <p className="text-xs text-primary mt-2">{incident.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Selected Incident Details with Nearby Services */}
      {selectedIncident && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 left-[320px] right-6 z-30 space-y-4"
        >
          {/* Incident Details */}
          <Card className="p-6 shadow-2xl border-primary">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {getIconForType(selectedIncident.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedIncident.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{selectedIncident.description}</p>
                  <p className="text-sm text-primary mt-2">Location: {selectedIncident.lat.toFixed(4)}, {selectedIncident.lng.toFixed(4)}</p>
                </div>
              </div>
              <Button size="sm" onClick={() => setSelectedIncident(null)}>
                Close
              </Button>
            </div>
          </Card>

          {/* Nearby Services */}
          <Card className="p-6 shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">Nearby Emergency Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {nearbyServices.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:border-primary/50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    service.type === "hospital" 
                      ? "bg-health-green/10 text-health-green" 
                      : "bg-emergency-red/10 text-emergency-red"
                  }`}>
                    {service.type === "hospital" ? (
                      <Hospital size={20} />
                    ) : (
                      <Ambulance size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.distance} away</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{service.eta}</p>
                    <p className="text-xs text-muted-foreground">ETA</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
