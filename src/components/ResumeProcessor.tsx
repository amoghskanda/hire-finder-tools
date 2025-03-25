import { useState } from "react";
import { toast } from "sonner";
import { FileText, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Resume } from "@/lib/types";
import { cn } from "@/lib/utils";

const ResumeProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // This would come from an API in a real application
  const [resumes, setResumes] = useState<Resume[]>([
    { id: "1", filename: "john_doe_resume.pdf", uploadDate: new Date(2023, 3, 15), processed: false },
    { id: "2", filename: "jane_smith_resume.docx", uploadDate: new Date(2023, 4, 10), processed: false },
    { id: "3", filename: "alex_johnson_cv.pdf", uploadDate: new Date(2023, 4, 22), processed: false },
  ]);

  const unprocessedCount = resumes.filter(r => !r.processed).length;

  const processResumes = async () => {
    if (unprocessedCount === 0) {
      toast.info("No resumes to process");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / unprocessedCount / 10);
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);

    // Simulate processing time (would be a real API call)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    clearInterval(interval);
    setProgress(100);
    
    // Update resumes to processed
    setResumes(prev => 
      prev.map(resume => ({
        ...resume,
        processed: true
      }))
    );

    toast.success(`Successfully processed ${unprocessedCount} resume${unprocessedCount > 1 ? 's' : ''}`);
    
    setTimeout(() => {
      setIsProcessing(false);
      setProgress(0);
    }, 500);
  };

  return (
    <div className="flex flex-col space-y-6 w-full max-w-3xl mx-auto animate-fade-in">
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Resume Processing</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Process resumes to extract data and create searchable vectors
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
              {unprocessedCount} unprocessed
            </span>
            <Button
              variant="default"
              size="sm"
              disabled={isProcessing || unprocessedCount === 0}
              onClick={processResumes}
              className="gap-1.5"
            >
              {isProcessing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Process All
            </Button>
          </div>
        </div>

        {isProcessing && (
          <div className="mb-6 animate-fade-in">
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Processing...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {resumes.map((resume) => (
            <div 
              key={resume.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border transition-all",
                resume.processed 
                  ? "bg-success/5 border-success/20" 
                  : "bg-white border-gray-100"
              )}
            >
              <div className="flex items-center space-x-3">
                <FileText 
                  size={18} 
                  className={resume.processed ? "text-success" : "text-primary"} 
                />
                <div>
                  <span className="text-sm font-medium">{resume.filename}</span>
                  <p className="text-xs text-muted-foreground">
                    Uploaded {resume.uploadDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                {resume.processed ? (
                  <span className="text-xs font-medium flex items-center text-success">
                    <Check size={14} className="mr-1" />
                    Processed
                  </span>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}

          {resumes.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No resumes available for processing
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeProcessor;
