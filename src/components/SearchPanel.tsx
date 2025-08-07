import React, { useState, useRef } from 'react';

interface SearchPanelProps {
  onSearch: (query: string, mediaType: string, dataset: string) => void;
  isLoading: boolean;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [dataset, setDataset] = useState('v3c1');
  const [boundingBox, setBoundingBox] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [boundingBoxes, setBoundingBoxes] = useState<Array<{x: number, y: number, width: number, height: number, object: string}>>([]);
  const [colorGrid, setColorGrid] = useState<string[]>(Array(20).fill('#ffffff')); // 5x4 grid
  const [selectedColor, setSelectedColor] = useState<string>('#800080');
  const [selectedObject, setSelectedObject] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow search even if query is empty - can search by objects, colors, etc.
    onSearch(query.trim(), mediaType, dataset);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setBoundingBox({ x, y, width: 0, height: 0 });
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !boundingBox || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    setBoundingBox({
      ...boundingBox,
      width: currentX - boundingBox.x,
      height: currentY - boundingBox.y
    });
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
    // Save the bounding box if it's valid and object is selected
    if (boundingBox && selectedObject && Math.abs(boundingBox.width) > 10 && Math.abs(boundingBox.height) > 10) {
      const newBox = {
        x: Math.min(boundingBox.x, boundingBox.x + boundingBox.width),
        y: Math.min(boundingBox.y, boundingBox.y + boundingBox.height),
        width: Math.abs(boundingBox.width),
        height: Math.abs(boundingBox.height),
        object: selectedObject
      };
      setBoundingBoxes(prev => [...prev, newBox]);
    }
    setBoundingBox(null);
  };

  const updateColorGrid = (index: number, color: string) => {
    const newGrid = [...colorGrid];
    newGrid[index] = color;
    setColorGrid(newGrid);
  };

  const resetColorGrid = () => {
    setColorGrid(Array(20).fill('#ffffff')); // 5x4 grid
    setSelectedColor('#800080');
  };

  const predefinedColors = [
    '#000000', '#0000FF', '#800000', // Row 1: Black, Blue, Maroon
    '#808080', '#008000', '#FFA500', // Row 2: Gray, Green, Orange  
    '#FFC0CB', '#800080', '#FF0000', // Row 3: Pink, Purple, Red
    '#FFFF00', '#00FFFF', '#F5F5DC'  // Row 4: Yellow, Cyan, Beige
  ];

  const objectTypes = [
    { value: '', label: 'Chọn đối tượng...' },
    { value: 'person', label: 'Người (Person)' },
    { value: 'car', label: 'Xe hơi (Car)' },
    { value: 'cat', label: 'Mèo (Cat)' },
    { value: 'dog', label: 'Chó (Dog)' },
    { value: 'bird', label: 'Chim (Bird)' },
    { value: 'bicycle', label: 'Xe đạp (Bicycle)' },
    { value: 'motorcycle', label: 'Xe máy (Motorcycle)' },
    { value: 'bus', label: 'Xe buýt (Bus)' },
    { value: 'truck', label: 'Xe tải (Truck)' },
    { value: 'boat', label: 'Thuyền (Boat)' },
    { value: 'airplane', label: 'Máy bay (Airplane)' },
    { value: 'chair', label: 'Ghế (Chair)' },
    { value: 'table', label: 'Bàn (Table)' },
    { value: 'book', label: 'Sách (Book)' },
    { value: 'phone', label: 'Điện thoại (Phone)' },
    { value: 'laptop', label: 'Laptop (Laptop)' },
    { value: 'tv', label: 'TV (Television)' },
    { value: 'bottle', label: 'Chai (Bottle)' },
    { value: 'cup', label: 'Cốc (Cup)' }
  ];

  const mediaTypes = [
    { value: 'image', label: 'Hình ảnh', icon: '🖼️' },
    { value: 'video', label: 'Video', icon: '🎥' },
    { value: 'audio', label: 'Âm thanh', icon: '🔊' }
  ];

  const datasets = [
    { value: 'v3c1', label: 'V3C1 Dataset' },
    { value: 'lsc20', label: 'LSC20 Dataset' },
    { value: 'mvk21', label: 'MVK21 Dataset' },
    { value: 'msr-vtt', label: 'MSR-VTT Dataset' }
  ];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Chat Input */}
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung tìm kiếm
          </label>
          <div className="relative">
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập nội dung tìm kiếm"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
              disabled={isLoading}
            />
            <div>
            </div>
          </div>
        </div>

        {/* Media Type Selection - Compact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại phương tiện
          </label>
          <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
            {mediaTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setMediaType(type.value)}
                disabled={isLoading}
                className={`
                  flex-1 flex items-center justify-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-all
                  ${mediaType === type.value
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                  }
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <span className="text-base">{type.icon}</span>
                <span className="hidden sm:inline">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dataset Selection */}
        <div>
          <label htmlFor="dataset" className="block text-sm font-medium text-gray-700 mb-2">
            Dataset
          </label>
          <select
            id="dataset"
            value={dataset}
            onChange={(e) => setDataset(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          >
            {datasets.map((ds) => (
              <option key={ds.value} value={ds.value}>
                {ds.label}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Settings */}
        <div>
          
          {/* Search by Object/Bounding Box - Always visible */}
          <div className="mb-1">
            
            <div className="p-3 bg-gray-50 rounded-lg">
              {/* Object Selection */}
              <div className="mb-3">
                <label htmlFor="objectType" className="block text-sm font-medium text-gray-700 mb-2">
                  Tìm kiếm theo đối tượng
                </label>
                <select
                  id="objectType"
                  value={selectedObject}
                  onChange={(e) => setSelectedObject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {objectTypes.map((obj) => (
                    <option key={obj.value} value={obj.value}>
                      {obj.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Drawing Canvas - Always visible */}
              <div>          
                <div className="relative inline-block">
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={240}
                    className="border-2 border-gray-300 bg-white cursor-crosshair rounded"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(150,150,150,0.4) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(150,150,150,0.4) 1px, transparent 1px)
                      `,
                      backgroundSize: '80px 80px'
                    }}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                  />
                  
                  {/* Render all saved bounding boxes */}
                  {boundingBoxes.map((box, index) => (
                    <div key={index}>
                      <div
                        className="absolute border-2 border-blue-500 pointer-events-none"
                        style={{
                          left: box.x,
                          top: box.y,
                          width: box.width,
                          height: box.height,
                          backgroundColor: 'transparent'
                        }}
                      />
                      <div
                        className="absolute bg-blue-500 text-white text-xs px-2 py-1 rounded pointer-events-none"
                        style={{
                          left: box.x,
                          top: box.y - 25
                        }}
                      >
                        {box.object}
                      </div>
                    </div>
                  ))}
                  
                  {/* Current drawing bounding box */}
                  {boundingBox && (
                    <div
                      className="absolute border-2 border-red-500 pointer-events-none"
                      style={{
                        left: Math.min(boundingBox.x, boundingBox.x + boundingBox.width),
                        top: Math.min(boundingBox.y, boundingBox.y + boundingBox.height),
                        width: Math.abs(boundingBox.width),
                        height: Math.abs(boundingBox.height),
                        backgroundColor: 'transparent'
                      }}
                    />
                  )}
                  
                  {/* Object label for current drawing */}
                  {boundingBox && selectedObject && (
                    <div
                      className="absolute bg-red-500 text-white text-xs px-2 py-1 rounded pointer-events-none"
                      style={{
                        left: Math.min(boundingBox.x, boundingBox.x + boundingBox.width),
                        top: Math.min(boundingBox.y, boundingBox.y + boundingBox.height) - 25
                      }}
                    >
                      {selectedObject}
                    </div>
                  )}
                </div>
                
                <div className="mt-2 space-y-1">
                  {boundingBoxes.length > 0 && (
                    <div className="text-xs text-green-600">
                      ✓ Đã có {boundingBoxes.length} đối tượng: {boundingBoxes.map(box => box.object).join(', ')}
                    </div>
                  )}
                  <div className="flex space-x-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setBoundingBox(null);
                        setBoundingBoxes([]);
                      }}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                    >
                      Xóa tất cả
                    </button>
                    {boundingBoxes.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setBoundingBoxes(prev => prev.slice(0, -1))}
                        className="px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded hover:bg-orange-200"
                      >
                        Xóa cuối
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Grid Search - Always visible */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Tìm kiếm theo vùng màu</h4>
            
            <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
              {/* Control Buttons */}
              <div className="flex space-x-1 mb-3">
                <button
                  type="button"
                  onClick={resetColorGrid}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setColorGrid(Array(20).fill(selectedColor))}
                  className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                >
                  Select All
                </button>
              </div>

              {/* Main Content */}
              <div className="flex space-x-4">
                {/* Color Palette - Left side */}
                <div className="flex-shrink-0">
                  {/* Selected Color Display */}
                  <div 
                    className="w-16 h-16 border-2 border-gray-800 mb-3 rounded"
                    style={{ backgroundColor: selectedColor }}
                  />
                  
                  {/* Color Grid - 4 rows x 3 columns */}
                  <div className="grid grid-cols-3 gap-1">
                    {predefinedColors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 border border-gray-400 cursor-pointer hover:border-gray-600 transition-colors"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setSelectedColor(color);
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 5x4 Grid - Right side with seamless connected borders */}
                <div className="flex-1">
                  <div className="inline-block border-2 border-gray-400 bg-gray-200">
                    {/* Grid without gaps - seamless 5x4 rectangle */}
                    {[...Array(4)].map((_, row) => (
                      <div key={row} className="flex">
                        {[...Array(5)].map((_, col) => {
                          const index = row * 5 + col;
                          return (
                            <div
                              key={index}
                              className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity"
                              style={{ 
                                backgroundColor: colorGrid[index],
                                borderRight: col < 4 ? '1px solid #9CA3AF' : 'none',
                                borderBottom: row < 3 ? '1px solid #9CA3AF' : 'none'
                              }}
                              onClick={() => {
                                updateColorGrid(index, selectedColor);
                              }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Lưới màu 5x4. Chọn màu từ bảng bên trái, click vào ô để tô màu.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Top K Results */}
          <div className="mb-4">
            <label htmlFor="topK" className="block text-sm text-gray-600 mb-2">
              Top-K: <span className="font-medium">80</span>
            </label>
            <input
              type="range"
              id="topK"
              min="10"
              max="100"
              step="10"
              defaultValue="80"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>10</span>
              <span>100</span>
            </div>
          </div>

          {/* Search Options */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span className="text-sm text-gray-600">Tìm kiếm văn bản</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-600">Tìm kiếm OCR</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-600">Tìm kiếm ASR</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-600">Tìm kiếm đối tượng</span>
            </label>
          </div>
        </div>

        {/* Search Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full px-6 py-3 rounded-lg font-medium transition-all
              ${isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200'
              }
            `}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Đang tìm kiếm...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>🔍</span>
                <span>Tìm kiếm</span>
              </div>
            )}
          </button>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <button 
          onClick={() => {
            setQuery('');
            setSelectedObject('');
            setBoundingBox(null);
            setBoundingBoxes([]);
            resetColorGrid();
          }}
          className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
        >
          🔄 Làm lại
        </button>
      </div>
    </div>
  );
};

export default SearchPanel;
