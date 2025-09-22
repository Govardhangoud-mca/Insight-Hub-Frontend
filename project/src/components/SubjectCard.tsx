import React from "react";

interface Subject {
  id: number;
  title: string;
  tutorName: string;
  department: string;
  semester: number;
}

interface Props {
  subject: Subject;
}

export const SubjectCard: React.FC<Props> = ({ subject }) => {
  return (
    <div className="border p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold">{subject.title}</h2>
      <p><strong>Tutor:</strong> {subject.tutorName}</p>
      <p><strong>Department:</strong> {subject.department}</p>
      <p><strong>Semester:</strong> {subject.semester}</p>
    </div>
  );
};
