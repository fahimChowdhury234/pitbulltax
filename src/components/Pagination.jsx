export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;

  const nums = getPageNumbers(page, pages);

  return (
    <div className="flex items-center justify-center gap-2 mt-3">
      <NavButton disabled={page === 1} onClick={() => onChange(page - 1)}>
        ‹
      </NavButton>

      {nums.map((n, i) =>
        n === "…" ? (
          <span key={`e-${i}`} className="px-2 text-white/80">…</span>
        ) : (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={
              "min-w-9 h-9 px-3 rounded-2xl text-sm font-semibold " +
              (n === page
                ? "bg-white text-[#0E3561]"
                : "bg-white/15 text-white hover:bg-white/25")
            }
          >
            {n}
          </button>
        )
      )}

      <NavButton disabled={page === pages} onClick={() => onChange(page + 1)}>
        ›
      </NavButton>
    </div>
  );
}

function NavButton({ disabled, onClick, children }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        "min-w-9 h-9 px-3 rounded-2xl text-sm font-semibold " +
        (disabled
          ? "bg-white/10 text-white/50 cursor-not-allowed"
          : "bg-white/15 text-white hover:bg-white/25")
      }
    >
      {children}
    </button>
  );
}

/* simple helper: 1 2 … 9 style */
function getPageNumbers(page, pages) {
  const nums = [];
  const add = (n) => nums.push(n);
  if (pages <= 7) {
    for (let i = 1; i <= pages; i++) add(i);
    return nums;
  }
  add(1);
  if (page > 3) add("…");
  for (let i = Math.max(2, page - 1); i <= Math.min(pages - 1, page + 1); i++) add(i);
  if (page < pages - 2) add("…");
  add(pages);
  return nums;
}
