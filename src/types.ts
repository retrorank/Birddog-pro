export interface Lesson {
  id: string;
  title: string;
  content: string;
}

export interface Phase {
  id: string;
  title: string;
  objective: string;
  outcome: string;
  lessons: Lesson[];
}

export interface Course {
  title: string;
  subtitle: string;
  description: string;
  phases: Phase[];
}
