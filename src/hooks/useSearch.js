import { useState, useMemo } from 'react';

export const useSearch = (items, searchFields) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;

    return items.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        if (value && typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (Array.isArray(value)) {
          return value.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return false;
      });
    });
  }, [items, searchTerm, searchFields]);

  return { searchTerm, setSearchTerm, filteredItems };
};