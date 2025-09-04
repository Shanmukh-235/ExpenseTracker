const API_URL = "http://localhost:8080/api/expenses";
let chart; // Chart.js instance

// Fetch and render expenses
async function fetchExpenses() {
  const res = await fetch(API_URL);
  const data = await res.json();

  let total = 0;
  let categoryMap = {};

  const tbody = document.getElementById("expense-table-body");
  tbody.innerHTML = "";

  data.forEach((exp, index) => {
    // Add row to table with edit/delete
    let row = `<tr>
            <td>${index + 1}</td>
            <td>${exp.date}</td>
            <td>${exp.category}</td>
            <td>${exp.amount}</td>
            <td>${exp.description}</td>
            <td>
                <button onclick="editExpense(${exp.id}, '${exp.amount}', '${
      exp.category
    }', '${exp.description}', '${exp.date}')">Edit</button>
                <button onclick="deleteExpense(${exp.id})">Delete</button>
            </td>
        </tr>`;
    tbody.innerHTML += row;

    // Total amount
    total += Number(exp.amount);

    // Category-wise aggregation
    if (!categoryMap[exp.category]) {
      categoryMap[exp.category] = 0;
    }
    categoryMap[exp.category] += Number(exp.amount);
  });

  // Update total
  document.getElementById("total-expenses").innerText = total;

  // Draw chart
  drawChart(categoryMap);
}

// Handle form submission (add or update)
document.getElementById("expenseForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("expenseId").value;
  const expense = {
    amount: document.getElementById("amount").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    date: document.getElementById("date").value,
  };

  if (id) {
    // Update existing expense
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
  } else {
    // Add new expense
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
  }

  document.getElementById("expenseForm").reset();
  fetchExpenses();
});

// Delete expense
async function deleteExpense(id) {
  if (confirm("Are you sure you want to delete this expense?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchExpenses();
  }
}

// Load data into form for editing
function editExpense(id, amount, category, description, date) {
  document.getElementById("expenseId").value = id;
  document.getElementById("amount").value = amount;
  document.getElementById("category").value = category;
  document.getElementById("description").value = description;
  document.getElementById("date").value = date;
}

// Initial load
fetchExpenses();

let allExpenses = []; // store globally

async function fetchExpenses() {
  const res = await fetch(API_URL);
  allExpenses = await res.json(); // fetch ALL
  renderExpenses(allExpenses); // render ALL
}

function renderExpenses(data) {
  let total = 0;
  let categoryMap = {};
  const tbody = document.getElementById("expense-table-body");
  tbody.innerHTML = "";

  data.forEach((exp, index) => {
    let row = `<tr>
            <td>${index + 1}</td>
            <td>${exp.date}</td>
            <td>${exp.category}</td>
            <td>${exp.amount}</td>
            <td>${exp.description}</td>
            <td>
                <button onclick="editExpense(${exp.id}, '${exp.amount}', '${
      exp.category
    }', '${exp.description}', '${exp.date}')">Edit</button>
                <button onclick="deleteExpense(${exp.id})">Delete</button>
            </td>
        </tr>`;
    tbody.innerHTML += row;

    total += Number(exp.amount);
    if (!categoryMap[exp.category]) categoryMap[exp.category] = 0;
    categoryMap[exp.category] += Number(exp.amount);
  });

  document.getElementById("total-expenses").innerText = total;
  drawChart(categoryMap);
}

// Apply filters
function applyFilters() {
  let monthValue = document.getElementById("filterMonth").value;
  let categoryValue = document.getElementById("filterCategory").value;

  let filtered = allExpenses.filter((exp) => {
    let matchMonth = true;
    let matchCategory = true;

    if (monthValue) {
      matchMonth = exp.date.startsWith(monthValue); // "2025-08"
    }

    if (categoryValue) {
      if (categoryValue === "Others") {
        matchCategory = !["Food", "Travel", "Shopping", "Bills"].includes(
          exp.category
        );
      } else {
        matchCategory = exp.category === categoryValue;
      }
    }

    return matchMonth && matchCategory;
  });

  renderExpenses(filtered);
}

// Clear filters
function clearFilters() {
  document.getElementById("filterMonth").value = "";
  document.getElementById("filterCategory").value = "";
  renderExpenses(allExpenses);
}

// Generates PDF Report
async function printPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Filtered Expense Report", 14, 15);

  // Total Expenses
  let total = document.getElementById("total-expenses").innerText;
  doc.setFontSize(12);
  doc.text("Total Expenses: " + total, 14, 25);

  // Collect table data
  let tableBody = document.getElementById("expense-table-body");
  let rows = tableBody.querySelectorAll("tr");

  let body = [];
  rows.forEach((row) => {
    let cells = row.querySelectorAll("td");
    body.push([
      cells[0].innerText,
      cells[1].innerText,
      cells[2].innerText,
      cells[3].innerText,
      cells[4].innerText,
    ]);
  });

  // Generate table
  doc.autoTable({
    head: [["#", "Date", "Category", "Amount", "Description"]],
    body: body,
    startY: 35,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [54, 162, 235] },
  });

  // Save PDF
  doc.save("expense-report.pdf");
}

