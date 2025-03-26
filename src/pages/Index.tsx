
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  RefreshCw, 
  Database, 
  Search, 
  FileQuestion,
  Building2,
  MessageSquareText
} from "lucide-react";
import ResumeUpload from "@/components/ResumeUpload";
import ResumeProcessor from "@/components/ResumeProcessor";
import IndexChecker from "@/components/IndexChecker";
import ResumeMatcher from "@/components/ResumeMatcher";
import QuestionGenerator from "@/components/QuestionGenerator";
import Feedback from "@/components/Feedback";
import AnimatedTransition from "@/components/AnimatedTransition";

const Index = () => {
  const [activeTab, setActiveTab] = useState("upload");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-light via-white to-cream">
      <div className="max-w-screen-xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center p-2 bg-royal/10 rounded-full mb-4">
            <Building2 className="h-6 w-6 text-royal mr-2" />
            <span className="text-royal font-medium">Talent Acquisition Suite</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
            <span className="text-royal">Resume</span> <span className="text-burgundy">Matching</span> <span className="text-gray-900">System</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload resumes, process them, and find the perfect match for your job descriptions
          </p>
          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-royal via-burgundy to-cream-dark mx-auto rounded-full"></div>
        </div>

        {/* Index Checker Section */}
        <div className="mb-12">
          <IndexChecker className="max-w-3xl mx-auto corporate-panel" />
        </div>

        {/* Tabs Section */}
        <Tabs 
          defaultValue="upload" 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-6 w-full max-w-3xl bg-white shadow-corporate border border-gray-100 p-1.5">
              <TabsTrigger 
                value="upload" 
                className="flex items-center gap-1.5 data-[state=active]:bg-royal data-[state=active]:text-white"
              >
                <Upload size={16} />
                <span className="hidden sm:inline">Upload</span>
              </TabsTrigger>
              <TabsTrigger 
                value="process" 
                className="flex items-center gap-1.5 data-[state=active]:bg-royal data-[state=active]:text-white"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Process</span>
              </TabsTrigger>
              <TabsTrigger 
                value="match" 
                className="flex items-center gap-1.5 data-[state=active]:bg-royal data-[state=active]:text-white"
              >
                <Search size={16} />
                <span className="hidden sm:inline">Match</span>
              </TabsTrigger>
              <TabsTrigger 
                value="questions" 
                className="flex items-center gap-1.5 data-[state=active]:bg-royal data-[state=active]:text-white"
              >
                <FileQuestion size={16} />
                <span className="hidden sm:inline">Questions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="feedback" 
                className="flex items-center gap-1.5 data-[state=active]:bg-royal data-[state=active]:text-white"
              >
                <MessageSquareText size={16} />
                <span className="hidden sm:inline">Feedback</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent 
            value="upload" 
            className={cn(
              "w-full",
              activeTab === "upload" ? "animate-scale-in" : "hidden"
            )}
          >
            <AnimatedTransition show={activeTab === "upload"}>
              <ResumeUpload />
            </AnimatedTransition>
          </TabsContent>

          <TabsContent 
            value="process" 
            className={cn(
              "w-full",
              activeTab === "process" ? "animate-scale-in" : "hidden"
            )}
          >
            <AnimatedTransition show={activeTab === "process"}>
              <ResumeProcessor />
            </AnimatedTransition>
          </TabsContent>

          <TabsContent 
            value="match" 
            className={cn(
              "w-full",
              activeTab === "match" ? "animate-scale-in" : "hidden"
            )}
          >
            <AnimatedTransition show={activeTab === "match"}>
              <ResumeMatcher />
            </AnimatedTransition>
          </TabsContent>

          <TabsContent 
            value="questions" 
            className={cn(
              "w-full",
              activeTab === "questions" ? "animate-scale-in" : "hidden"
            )}
          >
            <AnimatedTransition show={activeTab === "questions"}>
              <QuestionGenerator />
            </AnimatedTransition>
          </TabsContent>
          
          <TabsContent 
            value="feedback" 
            className={cn(
              "w-full",
              activeTab === "feedback" ? "animate-scale-in" : "hidden"
            )}
          >
            <AnimatedTransition show={activeTab === "feedback"}>
              <Feedback />
            </AnimatedTransition>
          </TabsContent>
        </Tabs>
        
        {/* Footer */}
        <div className="mt-24 text-center text-gray-500 text-sm">
          <p>© 2023 Resume Matching System | Talent Acquisition Suite</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
