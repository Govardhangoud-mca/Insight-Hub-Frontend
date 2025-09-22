export interface Resource {
    id: string; // Ensure id is defined as a string
    title: string;
    fileUrl: string; // Add this if your backend returns a file URL
    createdAt?: string; // Optional timestamp
  }
  export type Department = "MCA" | "CSE" | "ECE" | "";

  export interface Subject {
    id: string;
    title: string;
    tutorName: string;
    semester: number;
    department: Department;
  }
  
  export interface Unit {
    id: string;
    title: string;
    tutorName: string;
    subjectId: string;
  }
  
  // export interface Resource {
  //   id: string;  // Instead of number
  //   title: string;
  //   link: string;
  //   unitId: string;
  //   uploadDate: string;
  // }
  