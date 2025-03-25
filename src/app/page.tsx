import React from 'react';

const PollingSystemDescription = () => {
  return (
    <div className=" min-h-screen bg-slate-900 text-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Polling System Overview</h1>
        <p className="text-xl mb-6">
          A <b>Polling System </b> allows citizens and government to create and participate in surveys, collecting data on various topics in an efficient and structured way.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Polling Systems Are Needed</h2>
          <p className="text-lg">
            Polling systems are used to gather feedback, opinions, and preferences from citizens. This data can be utilized by government to create effective policies.
            <br /><br />
            With the growth of online platforms, polls and surveys have become a crucial tool for measuring public opinion, customer satisfaction, and market trends. They help in capturing real-time data, which is vital for decision-making in various industries.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">How Does It Work?</h2>
          <div className="text-lg">
            The Polling System is structured around the following models:
            <div className="list-disc pl-6 mt-4">
              <li><strong>User</strong> - The creator of the poll and the participants who interact with it.</li>
              <li><strong>Pool</strong> - A collection of questions that make up a single poll. It includes the title, description, and status.</li>
              <li><strong>Question</strong> - A question in the poll that can have different types like multiple choice, text input, etc.</li>
              <li><strong>Option</strong> - Multiple options associated with a question, allowing the user to choose answers.</li>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Polling System Models (Prisma Schema)</h2>
          <pre className="text-sm bg-slate-700 p-4 rounded-lg overflow-x-auto">
            {`model User {
  id        String   @id @default(uuid())
  name      String   
  email     String   @unique
  password  String
  role      Role
  pools     Pool[] 
  createdAt DateTime @default(now())
}

model Pool {
  id          String   @id @default(uuid())
  subCategory String   @default("")
  title       String
  description String?
  creatorId   String
  creator     User     @relation(fields: [creatorId], references: [id])
  status      PoolStatus @default(PENDING)
  questions   Question[] 
  createdAt   DateTime @default(now())
}

model Question {
  id          String   @id @default(uuid())
  text        String
  type        QuestionType
  poolId      String
  pool        Pool     @relation(fields: [poolId], references: [id])
  status      QuestionStatus @default(PENDING)
  options     Option[] 
}

model Option {
  id         String @id @default(uuid())
  text       String
  questionId String
  question   Question @relation(fields: [questionId], references: [id])
}`}
          </pre>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Benefits of Polling Systems</h2>
          <div className="list-disc pl-6">
            <li>Efficient way to gather feedback from large groups of people.</li>
            <li>Helps make data-driven decisions.</li>
            <li>Supports various question types (multiple choice, text input, etc.) for detailed analysis.</li>
            <li>Provides real-time data collection and results.</li>
            <li>Ensures transparency and clarity in understanding user opinions.</li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollingSystemDescription;
