
import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const { transactions, totalIncome, totalExpenses, profit, isLoading } = useTransactions();

  const { monthlyData, profitTrendData, expenseBreakdown } = useMemo(() => {
    // Group transactions by month for the last 6 months
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        month: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear(),
        key: `${date.getFullYear()}-${date.getMonth()}`,
      };
    }).reverse();

    const monthlyData = last6Months.map(({ month, year, key }) => {
      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.transaction_date);
        return `${tDate.getFullYear()}-${tDate.getMonth()}` === key;
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);
      
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return {
        month,
        income,
        expenses,
        profit: income - expenses,
      };
    });

    // Group by week for profit trend (last 4 weeks)
    const last4Weeks = Array.from({ length: 4 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      return {
        week: `Week ${4 - i}`,
        startDate: new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000)),
        endDate: date,
      };
    });

    const profitTrendData = last4Weeks.map(({ week, startDate, endDate }) => {
      const weekTransactions = transactions.filter(t => {
        const tDate = new Date(t.transaction_date);
        return tDate >= startDate && tDate <= endDate;
      });

      const income = weekTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);
      
      const expenses = weekTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return {
        week,
        profit: income - expenses,
      };
    });

    // Group expenses by category
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
        return acc;
      }, {} as Record<string, number>);

    const colors = ['#F59E0B', '#EA580C', '#6366F1', '#EF4444', '#10B981'];
    const expenseBreakdown = Object.entries(expensesByCategory).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));

    return { monthlyData, profitTrendData, expenseBreakdown };
  }, [transactions]);

  const avgMonthlyProfit = monthlyData.length > 0 
    ? monthlyData.reduce((sum, month) => sum + month.profit, 0) / monthlyData.length 
    : 0;

  const profitGrowth = monthlyData.length >= 2 
    ? ((monthlyData[monthlyData.length - 1].profit - monthlyData[monthlyData.length - 2].profit) / Math.abs(monthlyData[monthlyData.length - 2].profit) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="p-4 pb-20 bg-yellow-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

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
              <p className={`text-2xl font-bold ${profit >= 0 ? 'text-yellow-800' : 'text-orange-800'}`}>
                ${profit.toFixed(2)}
              </p>
            </div>
            {profit >= 0 ? (
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
                ${avgMonthlyProfit.toFixed(2)}
              </p>
            </div>
            <Target className="h-8 w-8 text-orange-700" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-indigo-100 to-indigo-200 border-indigo-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-700">Growth Rate</p>
              <p className="text-2xl font-bold text-indigo-800">
                {isFinite(profitGrowth) ? `${profitGrowth > 0 ? '+' : ''}${profitGrowth.toFixed(1)}%` : '0%'}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-700" />
          </div>
        </Card>
      </div>

      {/* Monthly Performance Chart */}
      {monthlyData.length > 0 && (
        <Card className="p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Bar dataKey="income" fill="#F59E0B" name="Income" />
                <Bar dataKey="expenses" fill="#EA580C" name="Expenses" />
                <Bar dataKey="profit" fill="#6366F1" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Profit Trend */}
      {profitTrendData.length > 0 && (
        <Card className="p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Profit Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Line type="monotone" dataKey="profit" stroke="#F59E0B" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Expense Breakdown */}
      {expenseBreakdown.length > 0 && (
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
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Business Insights */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Business Insights</h3>
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Start adding transactions to see personalized insights!</p>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <p className="font-medium text-indigo-900">Total Transactions</p>
              <p className="text-sm text-indigo-700">You have recorded {transactions.length} transactions so far.</p>
            </div>
            {totalIncome > totalExpenses && (
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-900">Profitable Period</p>
                <p className="text-sm text-yellow-700">Great! Your income exceeds expenses by ${(totalIncome - totalExpenses).toFixed(2)}.</p>
              </div>
            )}
            {expenseBreakdown.length > 0 && (
              <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <p className="font-medium text-orange-900">Top Expense Category</p>
                <p className="text-sm text-orange-700">{expenseBreakdown[0].name} accounts for ${expenseBreakdown[0].value.toFixed(2)} of your expenses.</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
