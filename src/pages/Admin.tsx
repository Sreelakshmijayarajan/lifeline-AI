import { motion } from "framer-motion";
import { Users, Activity, TrendingUp, Download, UserPlus, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const users = [
  { id: 1, name: "John Smith", role: "Emergency Responder", status: "Active", lastActive: "2 min ago" },
  { id: 2, name: "Sarah Johnson", role: "Dispatcher", status: "Active", lastActive: "5 min ago" },
  { id: 3, name: "Mike Wilson", role: "System Admin", status: "Active", lastActive: "1 hour ago" },
  { id: 4, name: "Emily Brown", role: "Medical Coordinator", status: "Inactive", lastActive: "2 days ago" },
  { id: 5, name: "David Lee", role: "Fire Chief", status: "Active", lastActive: "10 min ago" },
];

export default function Admin() {
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
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage system users and monitor activity</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <UserPlus size={16} className="mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: Users,
            label: "Total Users",
            value: "1,284",
            change: "+12.5%",
            color: "primary",
          },
          {
            icon: Activity,
            label: "Active Now",
            value: "247",
            change: "+8.2%",
            color: "health-green",
          },
          {
            icon: TrendingUp,
            label: "Incidents Today",
            value: "43",
            change: "-5.3%",
            color: "fire-orange",
          },
          {
            icon: Users,
            label: "Response Teams",
            value: "18",
            change: "+2",
            color: "primary",
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`text-${stat.color}`} size={20} />
                <span className="text-xs text-health-green font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* User Management Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <Button variant="outline" size="sm">Filter</Button>
        </div>
        
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, idx) => (
                <motion.tr
                  key={user.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        user.status === "Active"
                          ? "bg-health-green/10 text-health-green"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        user.status === "Active" ? "bg-health-green" : "bg-muted-foreground"
                      }`} />
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Recent Activity Log */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity Log</h2>
        <div className="space-y-3">
          {[
            { user: "John Smith", action: "Responded to emergency alert", time: "2 minutes ago" },
            { user: "Sarah Johnson", action: "Updated incident status", time: "15 minutes ago" },
            { user: "Mike Wilson", action: "Added new user to system", time: "1 hour ago" },
            { user: "Emily Brown", action: "Generated weekly report", time: "3 hours ago" },
          ].map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div>
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-xs text-muted-foreground">{activity.action}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
