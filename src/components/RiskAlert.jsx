
import React from "react";
import { AlertTriangle, ShieldOff } from "lucide-react";

const RiskAlert = ({ risk, show }) => {
  if (!show) return null;
  
  const getAlertType = () => {
    if (risk === "warning") return "warning";
    if (risk === "danger") return "danger";
    return "secondary";
  };
  
  const alertType = getAlertType();
  const alertTitle = risk === "danger" ? "High Risk URL Detected!" : "Suspicious URL Detected";
  const alertIcon = risk === "danger" ? <ShieldOff className="me-2" /> : <AlertTriangle className="me-2" />;
  
  return (
    <div className={`alert alert-${alertType} d-flex align-items-center alert-dismissible fade show`} role="alert">
      {alertIcon}
      <div>
        <strong>{alertTitle}</strong> - This URL may contain phishing or malicious content. Be extremely careful!
      </div>
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default RiskAlert;
