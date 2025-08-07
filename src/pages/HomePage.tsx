import React, { useState } from 'react';
import SearchPanel from '../components/SearchPanel';
import ResultsGrid from '../components/ResultsGrid';

interface SearchResult {
  id: string;
  type: 'image' | 'video' | 'audio';
  thumbnail: string;
  title: string;
  duration?: string;
  score: number;
}

const HomePage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string, mediaType: string, dataset: string) => {
    setIsLoading(true);
    // Simulate API call with dataset parameter
    console.log(`Searching for "${query}" in ${mediaType} format using ${dataset} dataset`);
    
    setTimeout(() => {
      // Mock results - 80 images using reliable Picsum Photos only
      const mockResults: SearchResult[] = Array.from({ length: 80 }, (_, i) => {
        return {
          id: `result-${i}`,
          type: mediaType as 'image' | 'video' | 'audio',
          thumbnail: `https://picsum.photos/300/200?random=${i + Date.now()}`,
          title: `${mediaType} ${i + 1} - ${query} (${dataset})`,
          duration: mediaType === 'video' || mediaType === 'audio' ? `${Math.floor(Math.random() * 300)}s` : undefined,
          score: Math.random()
        };
      });
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Search and Settings (Fixed) */}
        <div className="w-120 bg-white border-r border-gray-200 flex flex-col">
  
          {/* Search Panel - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <SearchPanel onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>

        {/* Right Panel - Results (Scrollable) */}
        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <ResultsGrid results={searchResults} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
