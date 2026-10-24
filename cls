[1mdiff --git a/index.html b/index.html[m
[1mindex c82c9cc..475e616 100644[m
[1m--- a/index.html[m
[1m+++ b/index.html[m
[36m@@ -4,13 +4,173 @@[m
     <meta charset="UTF-8">[m
     <meta name="viewport" content="width=device-width, initial-scale=1.0">[m
 [m
[31m-    <title>School Student Registration System</title>[m
[31m-[m
[32m+[m[32m    <title>School Student Management System</title>[m
     <link rel="stylesheet" href="style.css">[m
[32m+[m[32m    <script src="script.js" defer></script>[m
 </head>[m
[32m+[m
 <body>[m
[32m+[m[32m    <main class="container">[m
[32m+[m[32m        <header class="page-header">[m
[32m+[m[32m            <p class="eyebrow">SCHOOL MANAGEMENT</p>[m
[32m+[m[32m            <h1>Student Registration System</h1>[m
[32m+[m[32m            <p>Register and manage your student records in one place.</p>[m
[32m+[m[32m        </header>[m
[32m+[m
[32m+[m[32m        <!-- 1. REGISTER STUDENTS -->[m
[32m+[m[32m        <section class="panel" id="registration">[m
[32m+[m[32m            <h2 id="formTitle">Register a Student</h2>[m
[32m+[m
[32m+[m[32m            <form id="studentForm">[m
[32m+[m[32m                <input type="hidden" id="editRecordId">[m
[32m+[m
[32m+[m[32m                <div class="form-grid">[m
[32m+[m[32m                    <label for="studentId">[m
[32m+[m[32m                        Student ID *[m
[32m+[m[32m                        <input[m
[32m+[m[32m                            type="text"[m
[32m+[m[32m                            id="studentId"[m
[32m+[m[32m                            placeholder="e.g. HS001"[m
[32m+[m[32m                            maxlength="30"[m
[32m+[m[32m                            required[m
[32m+[m[32m                        >[m
[32m+[m[32m                    </label>[m
[32m+[m
[32m+[m[32m                    <label for="firstName">[m
[32m+[m[32m                        First Name *[m
[32m+[m[32m                        <input[m
[32m+[m[32m                            type="text"[m
[32m+[m[32m                            id="firstName"[m
[32m+[m[32m                            placeholder="Enter first name"[m
[32m+[m[32m                            maxlength="80"[m
[32m+[m[32m                            required[m
[32m+[m[32m                        >[m
[32m+[m[32m                    </label>[m
[32m+[m
[32m+[m[32m                    <label for="lastName">[m
[32m+[m[32m                        Last Name *[m
[32m+[m[32m                        <input[m
[32m+[m[32m                            type="text"[m
[32m+[m[32m                            id="lastName"[m
[32m+[m[32m                            placeholder="Enter last name"[m
[32m+[m[32m                            maxlength="80"[m
[32m+[m[32m                            required[m
[32m+[m[32m                        >[m
[32m+[m[32m                    </label>[m
[32m+[m
[32m+[m[32m                    <label for="gender">[m
[32m+[m[32m                        Gender *[m
[32m+[m[32m                        <select id="gender" required>[m
[32m+[m[32m                            <option value="">Select gender</option>[m
[32m+[m[32m                            <option value="Male">Male</option>[m
[32m+[m[32m                            <option value="Female">Female</option>[m
[32m+[m[32m                            <option value="Other">Other</option>[m
[32m+[m[32m                        </select>[m
[32m+[m[32m                    </label>[m
[32m+[m
[32m+[m[32m                    <label for="grade">[m
[32m+[m[32m                        Grade *[m
[32m+[m[32m                        <select id="grade" required>[m
[32m+[m[32m                            <option value="">Select grade</option>[m
[32m+[m[32m                            <option value="9">Grade 9</option>[m
[32m+[m[32m                            <option value="10">Grade 10</option>[m
[32m+[m[32m                            <option value="11">Grade 11</option>[m
[32m+[m[32m                            <option value="12">Grade 12</option>[m
[32m+[m[32m                        </select>[m
[32m+[m[32m                    </label>[m
[32m+[m
[32m+[m[32m                    <label for="section">[m
[32m+[m[32m                        Section *[m
[32m+[m[32m                        <input[m
[32m+[m[32m                            type="text"[m
[32m+[m[32m                            id="section"[m
[32m+[m[32m                            placeholder="e.g. A"[m
[32m+[m[32m                            maxlength="20"[m
[32m+[m[32m                            required[m
[32m+[m[32m                        >[m
[32m+[m[32m                    </label>[m
[32m+[m
[32m+[m[32m                    <label for="dob">[m
[32m+[m[32m                        Date of Birth[m
[32m+[m[32m                        <input type="date" id="dob">[m
[32m+[m[32m                    </label>[m
[32m+[m
[32m+[m[32m                    <label for="guardianPhone">[m
[32m+[m[32m                        Guardian Phone[m
[32m+[m[32m                        <input[m
[32m+[m[32m                            type="tel"[m
[32m+[m[32m                            id="guardianPhone"[m
[32m+[m[32m                            placeholder="Enter phone number"[m
[32m+[m[32m                            maxlength="30"[m
[32m+[m[32m                        >[m
[32m+[m[32m                    </label>[m
[32m+[m[32m                </div>[m
[32m+[m
[32m+[m[32m                <div class="form-actions">[m
[32m+[m[32m                    <button type="submit" id="saveButton" class="button primary">[m
[32m+[m[32m                        Register Student[m
[32m+[m[32m                    </button>[m
[32m+[m
[32m+[m[32m                    <button type="button" id="clearButton" class="button secondary">[m
[32m+[m[32m                        Clear Form[m
[32m+[m[32m                    </button>[m
[32m+[m
[32m+[m[32m                    <button type="button" id="cancelEditButton"[m
[32m+[m[32m                            class="button secondary" hidden>[m
[32m+[m[32m                        Cancel Editing[m
[32m+[m[32m                    </button>[m
[32m+[m[32m                </div>[m
[32m+[m[32m            </form>[m
[32m+[m[32m        </section>[m
[32m+[m
[32m+[m[32m        <!-- 2 AND 3. DISPLAY AND SEARCH STUDENTS -->[m
[32m+[m[32m        <section class="panel" id="studentRecords">[m
[32m+[m[32m            <div class="section-heading">[m
[32m+[m[32m                <div>[m
[32m+[m[32m                    <h2>Registered Students</h2>[m
[32m+[m[32m                    <p class="muted">Search, edit, or delete student records.</p>[m
[32m+[m[32m                </div>[m
[32m+[m[32m                <span id="studentCount" class="count">0 students</span>[m
[32m+[m[32m            </div>[m
[32m+[m
[32m+[m[32m            <div class="search-bar">[m
[32m+[m[32m                <label for="searchInput">Search students</label>[m
[32m+[m[32m                <input[m
[32m+[m[32m                    type="search"[m
[32m+[m[32m                    id="searchInput"[m
[32m+[m[32m                    placeholder="Search by student ID, first name, or last name..."[m
[32m+[m[32m                >[m
[32m+[m[32m            </div>[m
[32m+[m
[32m+[m[32m            <p id="emptyMessage" class="empty-message">[m
[32m+[m[32m                No students registered yet.[m
[32m+[m[32m            </p>[m
[32m+[m
[32m+[m[32m            <div class="table-wrap">[m
[32m+[m[32m                <table>[m
[32m+[m[32m                    <thead>[m
[32m+[m[32m                        <tr>[m
[32m+[m[32m                            <th>Student ID</th>[m
[32m+[m[32m                            <th>First Name</th>[m
[32m+[m[32m                            <th>Last Name</th>[m
[32m+[m[32m                       