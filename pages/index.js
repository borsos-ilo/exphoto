import React, { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const [grid, setGrid] = useState([]);
  const [counter, setCounter] = useState({ count: 0, percentage: 0 });

  const folders = ['isti', 'ilo'];
  const imageCount = 25;

  const getRandomImage = useCallback(() => {
    const randomFolder = folders[Math.floor(Math.random() * folders.length)];
    return `images/${randomFolder}`;
  }, []); // Empty dependency array as folders is not changing

  const generateGrid = useCallback(() => {
    let newGrid = [];
    let iloCount = 0;

    for (let i = 1; i <= imageCount; i++) {
      const path = getRandomImage();
      newGrid.push({ path, number: i });
      if (path.includes('ilo')) {
        iloCount++;
      }
    }

    setGrid(newGrid);
    setCounter({
      count: iloCount,
      percentage: ((iloCount / imageCount) * 100).toFixed(0)
    });
  }, [getRandomImage]); // Remove imageCount from dependencies as it's constant

  useEffect(() => {
    generateGrid();
  }, []); // Empty dependency array to run only on mount

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-orbitron text-4xl my-10'>
        Random face generator
      </h1>
      <div className="grid grid-cols-5 gap-1 p-1 mb-5">
        {grid.map((item, index) => (
          <div
            key={index}
            className="w-12 h-12 md:w-24 md:h-24 bg-cover bg-center"
            style={{ backgroundImage: `url('${item.path}/${item.number}.jpg')` }}
          />
        ))}
      </div>
      <button
        onClick={generateGrid}
        className="px-5 py-2 text-base bg-gradient-to-r from-teal-400 to-blue-500 cursor-pointer bg-blue-500 w-25 text-white font-body rounded-lg rounded"
      >
        Generate
      </button>
      <div className="grid grid-cols-2 w-1/2">
        <div className="mt-5 text-lg text-center font-inconsolata">
          Ilona: {counter.count} ({counter.percentage}%)
        </div>
        <div className="mt-5 text-lg text-center font-inconsolata">
          Isti: {imageCount - counter.count} ({100 - counter.percentage}%)    
        </div>
      </div>
      <div className="w-1/3 h-6 bg-[#4B878B] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#921416] rounded-full"
          style={{ width: `${counter.percentage}%` }}
        ></div>
      </div>
    </div>
  );
}