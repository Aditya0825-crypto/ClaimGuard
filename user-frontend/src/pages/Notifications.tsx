import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertCircle, FileText, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Claim Approved",
      message: "Your claim CLM-2024-002 for Medical Bills has been approved.",
      time: "2 hours ago",
      read: false,
      icon: CheckCircle,
    },
    {
      id: 2,
      type: "warning",
      title: "Additional Documents Required",
      message: "We need more information for claim CLM-2024-003. Please upload the requested documents.",
      time: "5 hours ago",
      read: false,
      icon: AlertCircle,
    },
    {
      id: 3,
      type: "info",
      title: "Claim Under Review",
      message: "Your claim CLM-2024-001 is now under review by our team.",
      time: "1 day ago",
      read: false,
      icon: FileText,
    },
    {
      id: 4,
      type: "info",
      title: "Claim Received",
      message: "We've received your claim submission CLM-2024-001 for Vehicle Accident.",
      time: "2 days ago",
      read: true,
      icon: Clock,
    },
  ];

  const getNotificationStyle = (type: string) => {
    const styles = {
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      info: "bg-primary/10 text-primary",
    };
    return styles[type as keyof typeof styles] || styles.info;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
              <p className="text-muted-foreground">Stay updated on your claim status</p>
            </div>
            <Button variant="outline" size="sm">
              Mark all as read
            </Button>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-border shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer ${
                  !notification.read ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-lg ${getNotificationStyle(notification.type)} flex items-center justify-center flex-shrink-0`}>
                      <notification.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-foreground">{notification.title}</h3>
                        {!notification.read && (
                          <Badge variant="default" className="bg-primary">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {notifications.length === 0 && (
            <Card className="border-border">
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
