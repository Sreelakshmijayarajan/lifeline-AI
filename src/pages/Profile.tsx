import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Droplet, Heart, Camera, Save, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  name: string;
  phone: string;
  bloodGroup: string;
  healthIssues: string;
  photoUrl: string;
}

export default function Profile() {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : {
      name: "",
      phone: "",
      bloodGroup: "",
      healthIssues: "",
      photoUrl: ""
    };
  });

  const handleSave = () => {
    if (!profileData.name || !profileData.phone) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name and phone number",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(profileData));
    toast({
      title: "Profile saved",
      description: "Your emergency information has been updated"
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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
          <h1 className="text-3xl font-bold text-foreground">Emergency Profile</h1>
          <p className="text-muted-foreground mt-1">Store your critical information for emergency situations</p>
        </div>
      </div>

      {/* Alert Banner */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3"
      >
        <AlertCircle className="text-primary mt-0.5" size={20} />
        <div>
          <p className="text-sm font-medium text-foreground">This information will be shared with emergency responders</p>
          <p className="text-xs text-muted-foreground mt-1">Keep your details up-to-date for faster emergency assistance</p>
        </div>
      </motion.div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Photo Upload */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Camera size={20} className="text-primary" />
              Profile Photo
            </h2>
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {profileData.photoUrl ? (
                  <img src={profileData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-muted-foreground" />
                )}
              </div>
              <Label htmlFor="photo" className="cursor-pointer">
                <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Upload Photo
                </div>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </Label>
            </div>
          </Card>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User size={20} className="text-primary" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative mt-1">
                  <Phone size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Medical Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 h-full">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Droplet size={20} className="text-emergency-red" />
              Blood Group
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {bloodGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setProfileData({ ...profileData, bloodGroup: group })}
                  className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                    profileData.bloodGroup === group
                      ? "border-emergency-red bg-emergency-red/10 text-emergency-red"
                      : "border-border hover:border-emergency-red/50"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 h-full">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Heart size={20} className="text-health-green" />
              Health Conditions
            </h2>
            <Textarea
              value={profileData.healthIssues}
              onChange={(e) => setProfileData({ ...profileData, healthIssues: e.target.value })}
              placeholder="List any medical conditions, allergies, or medications..."
              className="min-h-[120px] resize-none"
            />
          </Card>
        </motion.div>
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save size={18} />
          Save Emergency Profile
        </Button>
      </motion.div>
    </motion.div>
  );
}
