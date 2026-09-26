/* =====================================================
   CoCo HR SOFTWARE
   JavaScript
===================================================== */


/* =========================
   FIXED LOGIN PASSWORD
========================= */

const FIXED_PASSWORD = "HRM12345";


/* =========================
   DATA STORAGE
========================= */

let employees =
    JSON.parse(
        localStorage.getItem("cocoEmployees")
    ) || [];

let payrollRecords =
    JSON.parse(
        localStorage.getItem("cocoPayrollRecords")
    ) || [];


/* =========================
   PAGE CONTROL
========================= */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.add("hidden");

    });

    const target =
        document.getElementById(pageId);

    if (target) {

        target.classList.remove("hidden");

    }

    window.scrollTo(0, 0);
}


/* =========================
   LOGIN
========================= */

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document
                .getElementById("loginName")
                .value
                .trim();

        const position =
            document
                .getElementById("loginPosition")
                .value;

        const password =
            document
                .getElementById("loginPassword")
                .value;

        const error =
            document.getElementById("loginError");


        if (password !== FIXED_PASSWORD) {

            error.textContent =
                "Incorrect password. Please try again.";

            return;

        }


        localStorage.setItem(
            "cocoLoggedIn",
            "true"
        );

        localStorage.setItem(
            "cocoUserName",
            name
        );

        localStorage.setItem(
            "cocoUserPosition",
            position
        );


        error.textContent = "";

        updateUserInformation();

        updateDashboard();

        showPage("dashboardPage");

    });


/* =========================
   CHECK LOGIN
========================= */

function checkLogin() {

    const loggedIn =
        localStorage.getItem("cocoLoggedIn");

    if (loggedIn === "true") {

        updateUserInformation();

        updateDashboard();

        showPage("dashboardPage");

    } else {

        showPage("loginPage");

    }

}


/* =========================
   USER INFORMATION
========================= */

function updateUserInformation() {

    const name =
        localStorage.getItem(
            "cocoUserName"
        ) || "User";

    const position =
        localStorage.getItem(
            "cocoUserPosition"
        ) || "";

    const userElement =
        document.getElementById(
            "currentUser"
        );

    userElement.textContent =
        name + " • " + position;

}


/* =========================
   LOGOUT
========================= */

function logout() {

    localStorage.removeItem(
        "cocoLoggedIn"
    );

    localStorage.removeItem(
        "cocoUserName"
    );

    localStorage.removeItem(
        "cocoUserPosition"
    );

    document
        .getElementById("loginForm")
        .reset();

    showPage("loginPage");

}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    document
        .getElementById("totalEmployees")
        .textContent =
        employees.length;

}


/* =========================
   EMPLOYEE PAGE
========================= */

function openEmployees() {

    renderEmployees();

    showPage("employeePage");

}


/* =========================
   NEW EMPLOYEE PAGE
========================= */

function openNewEmployee() {

    document
        .getElementById("employeeForm")
        .reset();

    showPage("newEmployeePage");

}


/* =========================
   SAVE EMPLOYEE
========================= */

document
    .getElementById("employeeForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const employeeId =
            document
                .getElementById("employeeId")
                .value
                .trim();

        const employeeName =
            document
                .getElementById("employeeName")
                .value
                .trim();

        const gender =
            document
                .getElementById("employeeGender")
                .value;

        const dob =
            document
                .getElementById("employeeDob")
                .value;

        const phone =
            document
                .getElementById("employeePhone")
                .value
                .trim();


        if (
            !employeeId ||
            !employeeName ||
            !gender ||
            !dob ||
            !phone
        ) {

            alert(
                "Please complete all employee information."
            );

            return;

        }


        const duplicate =
            employees.some(function(employee) {

                return employee.id
                    .toLowerCase() ===
                    employeeId.toLowerCase();

            });


        if (duplicate) {

            alert(
                "This Employee ID already exists."
            );

            return;

        }


        const newEmployee = {

            id: employeeId,

            name: employeeName,

            gender: gender,

            dob: dob,

            phone: phone

        };


        employees.push(newEmployee);


        localStorage.setItem(
            "cocoEmployees",
            JSON.stringify(employees)
        );


        updateDashboard();


        alert(
            "Employee saved successfully."
        );


        openEmployees();

    });


/* =========================
   RENDER EMPLOYEES
========================= */

function renderEmployees() {

    const table =
        document.getElementById(
            "employeeTableBody"
        );

    const empty =
        document.getElementById(
            "emptyEmployees"
        );


    table.innerHTML = "";


    if (employees.length === 0) {

        empty.style.display = "block";

        return;

    }


    empty.style.display = "none";


    employees.forEach(function(employee) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${escapeHTML(employee.id)}</td>

            <td>${escapeHTML(employee.name)}</td>

            <td>${escapeHTML(employee.gender)}</td>

            <td>${escapeHTML(employee.dob)}</td>

            <td>${escapeHTML(employee.phone)}</td>

            <td>

                <button
                    class="delete-button"
                    onclick="deleteEmployee('${escapeJS(employee.id)}')"
                >
                    Delete
                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


/* =========================
   DELETE EMPLOYEE
========================= */

function deleteEmployee(employeeId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this employee?"
        );


    if (!confirmDelete) {

        return;

    }


    employees =
        employees.filter(function(employee) {

            return employee.id !== employeeId;

        });


    localStorage.setItem(
        "cocoEmployees",
        JSON.stringify(employees)
    );


    updateDashboard();

    renderEmployees();

}


/* =========================
   PAYROLL PAGE
========================= */

function openPayroll() {

    renderPayrollEmployees();

    showPage("payrollPage");

}


/* =========================
   RENDER PAYROLL EMPLOYEES
========================= */

function renderPayrollEmployees() {

    const table =
        document.getElementById(
            "payrollEmployeeTable"
        );

    const empty =
        document.getElementById(
            "emptyPayrollEmployees"
        );


    table.innerHTML = "";


    if (employees.length === 0) {

        empty.style.display = "block";

        return;

    }


    empty.style.display = "none";


    employees.forEach(function(employee) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${escapeHTML(employee.id)}</td>

            <td>${escapeHTML(employee.name)}</td>

            <td>${escapeHTML(employee.gender)}</td>

            <td>${escapeHTML(employee.dob)}</td>

            <td>${escapeHTML(employee.phone)}</td>

        `;


        table.appendChild(row);

    });

}


/* =========================
   PAYROLL CALCULATION PAGE
========================= */

function openPayrollCalculation() {

    populatePayrollEmployeeSelect();

    document
        .getElementById(
            "payrollEmployeeName"
        )
        .value = "";

    showPage(
        "payrollCalculationPage"
    );

}


/* =========================
   EMPLOYEE DROPDOWN
========================= */

function populatePayrollEmployeeSelect() {

    const select =
        document.getElementById(
            "payrollEmployeeId"
        );


    select.innerHTML = `

        <option value="">
            Select Employee
        </option>

    `;


    employees.forEach(function(employee) {

        const option =
            document.createElement("option");

        option.value =
            employee.id;

        option.textContent =
            employee.id +
            " - " +
            employee.name;

        select.appendChild(option);

    });

}


/* =========================
   AUTO EMPLOYEE NAME
========================= */

document
    .getElementById("payrollEmployeeId")
    .addEventListener(
        "change",
        function() {

            const selectedId =
                this.value;


            const employee =
                employees.find(
                    function(item) {

                        return item.id ===
                            selectedId;

                    }
                );


            const nameInput =
                document.getElementById(
                    "payrollEmployeeName"
                );


            if (employee) {

                nameInput.value =
                    employee.name;

            } else {

                nameInput.value = "";

            }

        }
    );


/* =========================
   CALCULATE PAYROLL
========================= */

document
    .getElementById("payrollForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const employeeId =
                document.getElementById(
                    "payrollEmployeeId"
                ).value;


            const employee =
                employees.find(
                    function(item) {

                        return item.id ===
                            employeeId;

                    }
                );


            if (!employee) {

                alert(
                    "Please select an employee."
                );

                return;

            }


            const basic =
                Number(
                    document.getElementById(
                        "basicSalary"
                    ).value
                ) || 0;


            const allowance =
                Number(
                    document.getElementById(
                        "allowance"
                    ).value
                ) || 0;


            const overtime =
                Number(
                    document.getElementById(
                        "overtime"
                    ).value
                ) || 0;


            const deduction =
                Number(
                    document.getElementById(
                        "deduction"
                    ).value
                ) || 0;


            const netSalary =
                basic +
                allowance +
                overtime -
                deduction;


            createVoucher(

                employee,

                basic,

                allowance,

                overtime,

                deduction,

                netSalary

            );

        }
    );


/* =========================
   CREATE VOUCHER
========================= */

function createVoucher(
    employee,
    basic,
    allowance,
    overtime,
    deduction,
    netSalary
) {

    const now =
        new Date();


    document
        .getElementById(
            "voucherDate"
        )
        .textContent =
        now.toLocaleDateString();


    document
        .getElementById(
            "voucherTime"
        )
        .textContent =
        now.toLocaleTimeString();


    document
        .getElementById(
            "voucherEmployeeId"
        )
        .textContent =
        employee.id;


    document
        .getElementById(
            "voucherEmployeeName"
        )
        .textContent =
        employee.name;


    document
        .getElementById(
            "voucherGender"
        )
        .textContent =
        employee.gender;


    document
        .getElementById(
            "voucherDob"
        )
        .textContent =
        employee.dob;


    document
        .getElementById(
            "voucherPhone"
        )
        .textContent =
        employee.phone;


    document
        .getElementById(
            "voucherBasic"
        )
        .textContent =
        formatMoney(basic);


    document
        .getElementById(
            "voucherAllowance"
        )
        .textContent =
        formatMoney(allowance);


    document
        .getElementById(
            "voucherOvertime"
        )
        .textContent =
        formatMoney(overtime);


    document
        .getElementById(
            "voucherDeduction"
        )
        .textContent =
        formatMoney(deduction);


    document
        .getElementById(
            "voucherNet"
        )
        .textContent =
        formatMoney(netSalary);


    window.currentPayroll = {

        employeeId:
            employee.id,

        employeeName:
            employee.name,

        gender:
            employee.gender,

        dob:
            employee.dob,

        phone:
            employee.phone,

        basic:
            basic,

        allowance:
            allowance,

        overtime:
            overtime,

        deduction:
            deduction,

        netSalary:
            netSalary,

        date:
            now.toLocaleDateString(),

        time:
            now.toLocaleTimeString()

    };


    showPage("voucherPage");

}


/* =========================
   SAVE PAYROLL
========================= */

function savePayroll() {

    if (!window.currentPayroll) {

        alert(
            "No payroll information available."
        );

        return;

    }


    payrollRecords.push(
        window.currentPayroll
    );


    localStorage.setItem(
        "cocoPayrollRecords",
        JSON.stringify(
            payrollRecords
        )
    );


    alert(
        "Payroll saved successfully."
    );

}


/* =========================
   PRINT / PDF
========================= */

function printVoucher() {

    if (!window.currentPayroll) {

        alert(
            "Please calculate payroll first."
        );

        return;

    }


    window.print();

}


/* =========================
   MONEY FORMAT
========================= */

function formatMoney(amount) {

    return new Intl.NumberFormat(
        "en-US"
    ).format(amount) + " MMK";

}


/* =========================
   SECURITY HELPERS
========================= */

function escapeHTML(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


function escapeJS(value) {

    return String(value)

        .replaceAll("\\", "\\\\")

        .replaceAll("'", "\\'")

        .replaceAll('"', '\\"');

}


/* =========================
   START APPLICATION
========================= */

checkLogin();

