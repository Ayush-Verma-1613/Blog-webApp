'use client'
import { Card } from 'antd';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const Blog = ({data}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState('all'); // 'all', 'a-e', 'f-j', 'k-o', 'p-t', 'u-z'
  
  const CARDS_PER_PAGE = 15; // 5 cards per row × 3 rows

  // Sort data based on selected filter
  const sortedData = useMemo(() => {
    if (sortBy === 'all') return data;
    
    const ranges = {
      'a-e': ['a', 'b', 'c', 'd', 'e'],
      'f-j': ['f', 'g', 'h', 'i', 'j'],
      'k-o': ['k', 'l', 'm', 'n', 'o'],
      'p-t': ['p', 'q', 'r', 's', 't'],
      'u-z': ['u', 'v', 'w', 'x', 'y', 'z']
    };

    return data.filter(item => {
      const firstLetter = item.title.charAt(0).toLowerCase();
      return ranges[sortBy]?.includes(firstLetter);
    });
  }, [data, sortBy]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedData.length / CARDS_PER_PAGE);

  // Get current page data
  const currentData = sortedData.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  );

  // Navigation handlers
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  // Reset to first page when sort changes
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(0);
  };

  return(
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6 pb-24">
      {/* Header with Sorting */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        
        {/* Sorting Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSortChange('all')}
            className={`px-3 md:px-4 py-2 rounded-lg border font-medium text-sm md:text-base ${
              sortBy === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All
          </button>

          <button
            onClick={() => handleSortChange('a-e')}
            className={`px-3 md:px-4 py-2 rounded-lg border font-medium text-sm md:text-base ${
              sortBy === 'a-e'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            A-E
          </button>

          <button
            onClick={() => handleSortChange('f-j')}
            className={`px-3 md:px-4 py-2 rounded-lg border font-medium text-sm md:text-base ${
              sortBy === 'f-j'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            F-J
          </button>

          <button
            onClick={() => handleSortChange('k-o')}
            className={`px-3 md:px-4 py-2 rounded-lg border font-medium text-sm md:text-base ${
              sortBy === 'k-o'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            K-O
          </button>

          <button
            onClick={() => handleSortChange('p-t')}
            className={`px-3 md:px-4 py-2 rounded-lg border font-medium text-sm md:text-base ${
              sortBy === 'p-t'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            P-T
          </button>

          <button
            onClick={() => handleSortChange('u-z')}
            className={`px-3 md:px-4 py-2 rounded-lg border font-medium text-sm md:text-base ${
              sortBy === 'u-z'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            U-Z
          </button>
        </div>
      </div>

      {/* Blog Cards Grid - Mobile: 2 columns, Laptop: 5 columns */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
        {currentData.length > 0 ? (
          currentData.map((item, index) => (
            <Link 
              key={index} 
              href={`/blog/${item.title.split(" ").join("-")}`}
              className="block"
            >
              <Card
                hoverable
                className="h-full flex flex-col overflow-hidden"
                cover={
                  item.image ? (
                    <div className="w-full h-40 md:h-56 overflow-hidden rounded-t-xl md:rounded-t-2xl flex items-center justify-center bg-gray-100">
                      <img
                        alt={item.title}
                        src={item.image}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 md:h-56 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-xs md:text-base">No Image</span>
                    </div>
                  )
                }
              >
                <div className="flex items-start justify-between gap-1 md:gap-2">
                  {/* Show truncated title on mobile, full title on laptop */}
                  <h3 className="text-xs md:text-base font-semibold text-gray-900 flex-1">
                    <span className="md:hidden">{item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}</span>
                    <span className="hidden md:block line-clamp-2">{item.title}</span>
                  </h3>
                  <ArrowRight className="w-3 h-3 md:w-5 md:h-5 text-gray-400 flex-shrink-0 mt-1" />
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-2 md:col-span-5 text-center py-12 text-gray-500">
            No blogs found for this filter
          </div>
        )}
      </div>

      {/* Fixed Pagination Bottom Right */}
      <div className="fixed bottom-25 right-6 flex items-center gap-3 bg-white shadow-xl rounded-full px-4 py-3 border border-gray-200 z-50">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className={`p-2 rounded-full transition-all ${
            currentPage === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-sm font-medium text-gray-700 min-w-[80px] text-center">
          {currentPage + 1} / {totalPages || 1}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages - 1}
          className={`p-2 rounded-full transition-all ${
            currentPage >= totalPages - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default Blog;