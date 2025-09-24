'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="glass-card p-8 text-center max-w-md">
        <div className="text-4xl mb-4">🥀</div>
        <h2 className="text-xl font-bold text-fg mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-text-secondary mb-6">
          Don't worry, your plants are still safe! We're working on fixing this issue.
        </p>
        <button
          onClick={reset}
          className="btn-primary w-full"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
