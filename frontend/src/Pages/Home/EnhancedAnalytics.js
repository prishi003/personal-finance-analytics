import React, { useState, useMemo, useRef, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Scatter, Bar, Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const EnhancedAnalytics = ({ transactions, user }) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
  const [dateRange, setDateRange] = useState({
    from: moment().startOf('month').format('YYYY-MM-DD'),
    to: moment().endOf('month').format('YYYY-MM-DD')
  });

  // Filter transactions by month for scatter chart
  const monthlyTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const transactionMonth = moment(transaction.date).format('YYYY-MM');
      return transactionMonth === selectedMonth && transaction.transactionType === 'expense';
    });
  }, [transactions, selectedMonth]);

  // Prepare scatter chart data for Chart.js
  const scatterData = useMemo(() => {
    const data = monthlyTransactions.map(transaction => ({
      x: moment(transaction.date).date(),
      y: transaction.amount,
      category: transaction.category,
      title: transaction.title
    }));
    
    return {
      datasets: [{
        label: 'Expenses',
        data: data,
        backgroundColor: 'rgba(136, 132, 216, 0.6)',
        borderColor: 'rgba(136, 132, 216, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      }]
    };
  }, [monthlyTransactions]);

  // Prepare monthly expenditures data for Chart.js
  const monthlyExpenditures = useMemo(() => {
    const monthlyData = [];
    const labels = [];
    const year = parseInt(selectedYear);
    
    for (let month = 0; month < 12; month++) {
      const monthTransactions = transactions.filter(transaction => {
        const transactionDate = moment(transaction.date);
        return transactionDate.year() === year && 
               transactionDate.month() === month && 
               transaction.transactionType === 'expense';
      });
      
      const totalAmount = monthTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      
      monthlyData.push(totalAmount);
      labels.push(moment().month(month).format('MMM'));
    }
    
    return {
      labels: labels,
      datasets: [{
        label: 'Monthly Expenses',
        data: monthlyData,
        backgroundColor: 'rgba(0, 196, 159, 0.8)',
        borderColor: 'rgba(0, 196, 159, 1)',
        borderWidth: 1,
      }]
    };
  }, [transactions, selectedYear]);

  // Prepare category expenditures data for Chart.js
  const categoryData = useMemo(() => {
    const filteredTransactions = transactions.filter(transaction => {
      const transactionDate = moment(transaction.date);
      return transactionDate.isBetween(dateRange.from, dateRange.to, 'day', '[]') && 
             transaction.transactionType === 'expense';
    });

    const categoryTotals = {};
    filteredTransactions.forEach(transaction => {
      if (categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] += transaction.amount;
      } else {
        categoryTotals[transaction.category] = transaction.amount;
      }
    });

    const colors = [
      'rgba(0, 136, 254, 0.8)',
      'rgba(0, 196, 159, 0.8)',
      'rgba(255, 187, 40, 0.8)',
      'rgba(255, 128, 66, 0.8)',
      'rgba(136, 132, 216, 0.8)',
      'rgba(130, 202, 157, 0.8)',
      'rgba(255, 198, 88, 0.8)',
      'rgba(255, 124, 124, 0.8)'
    ];
    
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    
    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length).map(color => color.replace('0.8', '1')),
        borderWidth: 2,
      }]
    };
  }, [transactions, dateRange]);

  // Chart.js options
  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const data = context.raw;
            return `₹${data.y} on ${data.x}th - ${data.category}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day of Month'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount (₹)'
        },
        ticks: {
          callback: function(value) {
            return '₹' + value;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return '₹' + context.parsed.y;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return '₹' + value;
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ': ₹' + context.parsed;
          }
        }
      }
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Expenses Scattered Over Days */}
        <Col lg={4} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Expenses scattered over</h5>
              <Form.Select 
                size="sm" 
                className="mt-2"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const month = moment().month(i);
                  return (
                    <option key={i} value={month.format('YYYY-MM')}>
                      Month: {month.format('MMMM YYYY')}
                    </option>
                  );
                })}
              </Form.Select>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Scatter data={scatterData} options={scatterOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Monthly Expenditures */}
        <Col lg={4} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Your monthly expenditures in</h5>
              <Form.Select 
                size="sm" 
                className="mt-2"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {Array.from({ length: 5 }, (_, i) => {
                  const year = moment().year() - i;
                  return (
                    <option key={i} value={year}>
                      Year: {year}
                    </option>
                  );
                })}
              </Form.Select>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Bar data={monthlyExpenditures} options={barOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Expenditures per Category */}
        <Col lg={4} md={12} className="mb-4">
          <Card className="h-100">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Expenditures per category</h5>
              <Row className="mt-2">
                <Col>
                  <Form.Control
                    size="sm"
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                  />
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                  />
                </Col>
                <Col>
                  <Button size="sm" variant="outline-light">GO</Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Doughnut data={categoryData} options={doughnutOptions} />
              </div>
              <div className="text-center mt-2">
                <small className="text-muted">Spent per category</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mt-4">
        <Col md={3} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <h6 className="card-title">Total Transactions</h6>
              <h4 className="text-primary">{transactions.length}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <h6 className="card-title">Total Income</h6>
              <h4 className="text-success">
                <CurrencyRupeeIcon />
                {transactions
                  .filter(t => t.transactionType === 'credit')
                  .reduce((sum, t) => sum + t.amount, 0)
                }
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <h6 className="card-title">Total Expenses</h6>
              <h4 className="text-danger">
                <CurrencyRupeeIcon />
                {transactions
                  .filter(t => t.transactionType === 'expense')
                  .reduce((sum, t) => sum + t.amount, 0)
                }
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <h6 className="card-title">Net Balance</h6>
              <h4 className={
                transactions
                  .filter(t => t.transactionType === 'credit')
                  .reduce((sum, t) => sum + t.amount, 0) -
                transactions
                  .filter(t => t.transactionType === 'expense')
                  .reduce((sum, t) => sum + t.amount, 0) >= 0 ? 'text-success' : 'text-danger'
              }>
                <CurrencyRupeeIcon />
                {transactions
                  .filter(t => t.transactionType === 'credit')
                  .reduce((sum, t) => sum + t.amount, 0) -
                transactions
                  .filter(t => t.transactionType === 'expense')
                  .reduce((sum, t) => sum + t.amount, 0)
                }
              </h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EnhancedAnalytics;


