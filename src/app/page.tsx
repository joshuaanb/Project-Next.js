'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [PageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    import('@/components/HomePage').then((mod) => {
      setPageContent(() => mod.default);
    });
  }, []);

  if (!PageContent) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#111] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          <p className="font-outfit text-sm tracking-widest uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  return <PageContent />;
}