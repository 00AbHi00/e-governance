import prisma from "@/lib/prisma";
import CategoryToggle from "./ClientPage";

export default async function CurrentIssues() {
  const polls = await prisma.pool.findMany();
  const categories: string[] = [
    ...new Set(polls.map((item) => item.subCategory)),
  ];
  
  return (
    <div className="bg-slate-900 min-h-screen text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-200 mb-8">
          Polling System - Current Issues
        </h1>

        {/* Loop through categories */}
        <div className="container">
          {categories.map((category, key) => (
            <CategoryToggle key={key} category={category} polls={polls} />
          ))}
        </div>
      </div>
    </div>
  );
}
