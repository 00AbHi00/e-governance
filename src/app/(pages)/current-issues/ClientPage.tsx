"use client"; // This allows us to use state in the component

import { useState } from "react";
import Link from "next/link";
enum PoolStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

interface CategoryToggleProps {
  category: string;
  polls: {
    title: string;
    id: string;
    description: string | null;
    subCategory: string;
    creatorId: string;
    status: PoolStatus;
    createdAt: Date;
  }[];
}

const CategoryToggle: React.FC<CategoryToggleProps> = ({ category, polls }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter out approved polls for the category
  const approvedPolls = polls.filter(
    (item) =>
      item.subCategory === category && item.status === PoolStatus.APPROVED
  );
  if (approvedPolls.length === 0) {
    return <div>No current issues available</div>; // Do not render the category if there are no approved items
  }

  return (
    <div className="bg-slate-500/40 p-3 rounded-sm mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-gray-300">{category}</h2>

        {/* Checkbox for expand/collapse */}
        <input
          type="checkbox"
          id={`toggle-${category}`}
          className="hidden peer"
          checked={isExpanded}
          onChange={() => setIsExpanded(!isExpanded)}
        />
        <label
          htmlFor={`toggle-${category}`}
          className="cursor-pointer text-gray-300 p-2 rounded-md"
        >
          {isExpanded ? "Expand" : "Collapse"}
        </label>
      </div>

      {/* Polls for this category */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isExpanded ? "max-h-0" : "max-h-screen"
        }`}
      >
        {approvedPolls.length > 0 ? (
          approvedPolls.map((item, index) => (
            <div key={index} className="bg-slate-700 rounded-lg p-4 mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-medium text-white">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-300 mt-2">
                    {item.description}
                  </p>
                )}
              </div>
              <div>
                <Link href={`/current-issues/${item.id}`} className="bg-slate-800 p-3 rounded-lg">
                    Take Part
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No approved items in {category}</p>
        )}
      </div>
    </div>
  );
};

export default CategoryToggle;
