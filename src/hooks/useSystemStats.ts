import { useEffect } from 'react';
import { useOSStore } from '../store/useOSStore';

export const useSystemStats = () => {
  const setSystemStats = useOSStore((state) => state.setSystemStats);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuations
      const cpu = Math.floor(18 + Math.random() * 12); // 18% - 30%
      const ram = Math.floor(43 + Math.random() * 5);  // 43% - 48%
      
      const upSpeed = (Math.random() * 8.5).toFixed(2);
      const downSpeed = (1.5 + Math.random() * 25.0).toFixed(2);
      
      setSystemStats({
        cpu,
        ram,
        netUp: `${upSpeed} KB/s`,
        netDown: `${downSpeed} KB/s`,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [setSystemStats]);
};
