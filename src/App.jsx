
import { useState, useEffect } from "react";
import "./App.css";
import StudentCard from "./StudentCard";

function App() {
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [students, setStudents] = useState(() => {
  const savedStudents = localStorage.getItem("students");

  if (savedStudents) {
    return JSON.parse(savedStudents);
  }

  return [
    { id: 1, name: "Layantha", course: "IT Degree", marks: 85 },
    { id: 2, name: "Kamal", course: "Software Engineering", marks: 72 },
    { id: 3, name: "Nimal", course: "Computer Science", marks: 60 },
  ];
});
  const [editingStudentId, setEditingStudentId] = useState(null);
  useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students));
}, [students]);

  // Calculate student grade
  function calculateGrade(marks) {
    if (marks >= 75) return "A";
    if (marks >= 65) return "B";
    if (marks >= 55) return "C";
    if (marks >= 35) return "S";
    return "F";
  }

  // Search students by name
  const filteredStudents = students.filter((student) =>
    student.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );

  // Add or update student
  function handleSubmit(e) {
    e.preventDefault();

    if (studentName.trim() === "") {
      alert("Please enter student name!");
      return;
    }

    if (course.trim() === "") {
      alert("Please enter student course!");
      return;
    }

    if (
      marks === "" ||
      !Number.isFinite(Number(marks)) ||
      Number(marks) < 0 ||
      Number(marks) > 100
    ) {
      alert("Marks must be between 0 and 100!");
      return;
    }

    const studentData = {
      name: studentName.trim(),
      course: course.trim(),
      marks: Number(marks),
    };

    if (editingStudentId !== null) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudentId
            ? { ...student, ...studentData }
            : student
        )
      );

      alert("Student updated successfully!");
    } else {
      const newStudent = {
        id: Date.now(),
        ...studentData,
      };

      setStudents((prevStudents) => [
        ...prevStudents,
        newStudent,
      ]);

      alert("Student added successfully!");
    }

    resetForm();
  }

  // Load student details into the form
  function editStudent(student) {
    setStudentName(student.name);
    setCourse(student.course);
    setMarks(student.marks);
    setEditingStudentId(student.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Delete student
  function deleteStudent(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );

    if (editingStudentId === id) {
      resetForm();
    }
  }

  // Reset form
  function resetForm() {
    setStudentName("");
    setCourse("");
    setMarks("");
    setEditingStudentId(null);
  }

  return (
    <div className="app">
      <h1>Student Management System</h1>

      {/* Student Form */}
      <div className="student-card">
        <h2>
          {editingStudentId !== null
            ? "Edit Student"
            : "Add New Student"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter marks (0-100)"
            min="0"
            max="100"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />

          <button type="submit">
            {editingStudentId !== null
              ? "Update Student"
              : "Add Student"}
          </button>

          {editingStudentId !== null && (
            <button type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* Search */}
      <h2>Student List ({filteredStudents.length})</h2>

      <input
        type="text"
        placeholder="Search student by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Student Cards */}
      <div className="students-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div className="student-item" key={student.id}>
              <StudentCard
                studentName={student.name}
                course={student.course}
                marks={student.marks}
              />

              <p>
                <strong>Grade:</strong>{" "}
                {calculateGrade(student.marks)}
              </p>

              <button
                type="button"
                onClick={() => editStudent(student)}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => deleteStudent(student.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
