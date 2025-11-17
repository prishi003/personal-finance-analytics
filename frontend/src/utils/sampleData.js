import moment from 'moment';

// Sample data generator for testing the enhanced analytics charts
export const generateSampleTransactions = (userId) => {
  const categories = [
    "Groceries", "Rent", "Salary", "Tip", "Food", 
    "Medical", "Utilities", "Entertainment", "Transportation", "Other"
  ];
  
  const transactionTypes = ["credit", "expense"];
  const sampleTitles = {
    "Groceries": ["Weekly Groceries", "Vegetables", "Dairy Products", "Rice & Lentils"],
    "Rent": ["Monthly Rent", "House Rent"],
    "Salary": ["Monthly Salary", "Freelance Payment", "Bonus"],
    "Tip": ["Restaurant Tip", "Delivery Tip"],
    "Food": ["Lunch", "Dinner", "Snacks", "Coffee"],
    "Medical": ["Doctor Visit", "Medicine", "Health Checkup"],
    "Utilities": ["Electricity Bill", "Water Bill", "Internet Bill", "Gas Bill"],
    "Entertainment": ["Movie Ticket", "Netflix Subscription", "Concert"],
    "Transportation": ["Petrol", "Bus Fare", "Uber Ride", "Metro Card"],
    "Other": ["Shopping", "Gift", "Miscellaneous"]
  };

  const transactions = [];
  const startDate = moment().subtract(6, 'months');
  const endDate = moment();

  // Generate transactions for the last 6 months
  for (let i = 0; i < 150; i++) {
    const randomDate = moment(startDate).add(Math.random() * endDate.diff(startDate, 'days'), 'days');
    const category = categories[Math.floor(Math.random() * categories.length)];
    const transactionType = category === "Salary" ? "credit" : 
                           Math.random() > 0.7 ? "credit" : "expense";
    const title = sampleTitles[category][Math.floor(Math.random() * sampleTitles[category].length)];
    
    let amount;
    if (transactionType === "credit") {
      // Income amounts (higher)
      amount = Math.floor(Math.random() * 50000) + 10000; // ₹10,000 to ₹60,000
    } else {
      // Expense amounts (lower)
      switch (category) {
        case "Rent":
          amount = Math.floor(Math.random() * 20000) + 15000; // ₹15,000 to ₹35,000
          break;
        case "Groceries":
          amount = Math.floor(Math.random() * 5000) + 1000; // ₹1,000 to ₹6,000
          break;
        case "Utilities":
          amount = Math.floor(Math.random() * 3000) + 500; // ₹500 to ₹3,500
          break;
        case "Food":
          amount = Math.floor(Math.random() * 1000) + 100; // ₹100 to ₹1,100
          break;
        case "Transportation":
          amount = Math.floor(Math.random() * 2000) + 200; // ₹200 to ₹2,200
          break;
        default:
          amount = Math.floor(Math.random() * 2000) + 100; // ₹100 to ₹2,100
      }
    }

    transactions.push({
      _id: `sample_${i}`,
      title,
      amount,
      description: `Sample ${transactionType} transaction`,
      category,
      date: randomDate.format('YYYY-MM-DD'),
      transactionType,
      userId
    });
  }

  return transactions.sort((a, b) => moment(b.date).diff(moment(a.date)));
};

// Function to add sample data to existing transactions (for testing)
export const addSampleData = (existingTransactions, userId) => {
  const sampleTransactions = generateSampleTransactions(userId);
  return [...existingTransactions, ...sampleTransactions];
};


