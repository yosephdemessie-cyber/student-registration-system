// ================================================
// STUDENT REGISTRATION SYSTEM
// Register, display, search, edit, delete, and save
// ================================================

const STORAGE_KEY = "students";

// Get HTML elements
const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("searchInput");
const studentCount = document.getElementById("studentCount");
const emptyMessage = document.getElementById("emptyMessage");

const editRecordId = document.getElementById("editRecordId");
const formTitle = document.getElementById("formTitle");
const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");
const cancelEditButton = document.getElementById("cancelEditButton");

// ================================================
// FEATURE 6: LOAD AND SAVE STUDENTS IN LOCAL STORAGE
// ================================================

function loadStudents() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        const records = JSON.parse(savedData || "[]");

        if (!Array.isArray(records)) {
            return [];
        }

        // Support records created by earlier versions
        return records.map((student, index) => ({
            recordId: String(
                student.recordId ||
                `existing-${index}-${student.studentId || student.id || ""}`
            ),
            studentId: String(student.studentId ?? student.id ?? ""),
            firstName: String(student.firstName ?? ""),
            lastName: String(student.lastName ?? ""),
            gender: String(student.gender ?? ""),
            grade: String(student.grade ?? ""),
            section: String(student.section ?? ""),
            dob: String(student.dob ?? ""),
            guardianPhone: String(student.guardianPhone ?? "")
        }));
    } catch (error) {
        console.error("Could not load student records:", error);
        alert("Could not read saved records. Check the browser Console.");
        return [];
    }
}

function saveStudents(records) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        return true;
    } catch (error) {
        console.error("Could not save student records:", error);
        alert("Student records could not be saved in browser storage.");
        return false;
    }
}

// Load saved records when the page opens
let students = loadStudents();

// Generate a separate internal ID for each record
function createRecordId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// ================================================
// FEATURE 2: DISPLAY REGISTERED STUDENTS
// FEATURE 3: SEARCH STUDENTS BY NAME OR ID
// ================================================

function createCell(value) {
    const cell = document.createElement("td");
    cell.textContent = value || "—";
    return cell;
}

function displayStudents() {
    const query = searchInput.value.trim().toLowerCase();

    // Search by student ID, first name, or last name
    const filteredStudents = students.filter(student => {
        const searchableText = [
            student.studentId,
            student.firstName,
            student.lastName
        ].join(" ").toLowerCase();

        return searchableText.includes(query);
    });

    // Clear old table rows
    studentList.replaceChildren();

    filteredStudents.forEach(student => {
        const row = document.createElement("tr");

        // Add student information to the row
        row.appendChild(createCell(student.studentId));
        row.appendChild(createCell(student.firstName));
        row.appendChild(createCell(student.lastName));
        row.appendChild(createCell(student.gender));
        row.appendChild(createCell(student.grade));
        row.appendChild(createCell(student.section));
        row.appendChild(createCell(student.dob));
        row.appendChild(createCell(student.guardianPhone));

        // Create Edit and Delete buttons
        const actionsCell = document.createElement("td");
        const actions = document.createElement("div");
        actions.className = "actions";

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "edit-button";
        editButton.textContent = "Edit";
        editButton.setAttribute(
            "aria-label",
            `Edit student ${student.studentId}`
        );

        editButton.addEventListener("click", () => {
            editStudent(student.recordId);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "danger";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute(
            "aria-label",
            `Delete student ${student.studentId}`
        );

        deleteButton.addEventListener("click", () => {
            deleteStudent(student.recordId);
        });

        actions.append(editButton, deleteButton);
        actionsCell.appendChild(actions);
        row.appendChild(actionsCell);

        studentList.appendChild(row);
    });

    // Update the record count
    studentCount.textContent =
        `Showing ${filteredStudents.length} of ${students.length} students`;

    // Show the appropriate empty-state message
    if (filteredStudents.length === 0) {
        emptyMessage.hidden = false;

        emptyMessage.textContent = students.length === 0
            ? "No students registered yet. Use the form above to add a student."
            : "No matching students found. Try another search.";
    } else {
        emptyMessage.hidden = true;
    }
}

// ================================================
// FEATURE 1: REGISTER STUDENTS
// ================================================

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Read form values
    const student = {
        studentId: document.getElementById("studentId").value.trim(),
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        gender: document.getElementById("gender").value,
        grade: document.getElementById("grade").value,
        section: document.getElementById("section").value.trim(),
        dob: document.getElementById("dob").value,
        guardianPhone: document.getElementById("guardianPhone").value.trim()
    };

    const currentRecordId = editRecordId.value;

    // Check required fields
    if (
        !student.studentId ||
        !student.firstName ||
        !student.lastName ||
        !student.gender ||
        !student.grade ||
        !student.section
    ) {
        alert("Please complete all required fields.");
        return;
    }

    // Prevent duplicate student IDs
    const duplicate = students.some(existingStudent =>
        existingStudent.studentId.toLowerCase() ===
            student.studentId.toLowerCase() &&
        existingStudent.recordId !== currentRecordId
    );

    if (duplicate) {
        alert("This student ID already exists. Please use another ID.");
        return;
    }

    let updatedStudents;

    if (currentRecordId) {
        // FEATURE 4: UPDATE AN EXISTING STUDENT
        const recordExists = students.some(
            s => s.recordId === currentRecordId
        );

        if (!recordExists) {
            alert("This student record could not be found. Please try again.");
            resetForm();
            return;
        }

        updatedStudents = students.map(existingStudent => {
            if (existingStudent.recordId === currentRecordId) {
                return {
                    ...student,
                    recordId: currentRecordId
                };
            }

            return existingStudent;
        });
    } else {
        // Add a new student
        const newStudent = {
            ...student,
            recordId: createRecordId()
        };

        updatedStudents = [...students, newStudent];
    }

    // Save before updating the displayed data
    if (!saveStudents(updatedStudents)) {
        return;
    }

    students = updatedStudents;

    displayStudents();
    resetForm();

    alert(
        currentRecordId
            ? "Student information updated successfully!"
            : "Student registered successfully!"
    );
});

// ================================================
// FEATURE 4: EDIT STUDENT INFORMATION
// ================================================

function editStudent(recordId) {
    const student = students.find(s => s.recordId === recordId);

    if (!student) {
        alert("Student record not found.");
        return;
    }

    // Fill the form with the selected student's information
    editRecordId.value = student.recordId;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("firstName").value = student.firstName;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("gender").value = student.gender;
    document.getElementById("grade").value = student.grade;
    document.getElementById("section").value = student.section;
    document.getElementById("dob").value = student.dob;
    document.getElementById("guardianPhone").value = student.guardianPhone;

    // Change the form to edit mode
    formTitle.textContent = "Edit Student Information";
    saveButton.textContent = "Update Student";
    cancelEditButton.hidden = false;

    document.getElementById("registration").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ================================================
// FEATURE 5: DELETE STUDENT RECORDS
// ================================================

function deleteStudent(recordId) {
    const student = students.find(s => s.recordId === recordId);

    if (!student) {
        alert("Student record not found.");
        return;
    }

    const confirmed = confirm(
        `Are you sure you want to delete ${student.firstName} ${student.lastName}?`
    );

    if (!confirmed) {
        return;
    }

    const updatedStudents = students.filter(
        s => s.recordId !== recordId
    );

    if (!saveStudents(updatedStudents)) {
        return;
    }

    students = updatedStudents;

    // If the deleted record was being edited, exit edit mode
    if (editRecordId.value === recordId) {
        resetForm();
    }

    displayStudents();

    alert("Student record deleted successfully.");
}

// ================================================
// CLEAR FORM AND CANCEL EDITING
// ================================================

function resetForm() {
    form.reset();
    editRecordId.value = "";

    formTitle.textContent = "Register a Student";
    saveButton.textContent = "Register Student";
    cancelEditButton.hidden = true;
}

clearButton.addEventListener("click", resetForm);
cancelEditButton.addEventListener("click", resetForm);

// Update results whenever the search changes
searchInput.addEventListener("input", displayStudents);

// Display saved records when the page opens
displayStudents();