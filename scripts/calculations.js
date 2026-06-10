let budgetValue = 0;
let totalExpensesValue = 0;
let balanceColor = "green";

const expenseEntries = [
  ["groceries", 33],
  ["restaurants", 50],
  ["transport", 12],
  ["home", 70],
  ["subscriptions", 14],
  ["groceries", 28],
  ["subscriptions", 12],
];

for (const expense of expenseEntries) {
  totalExpensesValue += expense[1];
}

function calculateAverageExpense() {
  if (expenseEntries.length === 0) {
    return 0;
  }

  return totalExpensesValue / expenseEntries.length;
}

function calculateBalance() {
  return budgetValue - totalExpensesValue;
}

function updateBalanceColor() {
  const balance = calculateBalance();

  if (balance < 0) {
    balanceColor = "red";
  } else if (budgetValue > 0 && balance < budgetValue * 0.25) {
    balanceColor = "orange";
  } else {
    balanceColor = "green";
  }
}

function calculateCategoryExpenses(category) {
  let categoryTotal = 0;

  for (const expense of expenseEntries) {
    if (expense[0] === category) {
      categoryTotal += expense[1];
    }
  }

  return categoryTotal;
}

function calculateLargestCategory() {
  const categories = [
    "groceries",
    "restaurants",
    "transport",
    "home",
    "subscriptions",
  ];
  const categoriesData = [];

  for (const category of categories) {
    categoriesData.push([category, calculateCategoryExpenses(category)]);
  }

  let largestCategory = categoriesData[0][0];
  let largestCategoryValue = categoriesData[0][1];

  for (const categoryData of categoriesData) {
    if (categoryData[1] > largestCategoryValue) {
      largestCategory = categoryData[0];
      largestCategoryValue = categoryData[1];
    }
  }

  return largestCategory;
}

function addExpenseEntry(values) {
  expenseEntries.push(values);
  totalExpensesValue += values[1];
}
