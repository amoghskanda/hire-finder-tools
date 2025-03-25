
import { useState, useRef } from "react";
import { Upload, Check, FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ResumeUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf" || 
             file.type === "application/msword" || 
             file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    
    if (droppedFiles.length === 0) {
      toast.error("Please upload PDF or Word documents only");
      return;
    }
    
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(
        file => file.type === "application/pdf" || 
               file.type === "application/msword" || 
               file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      
      if (selectedFiles.length === 0) {
        toast.error("Please upload PDF or Word documents only");
        return;
      }
      
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`Successfully uploaded ${files.length} resume${files.length > 1 ? 's' : ''}`);
    setFiles([]);
    setIsUploading(false);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col space-y-6 w-full max-w-3xl mx-auto animate-fade-in">
      <div 
        className={cn(
          "border-2 border-dashed rounded-xl p-10 transition-all duration-300 text-center",
          isDragging 
            ? "border-primary bg-primary/5 scale-[1.01]" 
            : "border-gray-200 hover:border-primary/50 hover:bg-gray-50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <Upload size={28} className="premium-transition" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Upload Resumes</h3>
            <p className="text-muted-foreground mt-1">
              Drag and drop PDF or Word documents
            </p>
          </div>
          <div className="mt-4">
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="premium-transition hover:bg-secondary"
            >
              Select Files
            </Button>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="animate-scale-in">
          <h4 className="text-sm font-medium mb-3">Selected Files</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {files.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg bg-white border"
              >
                <div className="flex items-center space-x-3">
                  <FileText size={18} className="text-primary" />
                  <span className="text-sm truncate max-w-[260px]">{file.name}</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <span className="sr-only">Remove</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={handleUpload} 
              disabled={isUploading}
              className="premium-transition"
            >
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>Upload {files.length} file{files.length > 1 ? 's' : ''}</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
