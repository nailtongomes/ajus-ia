'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AlertCarouselProps {
  children: React.ReactNode[];
}

export default function AlertCarousel({ children }: AlertCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = children.length;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      {/* Desktop: Grid layout */}
      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-6">
        {children}
      </div>

      {/* Mobile/Tablet: Carousel */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden">
          {/* Slides Container */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children.map((child, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                {child}
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-r-xl bg-white/90 p-3 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-l-xl bg-white/90 p-3 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Próximo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots Indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-blue-500 to-indigo-600'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            <span className="text-blue-600">{currentIndex + 1}</span>
            <span className="text-slate-400">/</span>
            <span>{totalSlides}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
