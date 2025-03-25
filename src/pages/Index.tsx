
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  RefreshCw, 
  Database, 
  Search, 
  FileQuestion 
} from "lucide-react";
import ResumeUpload from "@/components/ResumeUpload";
import ResumeProcessor from "@/components/ResumeProcessor";
import IndexChecker from "@/components/IndexChecker";
import ResumeMatcher from "@/components/ResumeMatcher";
import QuestionGenerator from "@/components/QuestionGenerator";
import AnimatedTransition from "@/components/AnimatedTransition";

const Index = () => {
  const [activeTab, setActiveTab] = useState("upload");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Resume Matching System
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload resumes, process them, and find the perfect match for your job descriptions
          </p>
        </div>

        <div className="mb-8">
          <IndexChecker className="max-w-3xl mx-auto" />
        </div>

        <Tabs 
          defaultValue="upload" 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-5 w-full max-w-3xl">
              <TabsTrigger value="upload" className="flex items-center gap-1.5">
                <Upload size={16} />
                <span className="hidden sm:inline">Upload</span>
              </TabsTrigger>
              <TabsTrigger value="process" className="flex items-center gap-1.5">
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Process</span>
              </TabsTrigger>
              <TabsTrigger value="match" className="flex items-center gap-1.5">
                <Search size={16} />
                <span className="hidden sm:inline">Match</span>
              </TabsTrigger>
              <TabsTrigger value="questions" className="flex items-center gap-1.5">
                <FileQuestion size={16} />
                <span className="hidden sm:inline">Questions</span>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
