import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useAnalytics = () => {
  const [pageViews, setPageViews] = useLocalStorage('pageViews', {});
  const [visitorCount, setVisitorCount] = useLocalStorage('visitorCount', 0);
  const [dailyVisitors, setDailyVisitors] = useLocalStorage('dailyVisitors', {});

  const trackPageView = (page) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Sayfa görüntülenme sayacı
    setPageViews(prev => ({
      ...prev,
      [page]: (prev[page] || 0) + 1
    }));

    // Günlük ziyaretçi sayacı
    setDailyVisitors(prev => ({
      ...prev,
      [today]: (prev[today] || 0) + 1
    }));

    // Toplam ziyaretçi sayacı (ilk ziyaretçi kontrolü)
    const visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
      localStorage.setItem('visitorId', Math.random().toString(36).substr(2, 9));
      setVisitorCount(prev => prev + 1);
    }
  };

  const getStats = () => {
    const totalPageViews = Object.values(pageViews).reduce((a, b) => a + b, 0);
    const mostViewedPage = Object.entries(pageViews).sort((a, b) => b[1] - a[1])[0];
    
    return {
      totalPageViews,
      totalVisitors: visitorCount,
      mostViewedPage: mostViewedPage ? mostViewedPage[0] : 'Henüz veri yok',
      mostViewedCount: mostViewedPage ? mostViewedPage[1] : 0,
      dailyVisitors
    };
  };

  return { trackPageView, getStats };
};