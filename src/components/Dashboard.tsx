
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Receipt, Mic, Camera } from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';
import { useMemo } from 'react';

const COLORS = ['#F59E0B', '#EF4444', '#10B981', '#8B5CF6', '#06B6D4'];

export const Dashboard = () => {
  const { transactions, totalIncome, totalExpenses, profit, isLoading } = useTransactions();

  const { recentTransactions, categoryData, weeklyData } = useMemo(() => {
    // Get recent transactions (last 5)
    const recentTransactions = transactions.slice(0, 5).map(t => ({
      id: t.id,
      description: t.description,
      amount: Number(t.amount),
      type: t.type,
      category: t.category,
      time: new Date(t.transaction_date).toLocaleDateString(),
    }));

    // Group expenses by category
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
        return acc;
      }, {} as Record<string, number>);

    const categoryData = Object.entries(expensesByCategory).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    }));

    // Group transactions by day for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const weeklyData = last7Days.map(date => {
      const dayTransactions = transactions.filter(t => 
        t.transaction_date.split('T')[0] === date
      );
      
      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);
      
      const expenses = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return {
        name: new Date(date).toLocaleDateString('en', { weekday: 'short' }),
        income,
        expenses,
      };
    });

    return { recentTransactions, categoryData, weeklyData };
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="p-4 pb-20 bg-yellow-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 bg-yellow-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your business overview.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-700">Total Income</p>
              <p className="text-2xl font-bold text-yellow-900">${totalIncome.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-yellow-700" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700">Total Expenses</p>
              <p className="text-2xl font-bold text-orange-900">${totalExpenses.toFixed(2)}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-orange-700" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-indigo-100 to-indigo-200 border-indigo-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-700">Net Profit</p>
              <p className={`text-2xl font-bold ${profit >= 0 ? 'text-indigo-900' : 'text-red-900'}`}>
                ${profit.toFixed(2)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-indigo-700" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-16 flex flex-col gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Mic className="h-5 w-5" />
            <span className="text-sm">Voice Entry</span>
          </Button>
          <Button className="h-16 flex flex-col gap-2 bg-orange-500 hover:bg-orange-600">
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
              <Bar dataKey="income" fill="#F59E0B" name="Income" />
              <Bar dataKey="expenses" fill="#EA580C" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Category Breakdown */}
      {categoryData.length > 0 && (
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
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Recent Transactions */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        {recentTransactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No transactions yet. Start by adding your first transaction!</p>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-yellow-100' : 'bg-orange-100'}`}>
                    <Receipt className={`h-4 w-4 ${transaction.type === 'income' ? 'text-yellow-600' : 'text-orange-600'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {transaction.time}</p>
                  </div>
                </div>
                <p className={`font-semibold ${transaction.type === 'income' ? 'text-yellow-600' : 'text-orange-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
