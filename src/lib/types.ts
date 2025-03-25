
export interface Resume {
  id: string;
  filename: string;
  uploadDate: Date;
  processed: boolean;
}

export interface JobDescription {
  id: string;
  title: string;
  description: string;
}

export interface ResumeMatch {
  resumeId: string;
  filename: string;
  score: number;
  highlights?: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  context?: string;
}
