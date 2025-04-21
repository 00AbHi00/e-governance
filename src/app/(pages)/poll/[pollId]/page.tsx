import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ReportPage({ params }: { params: { pollId: string } }) {
  const pollId = params.pollId;

  // Fetch poll & related questions
  const poll = await prisma.pool.findUnique({
    where: { id: pollId },
    include: {
      questions: {
        include: { options: true },
      },
      submissions: true,
    },
  });

  if (!poll) return notFound();

  const questions = poll.questions;
  const submissions = poll.submissions;

  // Prepare answers grouped by question
  const questionResponses: Record<string, any[]> = {};

  submissions.forEach((submission) => {
    const answers = submission.submissionData as Record<string, any>;
    Object.entries(answers).forEach(([questionId, value]) => {
      if (!questionResponses[questionId]) {
        questionResponses[questionId] = [];
      }

      if (Array.isArray(value)) {
        questionResponses[questionId].push(...value);
      } else {
        questionResponses[questionId].push(value);
      }
    });
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl text-center font-bold mb-6 text-emerald-400">{poll.title} – Report</h1>

      {questions.map((question) => (
        <div key={question.id} className="mb-8 bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{question.text}</h2>

          {question.type === "TEXT" || question.type === "NUMBER" ? (
            <ul className="list-disc ml-5">
              {(questionResponses[question.id] || []).map((resp, index) => (
                <li key={index} className="text-gray-300">{resp}</li>
              ))}
            </ul>
          ) : (
            <>
              {question.options.map((opt) => {
                const count = (questionResponses[question.id] || []).filter((val) => val === opt.id).length;
                return (
                  <div key={opt.id} className="text-gray-300 flex justify-between">
                    <span>{opt.text}</span>
                    <span>{count} votes</span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
