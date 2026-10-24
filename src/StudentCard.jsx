
function StudentCard(props) {
  return (
    <div>
      <h1>Student Profile</h1>
      <h2>{props.studentName}</h2>
      <p>Course: {props.course}</p>
      <p>Marks: {props.marks}</p>
       <p>
        Grade: {
          props.marks >= 75 ? "A" :
          props.marks >= 65 ? "B" :
          props.marks >= 55 ? "C" :
          props.marks >= 35 ? "S" : "F"
        }
      </p>
    </div>
  );
}

export default StudentCard;
