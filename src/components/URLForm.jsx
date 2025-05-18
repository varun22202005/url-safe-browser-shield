
import React, { useState } from "react";
import { Shield } from "lucide-react";

const URLForm = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "800px" }}>
      <div className="d-flex flex-column flex-md-row gap-2">
        <input
          type="text"
          placeholder="Enter URL to check (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="form-control form-control-lg flex-grow-1"
        />
        <button 
          type="submit" 
          className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? (
            <span className="d-flex align-items-center">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Scanning...
            </span>
          ) : (
            <span className="d-flex align-items-center">
              <Shield className="me-2" style={{ width: "20px", height: "20px" }} />
              Analyze URL
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default URLForm;
