let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

window.onload = function () {
  transactions.forEach(addToUI);
  updateValues();
};

function addTransaction() {
  const text = document.getElementById("text").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (text.trim() === "" || isNaN(amount)) {
    alert("Please enter valid data");
    return;
  }

  const transaction = {
    id: Date.now(),
    text,
    amount,
    type
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  addToUI(transaction);
  updateValues();

  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";
}

function addToUI(transaction) {
  const list = document.getElementById("list");

  const li = document.createElement("li");

  li.innerHTML = `
    ${transaction.text}
    <span class="${transaction.type}">
      ${transaction.type === "income" ? "+" : "-"}₹${transaction.amount}
    </span>
    <button onclick="deleteTransaction(${transaction.id})">X</button>
  `;

  list.appendChild(li);
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  document.getElementById("list").innerHTML = "";
  transactions.forEach(addToUI);

  updateValues();
}

function updateValues() {
  let balance = 0;
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.type === "income") {
      balance += t.amount;
      income += t.amount;
    } else {
      balance -= t.amount;
      expense += t.amount;
    }
  });

  document.getElementById("balance").innerText = `₹${balance}`;
  document.getElementById("income").innerText = `₹${income}`;
  document.getElementById("expense").innerText = `₹${expense}`;
}
