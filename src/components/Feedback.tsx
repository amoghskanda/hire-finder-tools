
import { useState } from "react";
import sampleFeedback from "@/data/sampleFeedback.json";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, XCircle, FileText } from "lucide-react";

const Feedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<(typeof sampleFeedback)[0] | null>(null);

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation.toLowerCase()) {
      case "hire":
        return "bg-green-100 text-green-800 border-green-300";
      case "consider":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "reject":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <Star className="absolute top-0 left-0 h-4 w-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Candidate Feedback</h2>
        <div className="text-sm text-gray-500">
          Showing {sampleFeedback.length} feedback results
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[200px] font-semibold">Candidate Name</TableHead>
              <TableHead className="font-semibold">Position</TableHead>
              <TableHead className="font-semibold">Interview Date</TableHead>
              <TableHead className="font-semibold">Rating</TableHead>
              <TableHead className="font-semibold">Recommendation</TableHead>
              <TableHead className="font-semibold text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleFeedback.map((feedback) => (
              <TableRow key={feedback.id} className="hover:bg-cream/30 cursor-pointer transition-colors" onClick={() => setSelectedFeedback(feedback)}>
                <TableCell className="font-medium">{feedback.candidateName}</TableCell>
                <TableCell>{feedback.jobTitle}</TableCell>
                <TableCell>{new Date(feedback.interviewDate).toLocaleDateString()}</TableCell>
                <TableCell>{getStarRating(feedback.overallRating)}</TableCell>
                <TableCell>
                  <Badge className={`font-medium capitalize ${getRecommendationColor(feedback.recommendation)}`}>
                    {feedback.recommendation}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button 
                    className="inline-flex items-center text-royal hover:text-royal-dark transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFeedback(feedback);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Feedback Detail Sheet */}
      <Sheet open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedFeedback && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-bold text-gray-800 flex items-center">
                  {selectedFeedback.candidateName}
                  <Badge className={`ml-3 font-medium capitalize ${getRecommendationColor(selectedFeedback.recommendation)}`}>
                    {selectedFeedback.recommendation}
                  </Badge>
                </SheetTitle>
                <SheetDescription className="text-gray-600">
                  <div className="flex items-center justify-between">
                    <div>{selectedFeedback.jobTitle}</div>
                    <div>{new Date(selectedFeedback.interviewDate).toLocaleDateString()}</div>
                  </div>
                  <div className="mt-2">{getStarRating(selectedFeedback.overallRating)}</div>
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-royal mb-2">Feedback Summary</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedFeedback.feedback}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-royal mb-2">Strengths</h3>
                  <ul className="space-y-2">
                    {selectedFeedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedFeedback.areasOfImprovement.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-burgundy mb-2">Areas for Improvement</h3>
                    <ul className="space-y-2">
                      {selectedFeedback.areasOfImprovement.map((area, index) => (
                        <li key={index} className="flex items-start">
                          <XCircle className="h-5 w-5 text-burgundy mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Final Result</h3>
                  <div className={`p-4 rounded-lg font-medium ${
                    selectedFeedback.recommendation === "hire" 
                      ? "bg-green-50 text-green-800 border border-green-200" 
                      : selectedFeedback.recommendation === "consider"
                        ? "bg-yellow-50 text-yellow-800 border border-yellow-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                  }`}>
                    {selectedFeedback.recommendation === "hire" && "Recommended for hire"}
                    {selectedFeedback.recommendation === "consider" && "Consider for further rounds"}
                    {selectedFeedback.recommendation === "reject" && "Not recommended at this time"}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Feedback;
