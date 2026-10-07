export interface CourseItem {
  id: string;
  userId: string;
  courseName: string;
  courseCode?: string;
  semester?: string;
  credits: number;
  targetGrade: number;
  actualGrade?: string;
  isCompleted: boolean;
  createdAt?: string;
  tasks?: TaskItem[];
}

export interface TaskItem {
  id: string;
  courseId: string;
  userId: string;
  taskName: string;
  dueDate?: string;
  weightage: number;
  score?: number;
  isCompleted: boolean;
}

export interface TimetableSlot {
  id: string;
  userId: string;
  title: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // "09:00"
  endTime: string;   // "11:00"
  location?: string;
  color: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  courseName?: string;
  mastered: boolean;
}
