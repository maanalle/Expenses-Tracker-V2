document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('expense-form');
  const categoryInput = document.getElementById('category');
  const amountInput = document.getElementById('amount');
  const dateInput = document.getElementById('date');
  const expenseTableBody = document.querySelector('#expense-table tbody');
  const totalExpensesDiv = document.getElementById('total-expenses');

  // Load expenses from localStorage
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  console.log('Loaded expenses:', expenses);
  expenses.forEach(addExpenseToTable);
  updateTotalExpenses();

  // Event listener for the form submission
  form.addEventListener('submit', function (event) {
      event.preventDefault();
      
      const category = categoryInput.value;
      const amount = parseFloat(amountInput.value);
      const date = dateInput.value;

      const expense = { category, amount, date };
      expenses.push(expense);
      
      addExpenseToTable(expense);
      updateTotalExpenses();
      saveExpensesToLocalStorage();

      // Clear form inputs
      categoryInput.value = '';
      amountInput.value = '';
      dateInput.value = '';
  });

  // Function to add an expense to the table
  function addExpenseToTable(expense) {
      const row = document.createElement('tr');
      
      row.innerHTML = `
          <td>${expense.category}</td>
          <td>$${expense.amount.toFixed(2)}</td>
          <td>${expense.date}</td>
          <td><button class="delete-btn">Delete</button></td>
      `;
      
      expenseTableBody.appendChild(row);

      const deleteButton = row.querySelector('.delete-btn');
      deleteButton.addEventListener('click', function () {
          expenseTableBody.removeChild(row);
          expenses = expenses.filter(e => e !== expense);
          updateTotalExpenses();
          saveExpensesToLocalStorage();
      });
  }

  // Function to update the total expenses
  function updateTotalExpenses() {
      const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      totalExpensesDiv.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Function to save expenses to localStorage
  function saveExpensesToLocalStorage() {
      localStorage.setItem('expenses', JSON.stringify(expenses));
      console.log('Saved expenses:', expenses);
  }
});
