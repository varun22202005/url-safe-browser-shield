
import React from "react";
import { cn } from "@/lib/utils";
import { Shield, ShieldAlert, ShieldOff } from "lucide-react";

const SecurityIndicator = ({ 
  status, 
  className 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case "safe":
        return {
          icon: Shield,
          text: "Safe",
          color: "bg-safe text-safe-foreground",
        };
      case "warning":
        return {
          icon: ShieldAlert,
          text: "Suspicious",
          color: "bg-warning text-warning-foreground",
        };
      case "danger":
        return {
          icon: ShieldOff,
          text: "Dangerous",
          color: "bg-danger text-danger-foreground",
        };
      default:
        return {
          icon: Shield,
          text: "Unknown",
          color: "bg-muted text-muted-foreground",
        };
    }
  };

  const { icon: Icon, text, color } = getStatusConfig();

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn(
        "flex items-center justify-center rounded-full px-4 py-1", 
        color
      )}>
        <Icon className="h-4 w-4 mr-2" />
        <span className="font-medium">{text}</span>
      </div>
    </div>
  );
};

export default SecurityIndicator;
