
import React, { useState } from "react";
import { Shield } from "lucide-react";
import { toast } from "sonner";
import URLForm from "@/components/URLForm";
import ResultCard from "@/components/ResultCard";
import InfoSection from "@/components/InfoSection";
import RiskAlert from "@/components/RiskAlert";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showRiskAlert, setShowRiskAlert] = useState(false);

  // This is a mock function to simulate URL analysis
  // In a real implementation, this would call a backend API
  const analyzeURL = (url) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Mock detection logic - this would be replaced with actual backend analysis
        const isHttps = url.startsWith("https://");
        const hasCommonPhishingWords = /\b(verify|account|login|secure|bank|update|alert|confirm)\b/i.test(url);
        const hasSuspiciousTopLevelDomain = /\.(xyz|tk|ml|ga|cf|gq|top)$/i.test(url);
        const hasManySubdomains = url.split(".").length > 3;
        const hasLongUrlString = url.length > 100;
        const hasIPAddress = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url);
        const hasUncommonPort = /:[0-9]{2,5}/.test(url);
        const hasUnauthorizedParameter = /(password|token|auth|key)=/i.test(url);
        
        // Calculate risk score (0-100)
        let riskScore = 0;
        if (!isHttps) riskScore += 25;
        if (hasCommonPhishingWords) riskScore += 15;
        if (hasSuspiciousTopLevelDomain) riskScore += 20;
        if (hasManySubdomains) riskScore += 10;
        if (hasLongUrlString) riskScore += 10;
        if (hasIPAddress) riskScore += 30;
        if (hasUncommonPort) riskScore += 20;
        if (hasUnauthorizedParameter) riskScore += 40;
        
        // Cap at 100
        riskScore = Math.min(riskScore, 100);
        
        // Determine status based on risk score
        let status = "unknown";
        if (riskScore < 30) status = "safe";
        else if (riskScore < 70) status = "warning";
        else status = "danger";
        
        // Generate risk factors
        const riskFactors = [];
        
        if (status === "safe") {
          riskFactors.push("No major security concerns detected");
          if (isHttps) {
            riskFactors.push("URL uses secure HTTPS connection");
          } else {
            riskFactors.push("URL uses HTTP instead of HTTPS (less secure)");
          }
        } else {
          if (!isHttps) riskFactors.push("URL uses insecure HTTP connection");
          if (hasCommonPhishingWords) riskFactors.push("Contains common phishing keywords");
          if (hasSuspiciousTopLevelDomain) riskFactors.push("Uses suspicious top-level domain");
          if (hasManySubdomains) riskFactors.push("Contains excessive number of subdomains");
          if (hasLongUrlString) riskFactors.push("Unusually long URL (may hide malicious content)");
          if (hasIPAddress) riskFactors.push("Uses IP address instead of domain name");
          if (hasUncommonPort) riskFactors.push("Uses uncommon network port");
          if (hasUnauthorizedParameter) riskFactors.push("Contains sensitive parameters in URL (security risk)");
        }
        
        const result = {
          url,
          status,
          score: riskScore,
          riskFactors,
        };
        
        setAnalysisResult(result);
        setIsLoading(false);
        
        // Show notifications for risky URLs
        if (status === "warning" || status === "danger") {
          setShowRiskAlert(true);
          
          // Also show toast notification
          const toastMessage = status === "danger" 
            ? "High Risk URL detected! Be extremely cautious."
            : "Suspicious URL detected. Proceed with caution.";
            
          toast.error(toastMessage, {
            description: "This URL may be attempting to steal your information.",
            duration: 6000,
          });
        }
      } catch (error) {
        console.error("Error analyzing URL:", error);
        toast.error("Analysis Error", {
          description: "Failed to analyze the URL. Please try again.",
        });
        setIsLoading(false);
      }
    }, 1500); // Simulate network delay
  };

  const handleSubmit = (url) => {
    setShowRiskAlert(false); // Reset alert state
    analyzeURL(url);
  };

  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <div className="d-flex align-items-center justify-content-center mb-2">
          <Shield className="me-2" style={{ width: "40px", height: "40px", color: "#0d6efd" }} />
          <h1 className="display-4 fw-bold">URL Shield</h1>
        </div>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Protect yourself from phishing attacks. Analyze any suspicious URL before clicking
          to detect potential security threats and stay safe online.
        </p>
      </header>

      <div className="d-flex flex-column align-items-center gap-4">
        <RiskAlert risk={analysisResult?.status} show={showRiskAlert} />
        
        <URLForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        {analysisResult && <ResultCard result={analysisResult} />}
        
        {!analysisResult && (
          <div className="w-100 bg-light border border-2 border-dashed rounded p-4 text-center text-muted" style={{ maxWidth: "800px", height: "100px" }}>
            Enter a URL above to analyze it for phishing threats
          </div>
        )}
        
        <InfoSection />
      </div>

      <footer className="text-center text-muted mt-5 pt-4 border-top">
        <small>URL Shield - Phishing Detection Tool</small>
        <p className="mt-1"><small>This is a demo application. For actual security protection, use established security software.</small></p>
      </footer>
    </div>
  );
};

export default Index;
