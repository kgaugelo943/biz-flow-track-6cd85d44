
import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { AddTransaction } from '@/components/AddTransaction';
import { Analytics } from '@/components/Analytics';
import { Settings } from '@/components/Settings';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'add':
        return <AddTransaction onBack={() => setActiveTab('dashboard')} />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 overflow-auto">
        {renderActiveComponent()}
      </div>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
