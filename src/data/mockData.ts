// Mock Users for Authentication
export const mockUsers = [
  {
    id: '1',
    email: 'admin@demo.school',
    password: 'Admin@123',
    role: 'admin' as const,
    name: 'System Administrator',
    avatar: '/placeholder.svg'
  },
  {
    id: '2',
    email: 'teacher1@demo.school',
    password: 'Teacher@123',
    role: 'teacher' as const,
    name: 'Mary Njeri',
    subject: 'Mathematics',
    avatar: '/placeholder.svg'
  },
  {
    id: '3',
    email: 'parent1@demo.school',
    password: 'Parent@123',
    role: 'parent' as const,
    name: 'Mr. Mwangi',
    studentId: 's1',
    avatar: '/placeholder.svg'
  },
  {
    id: '4',
    email: 'student1@demo.school',
    password: 'Student@123',
    role: 'student' as const,
    name: 'John Mwangi',
    studentId: 's1',
    class: 'Grade 6A',
    avatar: '/placeholder.svg'
  }
];

export type UserRole = 'admin' | 'teacher' | 'parent' | 'student';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  subject?: string;
  studentId?: string;
  class?: string;
}

// Mock Students
export const mockStudents = [
  { id: 's1', name: 'John Mwangi', class: 'Grade 6A', gender: 'Male', dob: '2014-03-15', parentName: 'Mr. Mwangi', parentPhone: '+254 712 345 678', status: 'Active', photo: '/placeholder.svg', admissionNo: 'GVS-2024-001' },
  { id: 's2', name: 'Aisha Hassan', class: 'Grade 4B', gender: 'Female', dob: '2016-07-22', parentName: 'Mrs. Hassan', parentPhone: '+254 723 456 789', status: 'Active', photo: '/placeholder.svg', admissionNo: 'GVS-2024-002' },
  { id: 's3', name: 'Brian Otieno', class: 'Grade 8A', gender: 'Male', dob: '2012-11-08', parentName: 'Mr. Otieno', parentPhone: '+254 734 567 890', status: 'Active', photo: '/placeholder.svg', admissionNo: 'GVS-2024-003' },
  { id: 's4', name: 'Faith Wanjiku', class: 'JS Grade 9', gender: 'Female', dob: '2011-05-30', parentName: 'Mrs. Wanjiku', parentPhone: '+254 745 678 901', status: 'Active', photo: '/placeholder.svg', admissionNo: 'GVS-2024-004' },
  { id: 's5', name: 'David Kamau', class: 'Grade 5A', gender: 'Male', dob: '2015-09-12', parentName: 'Mr. Kamau', parentPhone: '+254 756 789 012', status: 'Active', photo: '/placeholder.svg', admissionNo: 'GVS-2024-005' },
  { id: 's6', name: 'Grace Akinyi', class: 'Grade 7B', gender: 'Female', dob: '2013-02-18', parentName: 'Mrs. Akinyi', parentPhone: '+254 767 890 123', status: 'Active', photo: '/placeholder.svg', admissionNo: 'GVS-2024-006' },
  { id: 's7', name: 'Samuel Kipchoge', class: 'Grade 3A', gender: 'Male', dob: '2017-06-25', parentName: 'Mr. Kipchoge', parentPhone: '+254 778 901 234', status: 'Active', photo: '/placeholder.svg', admissionNo: 'GVS-2024-007' },
  { id: 's8', name: 'Mercy Wambui', class: 'JS Grade 7', gender: 'Female', dob: '2013-12-01', parentName: 'Mrs. Wambui', parentPhone: '+254 789 012 345', status: 'Active', photo: '/placeholder.svg', admissionNo: 'GVS-2024-008' },
];

// Mock Teachers
export const mockTeachers = [
  { id: 't1', name: 'Mary Njeri', email: 'mnjeri@greenvalley.school', subject: 'Mathematics', classes: ['Grade 6A', 'Grade 6B', 'Grade 7A'], phone: '+254 711 111 111', status: 'Active', classTeacher: 'Grade 6A' },
  { id: 't2', name: 'Peter Otieno', email: 'potieno@greenvalley.school', subject: 'English', classes: ['Grade 4A', 'Grade 4B', 'Grade 5A'], phone: '+254 722 222 222', status: 'Active', classTeacher: 'Grade 4B' },
  { id: 't3', name: 'Grace Wambui', email: 'gwambui@greenvalley.school', subject: 'Science', classes: ['Grade 7A', 'Grade 7B', 'Grade 8A'], phone: '+254 733 333 333', status: 'Active', classTeacher: 'Grade 7B' },
  { id: 't4', name: 'David Kimani', email: 'dkimani@greenvalley.school', subject: 'ICT', classes: ['JS Grade 7', 'JS Grade 8', 'JS Grade 9'], phone: '+254 744 444 444', status: 'Active', classTeacher: 'JS Grade 9' },
  { id: 't5', name: 'Sarah Achieng', email: 'sachieng@greenvalley.school', subject: 'Social Studies', classes: ['Grade 5A', 'Grade 5B', 'Grade 6A'], phone: '+254 755 555 555', status: 'Active', classTeacher: 'Grade 5A' },
  { id: 't6', name: 'James Muthoni', email: 'jmuthoni@greenvalley.school', subject: 'Kiswahili', classes: ['Grade 3A', 'Grade 3B', 'Grade 4A'], phone: '+254 766 666 666', status: 'Active', classTeacher: 'Grade 3A' },
];

// Mock Classes
export const mockClasses = [
  { id: 'c1', name: 'Grade 1A', stream: 'A', level: 'Primary', students: 35, classTeacher: 'Jane Mwende' },
  { id: 'c2', name: 'Grade 1B', stream: 'B', level: 'Primary', students: 33, classTeacher: 'John Karanja' },
  { id: 'c3', name: 'Grade 2A', stream: 'A', level: 'Primary', students: 38, classTeacher: 'Ann Wafula' },
  { id: 'c4', name: 'Grade 3A', stream: 'A', level: 'Primary', students: 40, classTeacher: 'James Muthoni' },
  { id: 'c5', name: 'Grade 4A', stream: 'A', level: 'Primary', students: 36, classTeacher: 'Rose Adhiambo' },
  { id: 'c6', name: 'Grade 4B', stream: 'B', level: 'Primary', students: 34, classTeacher: 'Peter Otieno' },
  { id: 'c7', name: 'Grade 5A', stream: 'A', level: 'Primary', students: 37, classTeacher: 'Sarah Achieng' },
  { id: 'c8', name: 'Grade 6A', stream: 'A', level: 'Primary', students: 39, classTeacher: 'Mary Njeri' },
  { id: 'c9', name: 'Grade 6B', stream: 'B', level: 'Primary', students: 35, classTeacher: 'Michael Oduor' },
  { id: 'c10', name: 'Grade 7A', stream: 'A', level: 'Primary', students: 38, classTeacher: 'Lucy Waithera' },
  { id: 'c11', name: 'Grade 7B', stream: 'B', level: 'Primary', students: 36, classTeacher: 'Grace Wambui' },
  { id: 'c12', name: 'Grade 8A', stream: 'A', level: 'Primary', students: 40, classTeacher: 'Daniel Kipruto' },
  { id: 'c13', name: 'JS Grade 7', stream: 'A', level: 'Junior Secondary', students: 42, classTeacher: 'Elizabeth Njoki' },
  { id: 'c14', name: 'JS Grade 8', stream: 'A', level: 'Junior Secondary', students: 38, classTeacher: 'Robert Wanyama' },
  { id: 'c15', name: 'JS Grade 9', stream: 'A', level: 'Junior Secondary', students: 35, classTeacher: 'David Kimani' },
];

// Mock Timetable
export const mockTimetable = [
  { id: 'tt1', day: 'Monday', time: '8:00 - 9:00', subject: 'Mathematics', class: 'Grade 6A', teacher: 'Mary Njeri', room: 'Room 12' },
  { id: 'tt2', day: 'Monday', time: '9:00 - 10:00', subject: 'English', class: 'Grade 6A', teacher: 'Peter Otieno', room: 'Room 12' },
  { id: 'tt3', day: 'Monday', time: '10:30 - 11:30', subject: 'Science', class: 'Grade 6A', teacher: 'Grace Wambui', room: 'Lab 1' },
  { id: 'tt4', day: 'Monday', time: '11:30 - 12:30', subject: 'Social Studies', class: 'Grade 6A', teacher: 'Sarah Achieng', room: 'Room 12' },
  { id: 'tt5', day: 'Tuesday', time: '8:00 - 9:00', subject: 'English', class: 'Grade 6A', teacher: 'Peter Otieno', room: 'Room 12' },
  { id: 'tt6', day: 'Tuesday', time: '9:00 - 10:00', subject: 'Mathematics', class: 'Grade 6A', teacher: 'Mary Njeri', room: 'Room 12' },
  { id: 'tt7', day: 'Tuesday', time: '10:30 - 11:30', subject: 'Kiswahili', class: 'Grade 6A', teacher: 'James Muthoni', room: 'Room 12' },
  { id: 'tt8', day: 'Tuesday', time: '11:30 - 12:30', subject: 'ICT', class: 'Grade 6A', teacher: 'David Kimani', room: 'Computer Lab' },
  { id: 'tt9', day: 'Wednesday', time: '8:00 - 9:00', subject: 'Science', class: 'Grade 6A', teacher: 'Grace Wambui', room: 'Lab 1' },
  { id: 'tt10', day: 'Wednesday', time: '9:00 - 10:00', subject: 'Mathematics', class: 'Grade 6A', teacher: 'Mary Njeri', room: 'Room 12' },
  { id: 'tt11', day: 'Thursday', time: '8:00 - 9:00', subject: 'English', class: 'Grade 6A', teacher: 'Peter Otieno', room: 'Room 12' },
  { id: 'tt12', day: 'Thursday', time: '9:00 - 10:00', subject: 'Social Studies', class: 'Grade 6A', teacher: 'Sarah Achieng', room: 'Room 12' },
  { id: 'tt13', day: 'Friday', time: '8:00 - 9:00', subject: 'Mathematics', class: 'Grade 6A', teacher: 'Mary Njeri', room: 'Room 12' },
  { id: 'tt14', day: 'Friday', time: '9:00 - 10:00', subject: 'Physical Education', class: 'Grade 6A', teacher: 'Coach Kiprop', room: 'Field' },
];

// Mock Fee Structure
export const mockFeeStructure = [
  { id: 'f1', name: 'Tuition Fee', amount: 25000, term: 'Per Term', category: 'Mandatory' },
  { id: 'f2', name: 'Development Levy', amount: 5000, term: 'Per Term', category: 'Mandatory' },
  { id: 'f3', name: 'Transport Fee', amount: 6000, term: 'Per Term', category: 'Optional' },
  { id: 'f4', name: 'Lunch Program', amount: 4500, term: 'Per Term', category: 'Optional' },
  { id: 'f5', name: 'Exam Fee', amount: 1500, term: 'Per Term', category: 'Mandatory' },
  { id: 'f6', name: 'Activity Fee', amount: 2000, term: 'Per Term', category: 'Mandatory' },
];

// Mock Fee Payments
export const mockFeePayments = [
  { id: 'p1', studentId: 's1', studentName: 'John Mwangi', class: 'Grade 6A', totalFee: 33500, amountPaid: 20000, balance: 13500, lastPayment: '2024-01-15', status: 'Partial' },
  { id: 'p2', studentId: 's2', studentName: 'Aisha Hassan', class: 'Grade 4B', totalFee: 33500, amountPaid: 23500, balance: 10000, lastPayment: '2024-01-10', status: 'Partial' },
  { id: 'p3', studentId: 's3', studentName: 'Brian Otieno', class: 'Grade 8A', totalFee: 33500, amountPaid: 33500, balance: 0, lastPayment: '2024-01-05', status: 'Paid' },
  { id: 'p4', studentId: 's4', studentName: 'Faith Wanjiku', class: 'JS Grade 9', totalFee: 38000, amountPaid: 38000, balance: 0, lastPayment: '2024-01-08', status: 'Paid' },
  { id: 'p5', studentId: 's5', studentName: 'David Kamau', class: 'Grade 5A', totalFee: 33500, amountPaid: 15000, balance: 18500, lastPayment: '2024-01-12', status: 'Partial' },
  { id: 'p6', studentId: 's6', studentName: 'Grace Akinyi', class: 'Grade 7B', totalFee: 33500, amountPaid: 33500, balance: 0, lastPayment: '2024-01-03', status: 'Paid' },
];

// Mock Transport
export const mockTransport = [
  { id: 'b1', busNumber: 'Bus 1', route: 'Eastlands Route', driver: 'Joseph Wanyama', capacity: 45, assigned: 38, phone: '+254 700 111 222' },
  { id: 'b2', busNumber: 'Bus 2', route: 'Westlands Route', driver: 'Michael Ochieng', capacity: 45, assigned: 42, phone: '+254 700 333 444' },
  { id: 'b3', busNumber: 'Bus 3', route: 'South B Route', driver: 'Samuel Mutua', capacity: 40, assigned: 35, phone: '+254 700 555 666' },
];

export const mockTransportAssignments = [
  { id: 'ta1', studentId: 's1', studentName: 'John Mwangi', busId: 'b1', route: 'Eastlands Route', pickupPoint: 'Pipeline Stage' },
  { id: 'ta2', studentId: 's4', studentName: 'Faith Wanjiku', busId: 'b2', route: 'Westlands Route', pickupPoint: 'Sarit Centre' },
  { id: 'ta3', studentId: 's5', studentName: 'David Kamau', busId: 'b3', route: 'South B Route', pickupPoint: 'Capital Centre' },
];

// Mock Exams
export const mockExams = [
  { id: 'e1', name: 'CAT 1', term: 'Term 1', date: '2024-02-15', status: 'Completed' },
  { id: 'e2', name: 'Mid-Term Exam', term: 'Term 1', date: '2024-03-01', status: 'Completed' },
  { id: 'e3', name: 'End-Term Exam', term: 'Term 1', date: '2024-04-10', status: 'Upcoming' },
];

export const mockSubjects = [
  { id: 'sub1', name: 'Mathematics', code: 'MATH' },
  { id: 'sub2', name: 'English', code: 'ENG' },
  { id: 'sub3', name: 'Science', code: 'SCI' },
  { id: 'sub4', name: 'Social Studies', code: 'SST' },
  { id: 'sub5', name: 'Kiswahili', code: 'KSW' },
  { id: 'sub6', name: 'ICT', code: 'ICT' },
];

export const mockExamResults = [
  { id: 'r1', studentId: 's1', studentName: 'John Mwangi', examId: 'e1', subject: 'Mathematics', marks: 85, grade: 'A', remarks: 'Excellent' },
  { id: 'r2', studentId: 's1', studentName: 'John Mwangi', examId: 'e1', subject: 'English', marks: 78, grade: 'B', remarks: 'Good' },
  { id: 'r3', studentId: 's1', studentName: 'John Mwangi', examId: 'e1', subject: 'Science', marks: 82, grade: 'A', remarks: 'Very Good' },
  { id: 'r4', studentId: 's1', studentName: 'John Mwangi', examId: 'e1', subject: 'Social Studies', marks: 75, grade: 'B', remarks: 'Good' },
  { id: 'r5', studentId: 's1', studentName: 'John Mwangi', examId: 'e2', subject: 'Mathematics', marks: 88, grade: 'A', remarks: 'Excellent' },
  { id: 'r6', studentId: 's1', studentName: 'John Mwangi', examId: 'e2', subject: 'English', marks: 80, grade: 'A', remarks: 'Very Good' },
  { id: 'r7', studentId: 's2', studentName: 'Aisha Hassan', examId: 'e1', subject: 'Mathematics', marks: 72, grade: 'B', remarks: 'Good' },
  { id: 'r8', studentId: 's2', studentName: 'Aisha Hassan', examId: 'e1', subject: 'English', marks: 88, grade: 'A', remarks: 'Excellent' },
];

// Mock Attendance
export const mockAttendance = [
  { id: 'a1', studentId: 's1', date: '2024-01-15', status: 'Present', class: 'Grade 6A' },
  { id: 'a2', studentId: 's1', date: '2024-01-16', status: 'Present', class: 'Grade 6A' },
  { id: 'a3', studentId: 's1', date: '2024-01-17', status: 'Absent', class: 'Grade 6A', reason: 'Sick' },
  { id: 'a4', studentId: 's2', date: '2024-01-15', status: 'Present', class: 'Grade 4B' },
  { id: 'a5', studentId: 's2', date: '2024-01-16', status: 'Present', class: 'Grade 4B' },
  { id: 'a6', studentId: 's3', date: '2024-01-15', status: 'Present', class: 'Grade 8A' },
  { id: 'a7', studentId: 's3', date: '2024-01-16', status: 'Late', class: 'Grade 8A' },
];

// Mock Announcements
export const mockAnnouncements = [
  { id: 'an1', title: 'Mid-Term Exams Start Next Week', content: 'Please ensure all students are well prepared. Exams begin Monday, March 1st.', date: '2024-02-22', priority: 'High', audience: 'All' },
  { id: 'an2', title: 'Fee Balance Reminder', content: 'Parents with outstanding fee balances are requested to clear by end of month.', date: '2024-02-20', priority: 'Medium', audience: 'Parents' },
  { id: 'an3', title: 'Sports Day Announcement', content: 'Annual sports day scheduled for March 15th. All students should participate.', date: '2024-02-18', priority: 'Low', audience: 'All' },
  { id: 'an4', title: 'Parent-Teacher Meeting', content: 'PTM scheduled for Saturday, March 10th from 9 AM to 1 PM.', date: '2024-02-15', priority: 'High', audience: 'Parents' },
];

// Mock Assignments (for students)
export const mockAssignments = [
  { id: 'as1', subject: 'Mathematics', title: 'Fractions Homework', description: 'Complete exercises 1-20 on page 45', dueDate: '2024-02-25', class: 'Grade 6A', teacher: 'Mary Njeri', status: 'Pending' },
  { id: 'as2', subject: 'English', title: 'Essay Writing', description: 'Write a 500-word essay on "My Favorite Holiday"', dueDate: '2024-02-28', class: 'Grade 6A', teacher: 'Peter Otieno', status: 'Pending' },
  { id: 'as3', subject: 'Science', title: 'Lab Report', description: 'Submit lab report on plant photosynthesis experiment', dueDate: '2024-02-23', class: 'Grade 6A', teacher: 'Grace Wambui', status: 'Submitted' },
];

// Dashboard Stats
export const dashboardStats = {
  totalStudents: 420,
  totalTeachers: 28,
  totalParents: 310,
  feeCollectionTerm: 3200000,
  attendanceToday: 94,
  totalClasses: 15,
  pendingFees: 850000,
  upcomingEvents: 4,
};

// Enrollment by class (for chart)
export const enrollmentByClass = [
  { class: 'Grade 1', students: 68 },
  { class: 'Grade 2', students: 65 },
  { class: 'Grade 3', students: 58 },
  { class: 'Grade 4', students: 70 },
  { class: 'Grade 5', students: 62 },
  { class: 'Grade 6', students: 74 },
  { class: 'Grade 7', students: 74 },
  { class: 'Grade 8', students: 40 },
  { class: 'JS 7-9', students: 115 },
];

// Fee collection data (for chart)
export const feeCollectionData = [
  { name: 'Paid', value: 3200000, color: 'hsl(var(--chart-1))' },
  { name: 'Pending', value: 850000, color: 'hsl(var(--chart-3))' },
];

// Exam performance data (for chart)
export const examPerformanceData = [
  { exam: 'CAT 1', avgScore: 72 },
  { exam: 'Mid-Term', avgScore: 75 },
  { exam: 'End-Term', avgScore: 78 },
];

// Grade calculation helper
export function calculateGrade(marks: number): string {
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  if (marks >= 50) return 'D';
  return 'E';
}
