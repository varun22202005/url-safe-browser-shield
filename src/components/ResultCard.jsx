
import React from "react";
import SecurityIndicator from "./SecurityIndicator";

const ResultCard = ({ result }) => {
  const getProgressBarVariant = () => {
    if (result.score < 30) return "success";
    if (result.score < 70) return "warning";
    return "danger";
  };

  return (
    <div className="card w-100 shadow" style={{ maxWidth: "800px" }}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">URL Analysis Result</h5>
          <p className="text-muted small mb-0 text-break" style={{ maxWidth: "85%" }}>
            {result.url}
          </p>
        </div>
        <SecurityIndicator status={result.status} />
      </div>
      
      <div className="card-body">
        <div className="mb-4">
          <h6 className="fw-medium mb-2">Risk Score</h6>
          <div className="progress" role="progressbar" aria-valuenow={result.score} aria-valuemin="0" aria-valuemax="100">
            <div 
              className={`progress-bar bg-${getProgressBarVariant()}`}
              style={{ width: `${result.score}%` }}
            ></div>
          </div>
          <div className="d-flex justify-content-between small mt-1">
            <span>Low Risk</span>
            <span>High Risk</span>
          </div>
        </div>

        {result.riskFactors.length > 0 && (
          <div>
            <h6 className="fw-medium mb-2">
              {result.status === "safe" ? "Analysis Notes" : "Risk Factors"}
            </h6>
            <ul className="list-group">
              {result.riskFactors.map((factor, index) => (
                <li key={index} className="list-group-item list-group-item-action list-group-item-light small">
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
