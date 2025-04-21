"use client";

import { SubmitForm } from "../actions/submitForm";

type Props = {
  pollId: string;
  pollTitle: string;
  questions: {
    id: string;
    text: string;
    type: string;
    options: { id: string; text: string }[];
  }[];
};

const QuestionType = {
  SELECT_ONE: "SELECT_ONE",
  SELECT_MANY: "SELECT_MANY",
  TEXT: "TEXT",
  NUMBER: "NUMBER",
} as const;

export default function ClientPage({ pollId, pollTitle, questions }: Props) {
  return (
    <form action={SubmitForm}>
      <input type="hidden" name="pollId" value={pollId} />
      <legend className="p-4 text-center text-xl text-emerald-400 font-bold">
        {pollTitle}
      </legend>
      <div className="min-h-screen p-8 bg-gray-900 text-white">
        {questions.map((item) => (
          <div key={item.id} className="mb-6">
            <h2 className="text-xl font-bold mb-2">{item.text}</h2>

            {item.type === QuestionType.SELECT_ONE && (
              <div>
                {item.options.map((option) => (
                  <label key={option.id} className="block text-gray-300">
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
                      type="checkbox"
                      name={`question-${item.id}[]`}
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
        <input
          type="submit"
          value="Submit"
          className="bg-blue-900 p-2 shadow-sm shadow-blue-800 rounded-md w-56 mx-auto block hover:bg-gradient-to-tr transition-colors cursor-pointer duration-700 ease-in-out hover:to-blue-900 hover:from-green-600"
        />
      </div>
    </form>
  );
}
