
import { useState, useEffect } from "react";
import { Database, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface IndexCheckerProps {
  onRefresh?: () => void;
  className?: string;
}

const IndexChecker = ({ onRefresh, className }: IndexCheckerProps) => {
  // In a real app, this would come from an API call
  const [isIndexEmpty, setIsIndexEmpty] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    checkIndex();
  }, []);

  const checkIndex = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, let's randomly set the index status
    // In a real app, this would come from the backend
    setIsIndexEmpty(Math.random() > 0.7);
    setLastChecked(new Date());
    setIsLoading(false);

    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-lg border p-4 transition-all duration-300",
        isIndexEmpty === false ? "border-success/30" : "border-gray-200",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "p-2 rounded-full",
            isIndexEmpty === false ? "bg-success/10 text-success" : 
            isIndexEmpty === true ? "bg-amber-50 text-amber-500" : 
            "bg-gray-100 text-gray-400"
          )}>
            {isIndexEmpty === true ? (
              <AlertTriangle size={20} />
            ) : (
              <Database size={20} />
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium">Vector Index Status</h3>
            <p className={cn(
              "text-xs mt-0.5",
              isLoading ? "text-muted-foreground" : 
              isIndexEmpty === false ? "text-success" : 
              isIndexEmpty === true ? "text-amber-500" : 
              "text-muted-foreground"
            )}>
              {isLoading ? (
                "Checking status..."
              ) : isIndexEmpty === false ? (
                "Index is populated and ready"
              ) : isIndexEmpty === true ? (
                "Index is empty - process resumes to populate"
              ) : (
                "Unknown status"
              )}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={checkIndex}
          disabled={isLoading}
          className="h-8 w-8 p-0 rounded-full"
        >
          <span className="sr-only">Refresh</span>
          <svg 
            width="15" 
            height="15" 
            viewBox="0 0 15 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-4 w-4", isLoading && "animate-spin")}
          >
            <path
              d="M1.84998 7.49998C1.84998 4.66458 4.05979 2.29998 6.89998 2.29998C9.18122 2.29998 11.05 3.67672 11.7637 5.61245C11.8899 5.94879 12.253 6.10205 12.5894 5.97588C12.9257 5.8497 13.079 5.48657 12.9528 5.15023C12.0252 2.71021 9.67524 0.899976 6.89998 0.899976C3.33227 0.899976 0.449982 3.96604 0.449982 7.49998C0.449982 11.0339 3.33227 14.1 6.89998 14.1C9.11549 14.1 11.0605 12.9531 12.2188 11.2054C12.4216 10.9159 12.3443 10.5258 12.0548 10.323C11.7653 10.1202 11.3752 10.1975 11.1724 10.487C10.2089 11.8898 8.6545 12.7 6.89998 12.7C4.05979 12.7 1.84998 10.3354 1.84998 7.49998ZM13.4384 5.12603C13.6433 4.96028 13.6433 4.69371 13.4384 4.52796L11.2984 2.81196C11.0935 2.6462 10.7769 2.6462 10.572 2.81196C10.3672 2.97771 10.3672 3.24428 10.572 3.41003L12.067 4.6L9.59198 4.6C9.31584 4.6 9.09198 4.82386 9.09198 5.1C9.09198 5.37614 9.31584 5.6 9.59198 5.6L12.067 5.6L10.572 6.78996C10.3672 6.95572 10.3672 7.22228 10.572 7.38804C10.7769 7.55379 11.0935 7.55379 11.2984 7.38804L13.4384 5.67204C13.4905 5.63026 13.5313 5.57551 13.5593 5.51411C13.5873 5.4527 13.6008 5.38597 13.5984 5.31899C13.5961 5.25201 13.5781 5.186 13.5458 5.12673C13.5134 5.06745 13.4679 5.01563 13.4124 4.97724C13.4207 5.02422 13.4348 5.0693 13.4539 5.10972C13.473 5.15015 13.4969 5.1853 13.5243 5.21278C13.5516 5.24026 13.5819 5.25952 13.6137 5.26948C13.6454 5.27944 13.6781 5.27995 13.7101 5.27097C13.6728 5.2702 13.6368 5.28306 13.6081 5.30725C13.5793 5.33144 13.5594 5.36561 13.5509 5.40351C13.5425 5.44141 13.546 5.48102 13.5611 5.51644C13.5761 5.55186 13.6018 5.58121 13.6348 5.59982C13.5926 5.5626 13.5599 5.51291 13.5395 5.45649C13.5191 5.40008 13.5116 5.33878 13.5179 5.27842C13.5241 5.21806 13.5438 5.16077 13.5753 5.11255C13.6068 5.06432 13.6488 5.02681 13.6973 5.00346C13.629 5.04169 13.5757 5.09862 13.5443 5.16582C13.5129 5.23303 13.5048 5.30749 13.5211 5.37873C13.5374 5.44997 13.5775 5.51429 13.6353 5.56234C13.693 5.61039 13.7657 5.64004 13.8429 5.64733C13.752 5.60121 13.6841 5.52161 13.6526 5.42515C13.6211 5.32868 13.6284 5.22252 13.6727 5.13121C13.6148 5.20599 13.5845 5.30057 13.5869 5.39789C13.5894 5.49521 13.6244 5.58787 13.6856 5.65962C13.6132 5.56526 13.5949 5.43913 13.6379 5.32498C13.5724 5.44393 13.5733 5.58893 13.6402 5.70721C13.5661 5.56329 13.5661 5.39644 13.6402 5.25252C13.5726 5.42413 13.6172 5.61877 13.7511 5.74302C13.6812 5.65895 13.6427 5.55694 13.6415 5.45098C13.6402 5.34502 13.6762 5.24226 13.7442 5.15678C13.6707 5.31471 13.6707 5.5012 13.7442 5.65913C13.6956 5.53823 13.6956 5.40576 13.7442 5.28486C13.7018 5.47755 13.7595 5.68079 13.9012 5.82358C13.7992 5.72329 13.7431 5.5877 13.7431 5.44539C13.7431 5.30308 13.7992 5.16749 13.9012 5.0672C13.8103 5.24112 13.8103 5.44966 13.9012 5.62358C13.8439 5.52328 13.8439 5.4075 13.9012 5.3072C13.8354 5.4847 13.8705 5.68363 13.9942 5.82726C13.9381 5.76554 13.9069 5.69113 13.9049 5.61415C13.9029 5.53717 13.9302 5.46155 13.9832 5.3975C13.9132 5.50602 13.9132 5.64476 13.9832 5.75328C13.9311 5.66649 13.9311 5.56429 13.9832 5.4775C13.9228 5.62381 13.9713 5.79259 14.1058 5.89264C14.0307 5.82229 13.9871 5.72956 13.9834 5.63147C13.9798 5.53337 14.0162 5.43743 14.0859 5.36174C14.0194 5.45959 14.0194 5.5804 14.0859 5.67825C14.0324 5.602 14.0324 5.508 14.0859 5.43174C14.4384 5.12603 14.4384 5.12603 14.4384 5.12603C14.4346 5.12825 14.4308 5.13048 14.4269 5.13272C14.4111 5.11284 14.3809 5.06924 14.3524 5.02471C14.3111 4.96006 14.2687 4.89445 14.2687 4.89445C14.2784 4.90861 14.2882 4.92277 14.2979 4.93693C14.2788 4.90977 14.2541 4.85988 14.2295 4.81002C14.1928 4.73752 14.1562 4.66508 14.1562 4.66508C14.1676 4.68429 14.179 4.7035 14.1904 4.72271C14.1599 4.66988 14.1461 4.6584 14.1461 4.6584C14.1461 4.6584 14.1599 4.66988 14.1904 4.72271C14.1799 4.70528 14.1674 4.6841 14.1562 4.66508C14.1562 4.66508 14.1928 4.73752 14.2295 4.81002C14.2541 4.85988 14.2788 4.90977 14.2979 4.93693C14.2882 4.92277 14.2784 4.90861 14.2687 4.89445C14.2687 4.89445 14.3111 4.96006 14.3524 5.02471C14.3809 5.06924 14.4111 5.11284 14.4269 5.13272C14.4202 5.12765 14.4134 5.12258 14.4067 5.11752C14.4172 5.12036 14.4276 5.1232 14.4384 5.12603Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
      
      {lastChecked && !isLoading && (
        <p className="text-xs text-muted-foreground mt-3">
          Last checked: {lastChecked.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default IndexChecker;
