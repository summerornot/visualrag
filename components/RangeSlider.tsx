'use client';

import { useState } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

export default function RangeSlider({ min, max, step, value, onChange, label }: RangeSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {label && <span className="text-sm font-medium text-base-content/70">{label}</span>}
        <span className="text-sm font-bold text-primary">{value}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="range-slider w-full h-2 bg-base-300 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-base-300) ${percentage}%, var(--color-base-300) 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-base-content/50">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
