import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Bell, Shield, Download, Upload, Smartphone } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="p-4 pb-20 bg-yellow-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Customize your app experience</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold">Profile</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="business-name">Business Name</Label>
            <Input id="business-name" placeholder="Your Business Name" defaultValue="Coffee Corner" />
          </div>
          <div>
            <Label htmlFor="owner-name">Owner Name</Label>
            <Input id="owner-name" placeholder="Your Name" defaultValue="John Doe" />
          </div>
          <div>
            <Label htmlFor="currency">Default Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="cad">CAD (C$)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="daily-summary">Daily Summary</Label>
              <p className="text-sm text-gray-600">Get daily income/expense summaries</p>
            </div>
            <Switch id="daily-summary" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="profit-alerts">Profit Alerts</Label>
              <p className="text-sm text-gray-600">Get notified when profit targets are met</p>
            </div>
            <Switch id="profit-alerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="expense-warnings">Expense Warnings</Label>
              <p className="text-sm text-gray-600">Alert when expenses exceed thresholds</p>
            </div>
            <Switch id="expense-warnings" />
          </div>
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-yellow-600" />
          <h3 className="text-lg font-semibold">Data & Privacy</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="offline-mode">Offline Mode</Label>
              <p className="text-sm text-gray-600">Save data locally when offline</p>
            </div>
            <Switch id="offline-mode" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-backup">Auto Backup</Label>
              <p className="text-sm text-gray-600">Automatically backup data to cloud</p>
            </div>
            <Switch id="auto-backup" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="biometric-auth">Biometric Authentication</Label>
              <p className="text-sm text-gray-600">Use fingerprint/face unlock</p>
            </div>
            <Switch id="biometric-auth" />
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Smartphone className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold">Data Management</h3>
        </div>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start border-yellow-300 hover:bg-yellow-100">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" className="w-full justify-start border-yellow-300 hover:bg-yellow-100">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
          <Button variant="outline" className="w-full justify-start text-indigo-600 border-indigo-300 hover:bg-indigo-50">
            <Smartphone className="h-4 w-4 mr-2" />
            Sync Across Devices
          </Button>
        </div>
      </Card>

      {/* Voice & Image Settings */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Voice & Image Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="voice-language">Voice Recognition Language</Label>
            <Select defaultValue="en-us">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-us">English (US)</SelectItem>
                <SelectItem value="en-gb">English (UK)</SelectItem>
                <SelectItem value="es-es">Spanish</SelectItem>
                <SelectItem value="fr-fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-categorize">Auto-Categorize</Label>
              <p className="text-sm text-gray-600">Automatically categorize transactions</p>
            </div>
            <Switch id="auto-categorize" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="receipt-ocr">Receipt OCR</Label>
              <p className="text-sm text-gray-600">Extract data from receipt images</p>
            </div>
            <Switch id="receipt-ocr" defaultChecked />
          </div>
        </div>
      </Card>

      {/* About */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">About</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>ProfitPal v1.0.0</p>
          <p>Built for small business owners</p>
          <p>© 2024 ProfitPal Solutions</p>
        </div>
      </Card>
    </div>
  );
};
