import prisma from "@/lib/prisma";
import { Redirect } from "@/app/(pages)/[...catchAll]/page";

type ParamClass = {
  params: Promise<{
    questionId: string;
  }>;
};

enum QuestionType {
  SELECT_ONE = "SELECT_ONE",
  SELECT_MANY = "SELECT_MANY",
  TEXT = "TEXT",
  NUMBER = "NUMBER",
}

export default async function FunctionName({ params }: ParamClass) {
  // Await params since it's a Promise
  const { questionId: ID } = await params;
  const questionName=await prisma.pool.findUnique({
    where: {
      id: (await params).questionId
    }
  })
  // Fetch poll data
  const poll = await prisma.pool.findUnique({
    where: { id: ID },
  });

  if (!poll) {
    return (
      <div className="min-h-screen grid content-center justify-items-center bg-black">
        <div>Poll you are looking for is not available</div>
        <Redirect time={10} />
      </div>
    );
  }

  // Fetch related questions
  const questions = await prisma.question.findMany({
    where: { poolId: ID },
    include: { options: true }, // Ensuring options are fetched
  });

  if (!questions.length) {
    return (
      <div className="min-h-screen grid content-center justify-items-center bg-black">
        <div>No questions available for this poll</div>
        <Redirect time={10} />
      </div>
    );
  }
  const approvedQestions=questions.filter((item)=>item.status==="VERIFIED")
  if (approvedQestions.length===0)
  {
    return (
        <div className="min-h-screen grid content-center justify-items-center bg-black">
          <div>No questions available for this poll</div>
          <Redirect time={10} />
        </div>
      );
  }
  return (
    <form>
      <legend className="p-4 text-center text-xl text-emerald-400 font-bold">
        {questionName?.title}
      </legend>
      <div className="min-h-screen p-8 bg-gray-900 text-white">
        {approvedQestions.map((item) => (
          <div key={item.id} className="mb-6">
            <h2 className="text-xl font-bold mb-2">{item.text}</h2>

            {/* Render different input types based on question type */}
            {item.type === QuestionType.SELECT_ONE && (
              <div>
                {item.options.map((option) => (
                  <label  key={option.id} className="block text-gray-300">
                    <input
                      required
                      type="radio"
                      name={`question-${item.id}`}
                      value={option.id}
                      className="mr-2 size-4"
                    />
                    {option.text}
                  </label>
                ))}
              </div>
            )}

            {item.type === QuestionType.SELECT_MANY && (
              <div>
                {item.options.map((option) => (
                  <label key={option.id} className="block text-gray-300">
                    <input
                      required
                      type="checkbox"
                      name={`question-${item.id}`}
                      value={option.id}
                      className="mr-2"
                    />
                    {option.text}
                  </label>
                ))}
              </div>
            )}

            {item.type === QuestionType.TEXT && (
              <textarea
                required
                name={`question-${item.id}`}
                className="w-full p-2 rounded-md bg-slate-700 text-white"
                placeholder="Type your answer..."
              />
            )}

            {item.type === QuestionType.NUMBER && (
              <input
              required  
              type="number"
                name={`question-${item.id}`}
                className="w-full p-2 rounded-md bg-slate-700 text-white"
                placeholder="Enter a number..."
              />
            )}
          </div>
        ))}
      <input type="submit" value={"Submit"} style={{margin:"0 calc(50% - 7rem)"}} className="bg-blue-900 p-2 shadow-sm  shadow-blue-800 rounded-md w-56 hover:bg-gradient-to-tr transition-colors cursor-pointer duration-700 ease-in-out hover:to-blue-900 hover:from-green-600 "/>
      </div>
    </form>
  );
}
