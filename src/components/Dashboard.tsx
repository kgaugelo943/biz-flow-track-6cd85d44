
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Receipt, Mic, Camera } from 'lucide-react';

const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#06B6D4'];

const recentTransactions = [
  { id: 1, description: 'Coffee sales', amount: 150, type: 'income', category: 'Sales', time: '2 hours ago' },
  { id: 2, description: 'Office supplies', amount: -45, type: 'expense', category: 'Supplies', time: '4 hours ago' },
  { id: 3, description: 'Catering order', amount: 300, type: 'income', category: 'Sales', time: '1 day ago' },
  { id: 4, description: 'Gas for delivery', amount: -35, type: 'expense', category: 'Transportation', time: '1 day ago' },
];

const categoryData = [
  { name: 'Sales', value: 2450, color: '#10B981' },
  { name: 'Supplies', value: 890, color: '#EF4444' },
  { name: 'Transportation', value: 245, color: '#F59E0B' },
  { name: 'Marketing', value: 150, color: '#8B5CF6' },
];

const weeklyData = [
  { name: 'Mon', income: 400, expenses: 240 },
  { name: 'Tue', income: 300, expenses: 139 },
  { name: 'Wed', income: 200, expenses: 980 },
  { name: 'Thu', income: 278, expenses: 390 },
  { name: 'Fri', income: 189, expenses: 480 },
  { name: 'Sat', income: 239, expenses: 380 },
  { name: 'Sun', income: 349, expenses: 430 },
];

export const Dashboard = () => {
  const totalIncome = 3250;
  const totalExpenses = 1890;
  const profit = totalIncome - totalExpenses;

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your business overview.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Income</p>
              <p className="text-2xl font-bold text-green-900">${totalIncome}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-900">${totalExpenses}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Net Profit</p>
              <p className="text-2xl font-bold text-blue-900">${profit}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-16 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700">
            <Mic className="h-5 w-5" />
            <span className="text-sm">Voice Entry</span>
          </Button>
          <Button className="h-16 flex flex-col gap-2 bg-green-600 hover:bg-green-700">
            <Camera className="h-5 w-5" />
            <span className="text-sm">Scan Receipt</span>
          </Button>
        </div>
      </Card>

      {/* Weekly Overview Chart */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#10B981" name="Income" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Expense Categories</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <Receipt className={`h-4 w-4 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.category} • {transaction.time}</p>
                </div>
              </div>
              <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
