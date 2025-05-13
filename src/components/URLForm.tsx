
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

interface URLFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const URLForm: React.FC<URLFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">
        <Input
          type="text"
          placeholder="Enter URL to check (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border-2 h-12 text-base px-4"
        />
        <Button 
          type="submit" 
          className="h-12 px-6 bg-primary hover:bg-primary/90"
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? (
            <span className="flex items-center">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Scanning...
            </span>
          ) : (
            <span className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Analyze URL
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default URLForm;
