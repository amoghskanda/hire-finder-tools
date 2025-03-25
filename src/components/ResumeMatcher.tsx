
import { useState } from "react";
import { toast } from "sonner";
import { Search, FileText, ChevronRight, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeMatch } from "@/lib/types";
import { cn } from "@/lib/utils";

const ResumeMatcher = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ResumeMatch[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const findMatches = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    setIsSearching(true);
    setResults([]);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock results - in a real app, this would come from an API
    const mockResults: ResumeMatch[] = [
      {
        resumeId: "1",
        filename: "john_doe_resume.pdf",
        score: 0.87,
        highlights: ["5 years React experience", "Machine learning background", "Team leadership"]
      },
      {
        resumeId: "2",
        filename: "jane_smith_resume.docx",
        score: 0.75,
        highlights: ["Frontend development", "UI/UX expertise", "Project management"]
      },
      {
        resumeId: "3",
        filename: "alex_johnson_cv.pdf",
        score: 0.68,
        highlights: ["JavaScript proficiency", "Backend development", "Database design"]
      }
    ];

    setResults(mockResults);
    setIsSearching(false);
    setHasSearched(true);
    
    toast.success("Found potential matches for the job description");
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600";
    if (score >= 0.7) return "text-amber-600";
    return "text-gray-600";
  };

  const getScoreWidth = (score: number) => {
    return `${Math.round(score * 100)}%`;
  };

  return (
    <div className="flex flex-col space-y-6 w-full max-w-3xl mx-auto animate-fade-in">
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Find Matching Resumes</h3>
        
        <div className="mb-6">
          <label htmlFor="jobDescription" className="block text-sm font-medium mb-2">
            Job Description
          </label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="premium-input w-full resize-none"
          />
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={findMatches}
            disabled={isSearching || !jobDescription.trim()}
            className="premium-transition gap-1.5"
          >
            {isSearching ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                Searching...
              </>
            ) : (
              <>
                <Search size={16} />
                Find Matches
              </>
            )}
          </Button>
        </div>
      </div>

      {hasSearched && (
        <div 
          className={cn(
            "glass-card p-6 transition-opacity duration-500",
            results.length === 0 && !isSearching ? "opacity-70" : "opacity-100"
          )}
        >
          <h3 className="text-lg font-semibold mb-4">Results</h3>
          
          {isSearching ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-3 text-sm text-muted-foreground">Searching for matches...</p>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((match) => (
                <div 
                  key={match.resumeId}
                  className="rounded-lg border bg-white/50 backdrop-blur-sm p-4 hover:bg-white/80 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5">
                        <FileText size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{match.filename}</h4>
                        <div className="mt-2 flex items-center">
                          <span className="text-xs mr-2">Match score:</span>
                          <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                match.score >= 0.8 ? "bg-green-500" : 
                                match.score >= 0.7 ? "bg-amber-500" : 
                                "bg-gray-400"
                              )}
                              style={{ width: getScoreWidth(match.score) }}
                            />
                          </div>
                          <span className={cn("text-xs ml-2 font-semibold", getScoreColor(match.score))}>
                            {Math.round(match.score * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                  
                  {match.highlights && match.highlights.length > 0 && (
                    <div className="mt-3 ml-11">
                      <h5 className="text-xs font-medium mb-2 flex items-center">
                        <BarChart2 size={12} className="mr-1.5 text-primary" />
                        Highlights
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {match.highlights.map((highlight, index) => (
                          <span 
                            key={index}
                            className="inline-flex text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/80"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="rounded-full bg-gray-100 p-3 inline-flex">
                <Search size={24} className="text-gray-400" />
              </div>
              <h4 className="mt-4 font-medium">No matches found</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Try refining your job description or process more resumes
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeMatcher;
