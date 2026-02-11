'use client';

import { useEffect, useCallback, useRef } from 'react';

interface InteractionPoint {
  x: number;
  y: number;
  timestamp: number;
  type: 'hover' | 'click';
}

export function use3DHeatmap(trackingId: string) {
  const pointsRef = useRef<InteractionPoint[]>([]);

  // Flush buffer every 5 seconds or when full
  useEffect(() => {
    const flush = () => {
      if (pointsRef.current.length > 0) {
        console.warn(
          `[Zenith Analytics] Batching 3D interactions for ${trackingId}`,
          pointsRef.current,
        );
        // Send to API
        pointsRef.current = [];
      }
    };

    const interval = setInterval(flush, 5000);
    return () => clearInterval(interval);
  }, [trackingId]);

  const trackInteraction = useCallback(
    (x: number, y: number, type: 'hover' | 'click' = 'hover') => {
      // Throttle hover events
      if (type === 'hover' && Math.random() > 0.1) return;

      pointsRef.current.push({ x, y, timestamp: Date.now(), type });
    },
    [],
  );

  return { trackInteraction };
}
