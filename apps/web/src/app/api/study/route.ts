import { NextResponse } from 'next/server';

const MOCK_COURSES = [
  {
    id: 'course-1',
    userId: 'user-ezra',
    courseName: 'Distributed Systems & Cloud Architecture',
    courseCode: 'CS4102',
    semester: 'Semester 1, 2026/2027',
    credits: 4,
    targetGrade: 88.0,
    actualGrade: 'A',
    isCompleted: false,
    tasks: [
      { id: 't1', taskName: 'Raft Consensus Protocol Milestone', dueDate: '2026-10-14', weightage: 25, isCompleted: false },
      { id: 't2', taskName: 'Midterm Benchmarking Examination', dueDate: '2026-10-28', weightage: 30, isCompleted: false }
    ]
  },
  {
    id: 'course-2',
    userId: 'user-ezra',
    courseName: 'Applied Machine Learning & GenAI Systems',
    courseCode: 'AI3205',
    semester: 'Semester 1, 2026/2027',
    credits: 3,
    targetGrade: 92.0,
    actualGrade: 'A+',
    isCompleted: false,
    tasks: [
      { id: 't3', taskName: 'Multimodal Statement OCR Fine-tuning', dueDate: '2026-10-18', weightage: 35, isCompleted: true }
    ]
  },
  {
    id: 'course-3',
    userId: 'user-ezra',
    courseName: 'Software Architecture & Enterprise Microservices',
    courseCode: 'SE4301',
    semester: 'Semester 1, 2026/2027',
    credits: 3,
    targetGrade: 85.0,
    actualGrade: 'A-',
    isCompleted: false,
    tasks: [
      { id: 't4', taskName: 'Clean Monorepo Architectural Defense', dueDate: '2026-10-22', weightage: 40, isCompleted: false }
    ]
  }
];

const MOCK_SCHEDULES = [
  { id: 's1', dayOfWeek: 'Monday', title: 'Distributed Systems Lecture', startTime: '09:00', endTime: '11:00', location: 'Lab 4 / Zoom', color: '#6366f1' },
  { id: 's2', dayOfWeek: 'Monday', title: 'Machine Learning Lab', startTime: '14:00', endTime: '16:00', location: 'AI Research Hall', color: '#06b6d4' },
  { id: 's3', dayOfWeek: 'Tuesday', title: 'Enterprise Arch Seminar', startTime: '10:00', endTime: '12:00', location: 'Auditorium 2', color: '#10b981' },
  { id: 's4', dayOfWeek: 'Wednesday', title: 'Deep Work / Consensual Coding', startTime: '13:00', endTime: '16:00', location: 'Library Pod 3', color: '#f59e0b' },
  { id: 's5', dayOfWeek: 'Thursday', title: 'Applied Machine Learning Tut', startTime: '11:00', endTime: '13:00', location: 'Computing Block C', color: '#06b6d4' },
  { id: 's6', dayOfWeek: 'Friday', title: 'Capstone Sprint Review', startTime: '15:00', endTime: '17:00', location: 'Innovation Hub', color: '#f43f5e' }
];

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: {
      courses: MOCK_COURSES,
      schedules: MOCK_SCHEDULES
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: 'success',
      message: 'Course / Schedule updated successfully.',
      data: body
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ status: 'error', message }, { status: 400 });
  }
}
