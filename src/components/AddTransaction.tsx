
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUp, Mic, Camera, Upload, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddTransactionProps {
  onBack: () => void;
}

export const AddTransaction = ({ onBack }: AddTransactionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const { toast } = useToast();

  const categories = {
    income: ['Sales', 'Services', 'Consulting', 'Other Income'],
    expense: ['Supplies', 'Transportation', 'Marketing', 'Rent', 'Utilities', 'Other Expense']
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setDescription('Coffee sales to customer');
      setAmount('25');
      setCategory('Sales');
      toast({
        title: "Voice input processed",
        description: "Transaction details extracted from voice.",
      });
    }, 2000);
  };

  const handleImageUpload = () => {
    // Simulate OCR processing
    toast({
      title: "Receipt processing",
      description: "Extracting data from receipt image...",
    });
    
    setTimeout(() => {
      setDescription('Office supplies from Staples');
      setAmount('45.99');
      setCategory('Supplies');
      setType('expense');
      toast({
        title: "Receipt processed",
        description: "Transaction details extracted successfully.",
      });
    }, 3000);
  };

  const handleSubmit = () => {
    if (!amount || !description || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Transaction saved",
      description: `${type === 'income' ? 'Income' : 'Expense'} of $${amount} recorded successfully.`,
    });

    // Reset form
    setAmount('');
    setDescription('');
    setCategory('');
    onBack();
  };

  return (
    <div className="p-4 pb-20 bg-yellow-50 min-h-screen">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Transaction</h1>
        <p className="text-gray-600">Record your income or expense</p>
      </div>

      {/* Quick Input Methods */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Quick Input</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            onClick={handleVoiceInput}
            disabled={isListening}
            className="h-20 flex flex-col gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Mic className={`h-6 w-6 ${isListening ? 'animate-pulse' : ''}`} />
            <span className="text-sm">
              {isListening ? 'Listening...' : 'Voice Input'}
            </span>
          </Button>
          
          <Button 
            onClick={handleImageUpload}
            className="h-20 flex flex-col gap-2 bg-orange-500 hover:bg-orange-600"
          >
            <Camera className="h-6 w-6" />
            <span className="text-sm">Scan Receipt</span>
          </Button>
          
          <Button 
            className="h-20 flex flex-col gap-2 bg-yellow-500 hover:bg-yellow-600"
          >
            <Upload className="h-6 w-6" />
            <span className="text-sm">Upload Image</span>
          </Button>
        </div>
      </Card>

      {/* Transaction Type */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Transaction Type</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setType('income')}
            variant={type === 'income' ? 'default' : 'outline'}
            className={`h-16 flex flex-col gap-2 ${type === 'income' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
          >
            <ArrowUp className="h-5 w-5" />
            <span>Income</span>
          </Button>
          <Button
            onClick={() => setType('expense')}
            variant={type === 'expense' ? 'default' : 'outline'}
            className={`h-16 flex flex-col gap-2 ${type === 'expense' ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
          >
            <ArrowDown className="h-5 w-5" />
            <span>Expense</span>
          </Button>
        </div>
      </Card>

      {/* Manual Entry Form */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="What was this transaction for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories[type].map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit}
        className="w-full h-12 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
        size="lg"
      >
        Save Transaction
      </Button>
    </div>
  );
};
