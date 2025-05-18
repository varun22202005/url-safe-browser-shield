
import React from "react";
import { Shield, ShieldAlert, ShieldOff } from "lucide-react";

const SecurityIndicator = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "safe":
        return {
          icon: Shield,
          text: "Safe",
          bootstrapClass: "bg-success text-white",
          alertType: "success"
        };
      case "warning":
        return {
          icon: ShieldAlert,
          text: "Suspicious",
          bootstrapClass: "bg-warning text-dark",
          alertType: "warning"
        };
      case "danger":
        return {
          icon: ShieldOff,
          text: "Dangerous",
          bootstrapClass: "bg-danger text-white",
          alertType: "danger"
        };
      default:
        return {
          icon: Shield,
          text: "Unknown",
          bootstrapClass: "bg-secondary text-white",
          alertType: "secondary"
        };
    }
  };

  const { icon: Icon, text, bootstrapClass } = getStatusConfig();

  return (
    <div className={`d-flex align-items-center ${className}`}>
      <div className={`d-flex align-items-center justify-content-center rounded px-3 py-1 ${bootstrapClass}`}>
        <Icon className="me-2" style={{ width: "16px", height: "16px" }} />
        <span className="fw-medium">{text}</span>
      </div>
    </div>
  );
};

export default SecurityIndicator;
