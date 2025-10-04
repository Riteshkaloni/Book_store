import React from 'react';

interface Props {
  current: number;
  total: number; // total pages
  onPage: (n: number) => void;
  windowSize?: number; // how many page numbers to show in the control
}

const Pagination: React.FC<Props> = ({ current, total, onPage, windowSize = 5 }) => {
  if (total <= 1) return null;

  const pages: (number | '...')[] = [];

  // If total is small, show all pages
  if (total <= windowSize) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    // calculate sliding window centered on current
    const half = Math.floor(windowSize / 2);
    let start = Math.max(1, current - half);
    let end = start + windowSize - 1;
    if (end > total) {
      end = total;
      start = Math.max(1, end - windowSize + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < total) {
      if (end < total - 1) pages.push('...');
      pages.push(total);
    }
  }

  return (
    <nav aria-label="Pagination" className="flex items-center gap-2">
      <button
        onClick={() => onPage(Math.max(1, current - 1))}
        disabled={current === 1}
        className={`px-3 py-1 rounded ${current === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200'}`}
      >
        Prev
      </button>

      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={`e-${idx}`} className="px-2 text-sm text-gray-500">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPage(p as number)}
            aria-current={p === current ? 'page' : undefined}
            className={`px-3 py-1 rounded ${p === current ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-100'}`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPage(Math.min(total, current + 1))}
        disabled={current === total}
        className={`px-3 py-1 rounded ${current === total ? 'opacity-50 cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200'}`}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
