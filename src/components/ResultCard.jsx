
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SecurityIndicator from "./SecurityIndicator";

const ResultCard = ({ result }) => {
  return (
    <Card className="w-full max-w-3xl card-gradient">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">URL Analysis Result</CardTitle>
          <p className="text-sm text-muted-foreground mt-1 break-all max-w-[85%]">
            {result.url}
          </p>
        </div>
        <SecurityIndicator status={result.status} />
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-lg mb-2">Risk Score</h3>
          <div className="relative w-full h-4 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                result.score < 30 
                  ? "bg-safe" 
                  : result.score < 70 
                    ? "bg-warning" 
                    : "bg-danger"
              }`}
              style={{ width: `${result.score}%` }}
            />
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Low Risk</span>
            <span>High Risk</span>
          </div>
        </div>

        {result.riskFactors.length > 0 && (
          <div>
            <h3 className="font-medium text-lg mb-2">
              {result.status === "safe" ? "Analysis Notes" : "Risk Factors"}
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {result.riskFactors.map((factor, index) => (
                <li key={index} className="text-sm">{factor}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultCard;
