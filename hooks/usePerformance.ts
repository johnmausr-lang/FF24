"use client";
import { useState, useEffect } from "react";

export const usePerformance = () => {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Проверка: мобильное устройство или медленное соединение
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isSlowConn = (navigator as any).connection?.saveData || 
                       ['slow-2g', '2g', '3g'].includes((navigator as any).connection?.effectiveType);
    
    // Если устройство старое или включен режим экономии данных
    if (isMobile && (isSlowConn || window.innerWidth < 768)) {
      setIsLowPower(true);
    }
  }, []);

  return { isLowPower };
};
