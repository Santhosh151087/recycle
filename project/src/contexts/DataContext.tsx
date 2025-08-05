import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WasteEntry {
  id: string;
  date: string;
  category: 'recyclable' | 'compostable' | 'landfill';
  item: string;
  weight: number;
  points: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  endDate: string;
  participants: number;
  reward: string;
}

interface DataContextType {
  wasteEntries: WasteEntry[];
  challenges: Challenge[];
  addWasteEntry: (entry: Omit<WasteEntry, 'id'>) => void;
  getAnalytics: () => any;
  joinChallenge: (challengeId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Zero Waste Week',
      description: 'Reduce landfill waste to less than 1kg this week',
      target: 1,
      current: 0.7,
      endDate: '2025-01-25',
      participants: 127,
      reward: '50 points + Green Hero badge'
    },
    {
      id: '2',
      title: 'Recycling Champion',
      description: 'Recycle 10kg of materials this month',
      target: 10,
      current: 6.5,
      endDate: '2025-01-31',
      participants: 89,
      reward: '100 points + Recycling Champion badge'
    },
    {
      id: '3',
      title: 'Compost Community',
      description: 'Compost 5kg of organic waste this week',
      target: 5,
      current: 3.2,
      endDate: '2025-01-25',
      participants: 64,
      reward: '75 points + Compost Master badge'
    }
  ]);

  useEffect(() => {
    // Load stored data
    const stored = localStorage.getItem('wasteEntries');
    if (stored) {
      setWasteEntries(JSON.parse(stored));
    } else {
      // Generate mock data for the last 30 days
      const mockEntries: WasteEntry[] = [];
      const categories: ('recyclable' | 'compostable' | 'landfill')[] = ['recyclable', 'compostable', 'landfill'];
      const items = {
        recyclable: ['Plastic bottle', 'Aluminum can', 'Paper', 'Cardboard', 'Glass jar'],
        compostable: ['Food scraps', 'Coffee grounds', 'Banana peel', 'Vegetables', 'Eggshells'],
        landfill: ['Chip bag', 'Styrofoam', 'Broken glass', 'Disposable utensils', 'Cigarette butts']
      };

      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Add 1-3 entries per day
        const entriesPerDay = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < entriesPerDay; j++) {
          const category = categories[Math.floor(Math.random() * categories.length)];
          const item = items[category][Math.floor(Math.random() * items[category].length)];
          const weight = Math.random() * 2 + 0.1; // 0.1 to 2.1 kg
          
          mockEntries.push({
            id: `${i}-${j}`,
            date: date.toISOString().split('T')[0],
            category,
            item,
            weight: Math.round(weight * 100) / 100,
            points: category === 'recyclable' ? 10 : category === 'compostable' ? 8 : 2
          });
        }
      }
      
      setWasteEntries(mockEntries);
      localStorage.setItem('wasteEntries', JSON.stringify(mockEntries));
    }
  }, []);

  const addWasteEntry = (entry: Omit<WasteEntry, 'id'>) => {
    const newEntry: WasteEntry = {
      ...entry,
      id: Date.now().toString()
    };
    
    const updatedEntries = [newEntry, ...wasteEntries];
    setWasteEntries(updatedEntries);
    localStorage.setItem('wasteEntries', JSON.stringify(updatedEntries));
  };

  const getAnalytics = () => {
    const last7Days = wasteEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });

    const last30Days = wasteEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      return entryDate >= monthAgo;
    });

    const categoryTotals = wasteEntries.reduce((acc, entry) => {
      acc[entry.category] = (acc[entry.category] || 0) + entry.weight;
      return acc;
    }, {} as Record<string, number>);

    const dailyData = last7Days.reduce((acc, entry) => {
      const date = entry.date;
      if (!acc[date]) {
        acc[date] = { date, recyclable: 0, compostable: 0, landfill: 0 };
      }
      acc[date][entry.category] += entry.weight;
      return acc;
    }, {} as Record<string, any>);

    return {
      totalWeight: wasteEntries.reduce((sum, entry) => sum + entry.weight, 0),
      totalEntries: wasteEntries.length,
      categoryTotals,
      dailyData: Object.values(dailyData),
      last7Days: last7Days.reduce((sum, entry) => sum + entry.weight, 0),
      last30Days: last30Days.reduce((sum, entry) => sum + entry.weight, 0)
    };
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, participants: challenge.participants + 1 }
        : challenge
    ));
  };

  return (
    <DataContext.Provider value={{
      wasteEntries,
      challenges,
      addWasteEntry,
      getAnalytics,
      joinChallenge
    }}>
      {children}
    </DataContext.Provider>
  );
};