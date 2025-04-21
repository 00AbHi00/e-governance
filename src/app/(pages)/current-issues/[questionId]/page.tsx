// Server component (SSR)
import prisma from "@/lib/prisma";
import ClientPage from "./ClientPage";
import { Redirect } from "@/app/(pages)/[...catchAll]/page";

export default async function PollPage({ params }: { params: { questionId: string } }) {
  const pollId = params.questionId;

  const poll = await prisma.pool.findUnique({
    where: { id: pollId },
  });

  if (!poll) {
    return (
      <div className="min-h-screen grid content-center justify-items-center bg-black">
        <div>Poll you are looking for is not available</div>
        <Redirect time={10} />
      </div>
    );
  }

  const questions = await prisma.question.findMany({
    where: { poolId: pollId },
    include: { options: true },
  });

  const approvedQuestions = questions.filter((item) => item.status === "VERIFIED");

  if (!approvedQuestions.length) {
    return (
      <div className="min-h-screen grid content-center justify-items-center bg-black">
        <div>No verified questions available for this poll</div>
        <Redirect time={10} />
      </div>
    );
  }

  return (
    <ClientPage pollTitle={poll.title} pollId={pollId} questions={approvedQuestions} />
  );
}
