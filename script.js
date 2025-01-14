document.getElementById("gpaTabBtn").addEventListener("click", function() {
    // Hide CGPA section and show GPA section
    document.getElementById("cgpaTab").style.display = "none";
    document.getElementById("gpaTab").style.display = "block";
});

document.getElementById("cgpaTabBtn").addEventListener("click", function() {
    // Hide GPA section and show CGPA section
    document.getElementById("gpaTab").style.display = "none";
    document.getElementById("cgpaTab").style.display = "block";
});

// GPA Calculation
document.getElementById("calculateBtn").addEventListener("click", function(event) {
    event.preventDefault();

    const previousCgpa = parseFloat(document.getElementById("previousCgpa").value);
    const previousCredits = parseFloat(document.getElementById("previousCredits").value);
    const credits = parseFloat(document.getElementById("credits").value);
    const gpa = parseFloat(document.getElementById("gpa").value);

    if (isNaN(previousCgpa) || isNaN(previousCredits) || isNaN(credits) || isNaN(gpa) || credits <= 0 || gpa <= 0) {
        alert("Please enter valid values for CGPA, Credits, and GPA.");
        return;
    }

    let totalCredits = previousCredits + credits;
    let totalGradePoints = (previousCgpa * previousCredits) + (gpa * credits);
    let newCgpa = totalGradePoints / totalCredits;

    document.getElementById("calculatedCgpa").innerText = newCgpa.toFixed(3);
});

// Add subject input fields
document.getElementById("addSubjectBtn").addEventListener("click", function() {
    const subjectSection = document.getElementById("subjects-section");

    const newSubjectRow = document.createElement("div");
    newSubjectRow.classList.add("subject-row");

    newSubjectRow.innerHTML = `
        <div>
            <label>Subject Name:</label>
            <input type="text" class="subject-name" placeholder="Enter subject name">
        </div>
        <div>
            <label>Credits:</label>
            <input type="number" class="subject-credits" placeholder="Enter subject credits">
        </div>
        <div>
            <label>Grade:</label>
            <input type="text" class="subject-grade" placeholder="Enter subject grade">
        </div>
        <button class="remove-subject-btn">x</button>
    `;

    subjectSection.appendChild(newSubjectRow);

    // Add event listener to the remove button
    newSubjectRow.querySelector(".remove-subject-btn").addEventListener("click", function() {
        subjectSection.removeChild(newSubjectRow);
    });
});

// Calculate GPA for Subjects
document.getElementById("calculateSubjectGpaBtn").addEventListener("click", function(event) {
    event.preventDefault();

    const subjectRows = document.querySelectorAll(".subject-row");
    let totalCredits = 0;
    let totalGradePoints = 0;

    subjectRows.forEach(row => {
        const credits = parseInt(row.querySelector(".subject-credits").value.trim(), 10);
        const gradeRank = row.querySelector(".subject-grade").value.trim();
        let grade = 0;
        switch (gradeRank.toUpperCase()) {
            case 'O':
            grade = 10;
            break;
            case 'A+':
            grade = 9;
            break;
            case 'A':
            grade = 8;
            break;
            case 'B+':
            grade = 7;
            break;
            case 'B':
            grade = 6;
            break;
            case 'C':
            grade = 5;
            break;
            case 'F':
            grade = 0;
            break;
            default:
            grade = 0;
            break;
        }

        if (isNaN(credits) || isNaN(grade) || credits <= 0 || grade <= 0) {
            alert("Please enter valid subject credits and grades.");
            return;
        }

        totalCredits += credits;
        totalGradePoints += (credits * grade);
    });

    if (totalCredits > 0) {
        let subjectGpa = totalGradePoints / totalCredits;
        document.getElementById("subjectGPA").innerText = subjectGpa.toFixed(3);
    }
});
