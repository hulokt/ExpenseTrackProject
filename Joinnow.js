let userName;
window.onload = function() {
    userName = localStorage.getItem("userName");

    if (userName) {
        let profileCard = document.getElementById("signUpSuccses");
        profileCard.style.display = "flex";
        let signUpform = document.getElementById("form");
        signUpform.style.display = "none";
        let h3Name = document.getElementById("h3Name");
        h3Name.textContent = `Hello, ${userName}`;
    }

    // Retrieve and display saved income and current balance
    let savedIncome = parseFloat(localStorage.getItem("monthlyIncome"));
    if (!isNaN(savedIncome)) {
        let Income = document.getElementById("Income");
        Income.textContent = `$${savedIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        let totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;
        let currentBalance = document.getElementById("currentBalance");
        currentBalance.textContent = `$${(savedIncome - totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Show both the table and the chart on load
    showTableAndChart();
};

function sendEmail() {
    const name = document.getElementById("name").value; 
    userName = name; 
    localStorage.setItem("userName", userName); 

    const params = {
        name: name,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    const serviceId = "service_mn8krlg";
    const templateId = "template_5zw04oj";

    emailjs.send(serviceId, templateId, params)
    .then(
        res => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            console.log("Sign up success");
            alert("Sign up success!");

            let profileCard = document.getElementById("signUpSuccses");
            profileCard.style.display = "flex";
            let signUpform = document.getElementById("form");
            signUpform.style.display = "none";
            let h3Name = document.getElementById("h3Name");
            h3Name.textContent = `Hello, ${userName}`;
        }
    )
    .catch(error => {
        console.error("Error:", error);
        alert("Failed. Please try again later.");
    });
}

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expenses-table-body");
const totalAmountCell = document.getElementById("total-amount");
let total = document.getElementById("total");  // Added this line to ensure `total` is defined globally

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function updateLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("totalAmount", totalAmount.toString());
}

function renderExpenses() {
    expensesTableBody.innerHTML = ""; 
    expenses.forEach((expense, index) => {
        const newRow = expensesTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        categoryCell.textContent = expense.category;
        amountCell.textContent = `$${expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        dateCell.textContent = expense.date;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            expenses.splice(index, 1);
            totalAmount -= parseFloat(expense.amount);
            updateLocalStorage();
            renderExpenses();
            drawChart(); 
            
            const savedIncome = parseFloat(localStorage.getItem("monthlyIncome")) || 0;
            const currentBalance = document.getElementById("currentBalance");
            currentBalance.textContent = `$${(savedIncome - totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            localStorage.setItem("currentBalance", (savedIncome - totalAmount).toString());

            // Update total amount displayed
            totalAmountCell.textContent = `$${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

            // Update the total displayed in the "total" element
            total.textContent = `$${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        });
        deleteCell.appendChild(deleteBtn);
    });

    totalAmountCell.textContent = `$${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    totalAmountCell.style.color = `red`;

    // Update the total displayed in the "total" element
    total.textContent = `$${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

renderExpenses();

addBtn.addEventListener("click", () => {
    const category = categorySelect.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (category === "") {
        alert("Please select a valid category");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
    if (date === "") {
        alert("Please select a valid date");
        return;
    }

    const newExpense = { category, amount, date };
    expenses.push(newExpense);
    totalAmount += amount;
    
    updateLocalStorage();
    renderExpenses();
    drawChart(); 
    
    const savedIncome = parseFloat(localStorage.getItem("monthlyIncome")) || 0;
    const currentBalance = document.getElementById("currentBalance");
    currentBalance.textContent = `$${(savedIncome - totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    localStorage.setItem("currentBalance", (savedIncome - totalAmount).toString());

    // Update total amount displayed
    totalAmountCell.textContent = `$${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Update the total displayed in the "total" element
    total.textContent = `$${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    amountInput.value = "";
    categorySelect.value = "";
    
});

function drawChart() {
    const chartData = [['Category', 'Amount']];
    expenses.forEach(expense => {
        chartData.push([expense.category, expense.amount]);
    });

    var data = google.visualization.arrayToDataTable(chartData);

    var options = {
        title: 'Expenses by Category'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    setTimeout(function() {
        console.log('Drawing chart with container dimensions:', piechart.offsetWidth, piechart.offsetHeight);
        chart.draw(data, options);
    }, 200); // Increase timeout to ensure the container is fully ready
}

window.addEventListener('resize', drawChart);

function showTableAndChart(){
    piechart.style.display = "flex";
    tableDiv.style.display = "flex";
    drawChart();
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
  document.body.classList.add("modal-open");
}

span.onclick = function() {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
}

function editIncome() {
    let incomeInput = document.getElementById("incomeInput");
    let Income = document.getElementById("Income");

    let monthlyIncome = parseFloat(incomeInput.value); // Convert input value to a number
    if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
        alert("Please enter a valid income amount");
        return;
    }
    
    Income.textContent = `$${monthlyIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Save the monthly income to local storage
    localStorage.setItem("monthlyIncome", monthlyIncome.toString());

    // Close the modal
    modal.style.display = "none";
    document.body.classList.remove("modal-open");

    let totalAmount = parseFloat(total.textContent.replace('$', '').replace(',', '')); // Get total as a number
    let currentBalance = document.getElementById("currentBalance");
    currentBalance.textContent = `$${(monthlyIncome - totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Save the current balance to local storage
    localStorage.setItem("currentBalance", (monthlyIncome - totalAmount).toString());
}
