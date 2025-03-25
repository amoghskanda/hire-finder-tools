
import { useState } from "react";
import { toast } from "sonner";
import { FileQuestion, Copy, Check, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InterviewQuestion, Resume } from "@/lib/types";
import { cn } from "@/lib/utils";
import AnimatedTransition from "./AnimatedTransition";

const QuestionGenerator = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const [savedToFile, setSavedToFile] = useState(false);
  
  // Mock data - in a real app, this would come from an API
  const resumes: Resume[] = [
    { id: "1", filename: "john_doe_resume.pdf", uploadDate: new Date(2023, 3, 15), processed: true },
    { id: "2", filename: "jane_smith_resume.docx", uploadDate: new Date(2023, 4, 10), processed: true },
    { id: "3", filename: "alex_johnson_cv.pdf", uploadDate: new Date(2023, 4, 22), processed: true },
  ];

  const generateQuestions = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    if (!selectedResumeId) {
      toast.error("Please select a resume");
      return;
    }

    setIsGenerating(true);
    setQuestions([]);
    setSavedToFile(false);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock results - in a real app, this would come from an API
    const mockQuestions: InterviewQuestion[] = [
      {
        id: "1",
        question: "Based on your experience with React, can you explain how you've used hooks to manage state in a complex application?",
        context: "Candidate has 5 years of React experience, job requires advanced state management"
      },
      {
        id: "2",
        question: "You mentioned leading a team of developers. Could you describe a challenging project you led and how you ensured its success?",
        context: "Candidate has team leadership experience, job requires project management skills"
      },
      {
        id: "3",
        question: "Your resume indicates experience with machine learning. How have you applied ML techniques to solve real business problems?",
        context: "Candidate has ML background, job mentions data analysis requirements"
      },
      {
        id: "4",
        question: "Can you walk me through your process for optimizing the performance of a web application?",
        context: "Job description emphasizes performance optimization"
      },
      {
        id: "5",
        question: "How do you approach accessibility when developing user interfaces?",
        context: "Job description mentions accessibility requirements"
      }
    ];

    setQuestions(mockQuestions);
    setIsGenerating(false);
    
    toast.success("Successfully generated interview questions");
  };

  const copyToClipboard = (id: string, question: string) => {
    navigator.clipboard.writeText(question).then(() => {
      setCopied({ ...copied, [id]: true });
      
      setTimeout(() => {
        setCopied({ ...copied, [id]: false });
      }, 2000);
    });
  };

  const copyAllToClipboard = () => {
    const allQuestions = questions.map(q => q.question).join("\n\n");
    
    navigator.clipboard.writeText(allQuestions).then(() => {
      toast.success("All questions copied to clipboard");
    });
  };

  const saveQuestionsToFile = async () => {
    try {
      // Create a JSON string from the questions
      const questionsJson = JSON.stringify(questions, null, 2);
      
      // Create a Blob
      const blob = new Blob([questionsJson], { type: "application/json" });
      
      // Try to use the File System Access API if available
      if ('showSaveFilePicker' in window) {
        try {
          const selectedResume = resumes.find(r => r.id === selectedResumeId);
          const resumeName = selectedResume ? selectedResume.filename.split('.')[0] : 'questions';
          const filename = `${resumeName}_questions_${new Date().toISOString().split('T')[0]}.json`;
          
          // @ts-ignore - TypeScript might not recognize this API yet
          const fileHandle = await window.showSaveFilePicker({
            suggestedName: filename,
            types: [{
              description: 'JSON Files',
              accept: { 'application/json': ['.json'] }
            }]
          });
          
          const writable = await fileHandle.createWritable();
          await writable.write(blob);
          await writable.close();
          
          toast.success("Questions saved to file");
          setSavedToFile(true);
        } catch (err) {
          // User might have canceled the file picker
          console.error("Error saving file:", err);
          // Fallback to download if the user cancelled or there was an error
          downloadFile(blob);
        }
      } else {
        // Fallback for browsers that don't support the File System Access API
        downloadFile(blob);
      }
    } catch (error) {
      console.error("Error saving questions to file:", error);
      toast.error("Failed to save questions to file");
    }
  };
  
  const downloadFile = (blob: Blob) => {
    // Create a download link
    const selectedResume = resumes.find(r => r.id === selectedResumeId);
    const resumeName = selectedResume ? selectedResume.filename.split('.')[0] : 'questions';
    const filename = `${resumeName}_questions_${new Date().toISOString().split('T')[0]}.json`;
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    
    toast.success("Questions downloaded as file");
    setSavedToFile(true);
  };

  return (
    <div className="flex flex-col space-y-6 w-full max-w-3xl mx-auto animate-fade-in">
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Generate Interview Questions</h3>
        
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="resumeSelect" className="block text-sm font-medium mb-2">
              Select Resume
            </label>
            <Select value={selectedResumeId} onValueChange={setSelectedResumeId}>
              <SelectTrigger id="resumeSelect" className="premium-input">
                <SelectValue placeholder="Select a resume" />
              </SelectTrigger>
              <SelectContent>
                {resumes.map((resume) => (
                  <SelectItem key={resume.id} value={resume.id}>
                    {resume.filename}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium mb-2">
              Job Description
            </label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={5}
              className="premium-input w-full resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={generateQuestions}
            disabled={isGenerating || !jobDescription.trim() || !selectedResumeId}
            className="premium-transition gap-1.5"
          >
            {isGenerating ? (
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
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Questions
              </>
            )}
          </Button>
        </div>
      </div>

      {(questions.length > 0 || isGenerating) && (
        <AnimatedTransition show={questions.length > 0 || isGenerating} className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Interview Questions</h3>
            {questions.length > 0 && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyAllToClipboard}
                  className="gap-1.5"
                >
                  <Copy size={14} />
                  Copy All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={saveQuestionsToFile}
                  disabled={savedToFile}
                  className={cn("gap-1.5", savedToFile && "text-green-600 border-green-600")}
                >
                  <Download size={14} />
                  {savedToFile ? "Saved" : "Save as File"}
                </Button>
              </div>
            )}
          </div>
          
          {isGenerating ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-3 text-sm text-muted-foreground">Generating questions...</p>
              </div>
            </div>
          ) : questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div 
                  key={question.id}
                  className="rounded-lg border bg-white p-4 shadow-sm"
                >
                  <div className="flex justify-between">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{question.question}</p>
                        
                        {question.context && (
                          <div className="mt-2 flex items-start">
                            <FileQuestion size={12} className="text-muted-foreground mt-0.5 mr-1.5" />
                            <p className="text-xs text-muted-foreground">{question.context}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(question.id, question.question)}
                      className={cn(
                        "ml-2 h-8 w-8 p-0 rounded-full flex-shrink-0",
                        copied[question.id] && "text-green-500"
                      )}
                    >
                      {copied[question.id] ? <Check size={14} /> : <Copy size={14} />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </AnimatedTransition>
      )}
    </div>
  );
};

export default QuestionGenerator;
