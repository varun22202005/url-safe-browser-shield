
import React, { useState } from "react";
import { Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import URLForm from "@/components/URLForm";
import ResultCard, { PhishingResult } from "@/components/ResultCard";
import InfoSection from "@/components/InfoSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PhishingResult | null>(null);
  const { toast } = useToast();

  // This is a mock function to simulate URL analysis
  // In a real implementation, this would call a backend API
  const analyzeURL = (url: string) => {
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
        
        // Calculate risk score (0-100)
        let riskScore = 0;
        if (!isHttps) riskScore += 25;
        if (hasCommonPhishingWords) riskScore += 15;
        if (hasSuspiciousTopLevelDomain) riskScore += 20;
        if (hasManySubdomains) riskScore += 10;
        if (hasLongUrlString) riskScore += 10;
        if (hasIPAddress) riskScore += 30;
        if (hasUncommonPort) riskScore += 20;
        
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
        }
        
        setAnalysisResult({
          url,
          status: status as "safe" | "warning" | "danger" | "unknown",
          score: riskScore,
          riskFactors,
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error analyzing URL:", error);
        toast({
          title: "Analysis Error",
          description: "Failed to analyze the URL. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 1500); // Simulate network delay
  };

  const handleSubmit = (url: string) => {
    analyzeURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-10">
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Shield className="h-10 w-10 text-primary mr-2" />
            <h1 className="text-3xl font-bold md:text-4xl">URL Shield</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Protect yourself from phishing attacks. Analyze any suspicious URL before clicking
            to detect potential security threats and stay safe online.
          </p>
        </header>

        <div className="flex flex-col items-center space-y-8">
          <URLForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          {analysisResult && <ResultCard result={analysisResult} />}
          
          {!analysisResult && (
            <div className="w-full max-w-3xl h-24 flex items-center justify-center rounded-lg bg-muted/30 border-2 border-dashed animate-pulse-slow">
              <p className="text-muted-foreground">
                Enter a URL above to analyze it for phishing threats
              </p>
            </div>
          )}
          
          <InfoSection />
        </div>

        <footer className="text-center text-sm text-muted-foreground pt-10">
          <p>URL Shield - Phishing Detection Tool</p>
          <p className="mt-1">This is a demo application. For actual security protection, use established security software.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
