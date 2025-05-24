
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, Target } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', income: 4000, expenses: 2400, profit: 1600 },
  { month: 'Feb', income: 3000, expenses: 1398, profit: 1602 },
  { month: 'Mar', income: 2000, expenses: 9800, profit: -7800 },
  { month: 'Apr', income: 2780, expenses: 3908, profit: -1128 },
  { month: 'May', income: 1890, expenses: 4800, profit: -2910 },
  { month: 'Jun', income: 2390, expenses: 3800, profit: -1410 },
];

const profitTrendData = [
  { week: 'Week 1', profit: 1200 },
  { week: 'Week 2', profit: 1800 },
  { week: 'Week 3', profit: 900 },
  { week: 'Week 4', profit: 2100 },
];

const expenseBreakdown = [
  { name: 'Supplies', value: 2400, color: '#F59E0B' },
  { name: 'Transportation', value: 1398, color: '#EA580C' },
  { name: 'Marketing', value: 800, color: '#6366F1' },
  { name: 'Rent', value: 1200, color: '#EF4444' },
  { name: 'Utilities', value: 400, color: '#10B981' },
];

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  const totalProfit = monthlyData.reduce((sum, month) => sum + month.profit, 0);
  const avgMonthlyProfit = totalProfit / monthlyData.length;
  const profitGrowth = 12.5; // percentage

  return (
    <div className="p-4 pb-20 bg-yellow-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Insights into your business performance</p>
      </div>

      {/* Time Range Selector */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-gray-600" />
          <span className="font-medium">Time Range:</span>
          <div className="flex gap-2">
            {['daily', 'weekly', 'monthly'].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={`capitalize ${timeRange === range ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-700">Total Profit</p>
              <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-yellow-800' : 'text-orange-800'}`}>
                ${totalProfit.toFixed(0)}
              </p>
            </div>
            {totalProfit >= 0 ? (
              <TrendingUp className="h-8 w-8 text-yellow-700" />
            ) : (
              <TrendingDown className="h-8 w-8 text-orange-700" />
            )}
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700">Avg Monthly Profit</p>
              <p className={`text-2xl font-bold ${avgMonthlyProfit >= 0 ? 'text-orange-800' : 'text-red-800'}`}>
                ${avgMonthlyProfit.toFixed(0)}
              </p>
            </div>
            <Target className="h-8 w-8 text-orange-700" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-indigo-100 to-indigo-200 border-indigo-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-700">Growth Rate</p>
              <p className="text-2xl font-bold text-indigo-800">+{profitGrowth}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-700" />
          </div>
        </Card>
      </div>

      {/* Monthly Profit/Loss Chart */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#F59E0B" name="Income" />
              <Bar dataKey="expenses" fill="#EA580C" name="Expenses" />
              <Bar dataKey="profit" fill="#6366F1" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Profit Trend */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Profit Trend</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="profit" stroke="#F59E0B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Expense Breakdown */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Business Insights */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Business Insights</h3>
        <div className="space-y-4">
          <div className="p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
            <p className="font-medium text-indigo-900">Revenue Opportunity</p>
            <p className="text-sm text-indigo-700">Your best performing month was February. Consider analyzing what worked well that month.</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <p className="font-medium text-orange-900">Cost Management</p>
            <p className="text-sm text-orange-700">Supplies account for 38% of your expenses. Look for bulk purchasing opportunities.</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <p className="font-medium text-yellow-900">Growth Trend</p>
            <p className="text-sm text-yellow-700">Your profit margin has improved by 12.5% compared to last quarter.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
