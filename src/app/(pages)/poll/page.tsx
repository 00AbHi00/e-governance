import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function PollListPage() {
  const pools = await prisma.pool.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      creator: true,
      _count: { select: { submissions: true } },
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center text-emerald-400 mb-8">All Polls</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pools.map((pool) => (
          <Link
            key={pool.id}
            href={`/poll/${pool.id}`}
            className="block p-6 bg-slate-800 rounded-lg shadow-md hover:bg-slate-700 transition"
          >
            <h2 className="text-xl font-semibold text-emerald-300">{pool.title}</h2>
            <p className="text-gray-400 mt-2 line-clamp-2">{pool.description}</p>
            <div className="text-sm text-gray-500 mt-4">
              Created by: <span className="text-white">{pool.creator.name}</span><br />
              Submissions: {pool._count.submissions}
            </div>
          </Link>
        ))}
      </div>

      {pools.length === 0 && (
        <div className="text-center text-gray-400 mt-10">No polls available</div>
      )}
    </div>
  );
}
