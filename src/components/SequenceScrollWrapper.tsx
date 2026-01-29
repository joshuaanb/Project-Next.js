'use client';

import { useEffect, useState } from 'react';

export default function SequenceScrollWrapper() {
  const [SequenceScrollComponent, setSequenceScrollComponent] = useState<any>(null);

  useEffect(() => {
    // Import component hanya di client-side
    import('./SequenceScrollClient').then((mod) => {
      setSequenceScrollComponent(() => mod.default);
    });
  }, []);

  // Jangan render apapun sampai component ter-load
  if (!SequenceScrollComponent) {
    return <div className="h-screen bg-[#fdfaf5]" />;
  }

  return <SequenceScrollComponent />;
}