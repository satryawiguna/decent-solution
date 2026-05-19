import { Suspense } from 'react';
import DesignPageContent from './DesignPageContent';

export default function DesignPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-brand-950">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-blue-400" />
        </div>
      }
    >
      <DesignPageContent />
    </Suspense>
  );
}
