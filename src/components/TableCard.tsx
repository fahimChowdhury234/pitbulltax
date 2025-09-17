// src/components/TableCard.tsx
import React from "react";

interface TableCardProps {
  title: string;
  columns: string[];
  rows: (string | number)[][];
}

const TableCard: React.FC<TableCardProps> = ({ title, columns, rows }) => {
  return (
    <div className="rounded-xl bg-white shadow-md overflow-hidden">
      <div className="bg-[#1F66D1] text-white px-4 py-2 text-[17px] font-semibold">
        {title}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} className="py-2 px-4 text-sm font-semibold text-[#0E3561]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-black/80">
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-black/5">
                {row.map((cell, j) => (
                  <td key={j} className="py-2 px-4">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCard;
