// src/types/auth.ts

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  roles: string[];
}

export interface LoginResponse {
  data: LoginData;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}



//types admin create student 
// Interface for the inner "data" object
export interface StudentData {
  studentId: string;
  email: string;
  activationCode: string;
}

// Interface for the full API response
export interface CreateStudentResponse {
  data: StudentData;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: any[]; // لو عندك نوع محدد للأيرور ممكن تحدده بدل any
  timestamp: string; // ISO string
}







///         //        //         //       


export interface ActivateStudentData {
  accessToken: string;
  refreshToken: string;
  role: string;
}

export interface ActivateStudentResponse {
  data: ActivateStudentData;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: any[]; // ممكن تحدد النوع لو عارف شكل الـ errors
  timestamp: string; // ISO string
}



export interface CreateBatchResponse {
  data: string;          // ده الـ batchId
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}
// types/auth.ts
export interface Student {
  studentId: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
}


export interface CreateArticleRequest {
  title: string;
  content: string;
  imageUrl: string;
}

export interface CreateArticleResponse {
  data: string; // article id
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}

export interface Track {
  trackId: string;
  name: string;
}

export interface BatchData {
  id: string;
  name: string;
  startDate: string;
  students: Student[];
  tracks: Track[];
}

export interface BatchResponse {
  data: BatchData;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}




export interface Batch {
  id: string
  name: string
  startDate: string
  studentCount: number
  trackCount: number
}


export interface BatchesData {
  items: Batch[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPrevious: boolean
  hasNext: boolean
}



export interface ApiResponse<T> {
  data: T
  message: string
  isSuccess: boolean
  statusCode: number
  errors: string[]
  timestamp: string
}
export interface Student {
  [key: string]: any;
}

export interface Track {
  [key: string]: any;
}

export interface BatchDatadetails {
  id: string;
  name: string;
  startDate: string;
  students: Student[];
  tracks: Track[];
}










export interface BatchStudent {
  studentId: string;
  fullName: string;
  email: string;
  rank: number;
  averageScore: number;
}


export type BatchStudentsResponse = ApiResponse<BatchStudent[]>;













export interface CreateTrackRequest {
  batchId: string;
  name: string;
}

export interface CreateTrackResponse {
  data: {
    name: string;
  };
  message: string;
  success: boolean;
}















export interface Track {
  id: string;
  name: string;
  batchId: string;
}
export interface GetTracksResponse {
  data: Track[];
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}














// Track Data Interface
export interface Track {
  id: string;
  name: string;
  batchId: string;
  lectureCount: number;
}

// API Response Interface
export interface TrackResponse {
  data: Track;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}






// Track Data Interface
export interface Assignment {
  id: string;
  title: string;
  maxScore: number,
  dueDate: string,
  isClosed: boolean
}

// API Response Interface
export interface AssignmentResponse {
  data: Assignment[]; // 
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}







export interface ApiResponse<T> {
  data: T;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}


export interface Lecturet {
  id: string;
  name: string;
  trackId: string;
}

export type LecturesResponse = ApiResponse<Lecturet[]>;





// src/interfaces/lectures.ts
// src/interfaces/lectures.ts
export interface Lecturere {
  id: string;
  title: string;
  contentText: string;
  driveLink: string;
  fileUrl: string;
  trackId: string;
}

export interface GetLecturesResponse {
  data: Lecturere[]; // هنا المهم: array من الـ Lecture
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}













export interface Lectureredetails {
  id: string;
  title: string;
  contentText: string;
  driveLink: string;
  fileUrl: string;
  trackId: string;
  assignmentCount: number
}

export interface GetLecturesdetailsResponse {
  data: Lectureredetails; // هنا المهم: array من الـ Lecture
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}





















export interface AssignmentDetails {
  id: string;
  title: string;
  maxScore: number;
  dueDate: string;
  isClosed: boolean;
  lectureId: string;
  lectureTitle: string;
  trackId: string;
  trackName: string;
}

export interface AssignmentDetailsResponse {
  data: AssignmentDetails;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}











export interface AssignmentStats {
  totalStudents: number;
  submittedCount: number;
  notSubmittedCount: number;
  averageScore: number;
}

export interface AssignmentStatsResponse {
  data: AssignmentStats;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}


export interface AssignmentSubmissionsResponse {
  data: AssignmentSubmission[];
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}
export interface AssignmentSubmission {
  submissionId: string;
  studentId: string;
  studentName: string;
  fileUrl: string;
  score: number | null;
  isFinalized: boolean;
  submittedAt: string;
}








export interface StudentProgress {
  studentId: string;
  trackId: string;
  completionPercentage: number;
  rank: number;
  averageScore: number;
}

export interface StudentProgressResponse {
  data: StudentProgress;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}



export interface IUser {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  profileImageUrl: string | null;
  roles: string[];
}









// ================= Dashboard Student =================

export interface UpcomingDeadline {
  assignmentTitle: string;
  dueDate: string;
  courseName: string;
}

export interface RecentGrade {
  assignmentTitle: string;
  grade: number;
  feedback: string;
}

export interface StudentDashboardData {
  enrolledTracksCount: number;
  completedAssignments: number;
  averageGrade: number;
  upcomingDeadlines: UpcomingDeadline[];
  recentGrades: RecentGrade[];
}

export interface StudentDashboardResponse {
  data: StudentDashboardData;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}











export interface Submission {
  id: string;
  assignmentId: string;
  fileUrl: string;
  score: number;
  feedback: string;
  isFinalized: boolean;
  createdAt: string;
}

export interface MySubmissionResponse {
  data: Submission;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}





//dashbordAdmin 

export interface DashboardData {
  totalStudents: number;
  totalAdmins: number;
  totalTracks: number;
  totalBatches: number;
  topTracks: TopTrack[];
  recentUsers: RecentUser[];
  topStudents: TopStudent[];
}

export interface TopTrack {
  trackName: string;
  averageScore: number;
  studentCount: number;
}

export interface RecentUser {
  fullName: string;
  email: string;
  role: string;
  createdAt: string; // ممكن تستخدم Date لو هتحولها في الكود
}

export interface TopStudent {
  studentName: string;
  email: string;
  averageScore: number;
  batchName: string

}

// Optional: لو عايز تمثل كامل الريسبونس
export interface DashboardResponse {
  data: DashboardData;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: any[];
  timestamp: string;
}