import React, { useState } from 'react';

interface SearchResult {
  id: string;
  type: 'image' | 'video' | 'audio';
  thumbnail: string;
  title: string;
  duration?: string;
  score: number;
}

interface ResultsGridProps {
  results: SearchResult[];
  isLoading: boolean;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, isLoading }) => {
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'audio': return '🔊';
      default: return '📄';
    }
  };

  const formatScore = (score: number) => {
    return (score * 100).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tìm kiếm kết quả...</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">🔍</div>
          <p>Nhập nội dung tìm kiếm để bắt đầu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* Results Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Kết quả tìm kiếm
            </h3>
            <p className="text-gray-600 text-sm">
              Tìm thấy {results.length} kết quả
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              title="Hiển thị dạng lưới"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              title="Hiển thị dạng danh sách"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all transform hover:scale-105 relative group"
              >
                <div className="relative cursor-pointer" onClick={() => setSelectedResult(result)}>
                  <img
                    src={result.thumbnail}
                    alt={result.title}
                    className="w-full h-40 object-cover"
                  />
                  {result.duration && (
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      {result.duration}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {formatScore(result.score)}%
                  </div>
                  
                  {/*Submit Button*/}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Submitting result:', result.id);
                      // Handle submit action here
                    }}
                    className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-all flex items-center space-x-1"
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((result) => (
              <div
                key={result.id}
                className="flex items-center space-x-4 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <img
                  src={result.thumbnail}
                  alt={result.title}
                  className="w-16 h-16 object-cover rounded cursor-pointer"
                  onClick={() => setSelectedResult(result)}
                />
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelectedResult(result)}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm">{getTypeIcon(result.type)}</span>
                    <h4 className="font-medium text-gray-800 text-sm truncate">{result.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500">
                    {result.type} • {formatScore(result.score)}%
                    {result.duration && ` • ${result.duration}`}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-2">
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {formatScore(result.score)}%
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Submitting result:', result.id);
                      // Handle submit action here
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-all flex items-center space-x-1"
                  >
                    <span>📤</span>
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for selected result */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedResult.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {getTypeIcon(selectedResult.type)} {selectedResult.type} • 
                    Độ chính xác: {formatScore(selectedResult.score)}%
                    {selectedResult.duration && ` • ${selectedResult.duration}`}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="text-center">
                {selectedResult.type === 'video' ? (
                  <video
                    src={selectedResult.thumbnail}
                    controls
                    className="max-w-full max-h-96 mx-auto"
                    poster={selectedResult.thumbnail}
                  >
                    Video không thể phát được
                  </video>
                ) : selectedResult.type === 'audio' ? (
                  <div className="p-8">
                    <div className="text-6xl mb-4">🔊</div>
                    <audio
                      src={selectedResult.thumbnail}
                      controls
                      className="mx-auto"
                    >
                      Audio không thể phát được
                    </audio>
                  </div>
                ) : (
                  <img
                    src={selectedResult.thumbnail}
                    alt={selectedResult.title}
                    className="max-w-full max-h-96 mx-auto rounded"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsGrid;
