
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InfoSection: React.FC = () => {
  return (
    <div className="w-full max-w-3xl space-y-6">
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="text-xl">What is URL Phishing?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Phishing URLs are deceptive links designed to mimic legitimate websites
            in order to steal personal information, credentials, or financial data.
            They often use tactics like misspelled domains, suspicious subdomains,
            or misleading paths to trick users.
          </p>
        </CardContent>
      </Card>
      
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="text-xl">How to Stay Safe</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm text-muted-foreground">
              Always check the URL before entering sensitive information
            </li>
            <li className="text-sm text-muted-foreground">
              Look for secure connection (HTTPS) and valid certificates
            </li>
            <li className="text-sm text-muted-foreground">
              Be suspicious of URLs in unsolicited emails or messages
            </li>
            <li className="text-sm text-muted-foreground">
              Use this tool to scan any suspicious links before clicking
            </li>
            <li className="text-sm text-muted-foreground">
              Keep your browser and security software updated
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoSection;
