const students = [
  { name: "Ali", grade: "A", status: "Pass", marks: 92 },
  { name: "Sara", grade: "B", status: "Pass", marks: 85 },
];

function addStudent() {
  const nameInput = document.getElementById("studentName");
  const marksInput = document.getElementById("studentMarks");
  const name = nameInput.value.trim();
  const marks = marksInput.value;

  if (name === "" || marks==="") {
    alert("Please enter valid name and marks.");
    return;
  }

  const grade = getGrade(marks);
  const status = marks < 40 ? "Fail" : "Pass";

  students.push({ name, marks, grade, status });
  nameInput.value = "";
  marksInput.value = "";

  renderTable();
  updateAverage();
}

function getGrade(marks) {
  if (marks >= 90) return "A";
  if (marks >= 80) return "B";
  if (marks >= 70) return "C";
  if (marks >= 60) return "D";
  if (marks >= 40) return "E";
  return "F";
}

function renderTable() {
  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    if (student.marks < 40) row.classList.add("fail");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.marks}</td>
      <td>${student.grade}</td>
      <td>${student.status}</td>
      <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderTable();
  updateAverage();
}

function updateAverage() {
  if (students.length === 0) {
    document.getElementById("averageDisplay").innerText = "Average Marks: 0";
    return;
  }
  const total = students.reduce((sum, s) => sum + s.marks, 0);
  const avg = (total / students.length).toFixed(2);
  document.getElementById("averageDisplay").innerText = `Average Marks: ${avg}`;
}

renderTable();
updateAverage();