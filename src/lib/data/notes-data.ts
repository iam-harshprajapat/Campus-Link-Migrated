// Dummy notes data
export interface Note {
  _id: string
  course: string
  semester: string
  subject: string
  fileUrl: string
  title: string
  fileType: "pdf" | "docx" | "ppt" | "jpg" | "png" | "jpeg" |"xls"
  uploadedBy: {
    name: string
  }
  createdAt: string
  uploadedAt: string
  fileSize: number
}

export const dummyNotes: Note[] = [
  {
    _id: "1",
    course: "B.Tech",
    semester: "Sem 1",
    subject: "Mathematics",
    fileUrl: "https://res.cloudinary.com/driqu2cgm/raw/upload/v1763238907/MonthlyTimesheet1753503594632_xnyyti.xls",
    title: "Calculus Fundamentals",
    fileType: "xls",
    uploadedBy: { name: "Prof. John Doe" },
    createdAt: "2025-11-01",
    uploadedAt: "2025-11-01",
    fileSize: 2.5,
  },
  {
    _id: "2",
    course: "B.Tech",
    semester: "Sem 1",
    subject: "Mathematics",
    fileUrl: "https://res.cloudinary.com/driqu2cgm/raw/upload/v1763238907/Fortnightly_Report_1-1_1_gvlfzn.docx",
    title: "Linear Algebra Notes",
    fileType: "docx",
    uploadedBy: { name: "Dr. Jane Smith" },
    createdAt: "2025-10-25",
    uploadedAt: "2025-10-25",
    fileSize: 1.8,
  },
  {
    _id: "3",
    course: "B.Tech",
    semester: "Sem 1",
    subject: "Physics",
    fileUrl: "https://example.com/physics.pdf",
    title: "Classical Mechanics",
    fileType: "pdf",
    uploadedBy: { name: "Prof. Robert King" },
    createdAt: "2025-11-05",
    uploadedAt: "2025-11-05",
    fileSize: 3.2,
  },
  {
    _id: "4",
    course: "B.Tech",
    semester: "Sem 3",
    subject: "Data Structures",
    fileUrl: "https://res.cloudinary.com/driqu2cgm/raw/upload/v1763238908/presentation_wzgjx9.ppt",
    title: "Trees and Graphs",
    fileType: "ppt",
    uploadedBy: { name: "Prof. Alice Johnson" },
    createdAt: "2025-11-08",
    uploadedAt: "2025-11-08",
    fileSize: 5.1,
  },
  {
    _id: "5",
    course: "B.Tech",
    semester: "Sem 3",
    subject: "Database Systems",
    fileUrl: "https://res.cloudinary.com/driqu2cgm/image/upload/CertificateOfCompletion_Learning_Java_2018_i3aryn.pdf",
    title: "SQL Queries & Indexing",
    fileType: "pdf",
    uploadedBy: { name: "Dr. Michael Chen" },
    createdAt: "2025-11-07",
    uploadedAt: "2025-11-07",
    fileSize: 2.9,
  },
  {
    _id: "6",
    course: "BCA",
    semester: "Sem 1",
    subject: "Programming Basics",
    fileUrl: "https://example.com/cpp.docx",
    title: "C++ Fundamentals",
    fileType: "docx",
    uploadedBy: { name: "Prof. Sarah Wilson" },
    createdAt: "2025-11-03",
    uploadedAt: "2025-11-03",
    fileSize: 1.5,
  },
  {
    _id: "7",
    course: "BCA",
    semester: "Sem 1",
    subject: "Web Development",
    fileUrl: "https://example.com/web.pdf",
    title: "HTML & CSS Guide",
    fileType: "pdf",
    uploadedBy: { name: "Prof. David Lee" },
    createdAt: "2025-11-02",
    uploadedAt: "2025-11-02",
    fileSize: 2.1,
  },
]

export function getCourses(): string[] {
  return Array.from(new Set(dummyNotes.map((note) => note.course)))
}

export function getSemestersByCourse(course: string): string[] {
  return Array.from(new Set(dummyNotes.filter((note) => note.course === course).map((note) => note.semester)))
}

export function getSubjectsBySemester(course: string, semester: string): string[] {
  return Array.from(
    new Set(
      dummyNotes
        .filter((note) => note.course === course && note.semester === semester)
        .map((note) => note.subject)
    )
  )
}

export function getFilesBySubject(course: string, semester: string, subject: string): Note[] {
  return dummyNotes.filter(
    (note) => note.course === course && note.semester === semester && note.subject === subject
  )
}
