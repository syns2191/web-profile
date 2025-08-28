'use client';

import React, { useState } from 'react';
import { useTheme } from './theme-provider';

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme();
  const [selected, setSelected] = useState({name: 'Default'})

  const themes = [
    // { name: 'Default', value: 'default', colors: { primary: '#4F46E5', accent: '#EC4899' } },
    // { name: 'Ocean', value: 'ocean', colors: { primary: '#1E3A8A', accent: '#3B82F6' } },
    // { name: 'Forest', value: 'forest', colors: { primary: '#065F46', accent: '#10B981' } },
    // { name: 'Sunset', value: 'sunset', colors: { primary: '#9A3412', accent: '#F59E0B' } },
    // { name: 'Newspaper', value: 'newspaper', colors: { primary: '#f8f4e9', accent: '#333333' } },
    { name: 'Dracula', value: 'dracula', colors: { primary: '#282a36', accent: '#bd93f9' } },
    { name: 'Monokai', value: 'monokai', colors: { primary: '#272822', accent: '#f92672' } },
    { name: 'Solarized Osaka', value: 'solarized-osaka', colors: { primary: '#002b36', accent: '#2aa198' } },
    { name: 'JetBrains Darcula', value: 'jetbrains-darcula', colors: { primary: '#2b2b2b', accent: '#cc7832' } },
  ];

  return (
     <div className="flex items-center justify-center text-white p-4">
      <div className=" p-8 rounded-2xl w-full max-w-xl">
        {/* Title for the theme selection section. */}
        {/* Container for the theme options, using flexbox for horizontal layout. */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {themes.map((theme) => (
            // Individual theme item, which is a clickable div.
            <div
              key={theme.name}
              onClick={() => {
                setTheme(theme.value);
                setSelected(theme);
              }}
              className={`
                relative p-2 w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200 ease-in-out
                ${selected.name === theme.name ? 'bg-[var(--color-primary-dark)] ring-2 ring-[var(--color-primary-medium)] ring-offset-2 ring-offset-[var(--color-primary-medium)]' : 'hover:bg-slate-200'}
              `}
            >
              {/* Outer container for the two color circles. */}
              <div className="relative w-8 h-8">
                {/* First color circle. */}
                <div className={`absolute top-0 left-0 w-6 h-6 rounded-full`} style={{backgroundColor: theme.colors.primary}}></div>
                {/* Second color circle, slightly offset. */}
                <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full`} style={{backgroundColor: theme.colors.accent}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



