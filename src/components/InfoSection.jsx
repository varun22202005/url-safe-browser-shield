
import React from "react";

const InfoSection = () => {
  return (
    <div className="w-100" style={{ maxWidth: "800px" }}>
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header">
              <h5 className="card-title mb-0">What is URL Phishing?</h5>
            </div>
            <div className="card-body">
              <p className="card-text text-muted">
                Phishing URLs are deceptive links designed to mimic legitimate websites
                in order to steal personal information, credentials, or financial data.
                They often use tactics like misspelled domains, suspicious subdomains,
                or misleading paths to trick users.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header">
              <h5 className="card-title mb-0">How to Stay Safe</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item text-muted">
                  Always check the URL before entering sensitive information
                </li>
                <li className="list-group-item text-muted">
                  Look for secure connection (HTTPS) and valid certificates
                </li>
                <li className="list-group-item text-muted">
                  Be suspicious of URLs in unsolicited emails or messages
                </li>
                <li className="list-group-item text-muted">
                  Use this tool to scan any suspicious links before clicking
                </li>
                <li className="list-group-item text-muted">
                  Keep your browser and security software updated
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
