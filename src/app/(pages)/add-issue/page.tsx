// "use client"
// import { optional, z} from "zod";
// import { useState } from "react";
// // import POSTQuestion from "./actions/action"

// type Option= {
//   id: number;
//   text: string;
// }

// interface Question {
//   id: number;
//   text: string;
//   type: QuestionType;
//   options: Option[];
// }

// enum QuestionType {
//   SELECT_ONE = "SELECT_ONE",
//   SELECT_MANY = "SELECT_MANY",
//   TEXT = "TEXT",
//   NUMBER = "NUMBER",
// }

// const optionSchema = z.object(
//   {
//     id:z.string(),
//     parentId:z.string(),
//     option:z.string().min(1,"Option can't be empty")
//   }
// )

// // Both types of schemas require same type of selection
// const selectSchema = z.object(
//   {
//     id: z.string(),
//     question: z.string().min(1,{message:"The question can't be empty"}),
//     options:z.array(optionSchema).min(1,{message:"Options can't be empty"})
//   }
// )

// const formSchema = z.object({
//   poll_title: z.string().min(1, "Poll title is required"),
//   subCategory: z.string().min(1, "Category is required"),
//   description: z.string().optional(),
// });

// export default function AddIssue() {
//   const [questionList, setquestionList] =useState(
//     {
//       questionId:"",
//       type:QuestionType,
//       option: Option,
//     }
//   )
  
//   const showItem= ()=>
//   {
//     alert("okz")
//   }


//   const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>)=>
//   {
//     e.preventDefault()
//     const temp= new FormData(e.currentTarget)
//     const actualData= Object.fromEntries(temp)
//     // Although invalid value validation is done, user experience on what is invalid is still not shown
//     try
//     {
//       formSchema.parse(actualData)
//       alert("valid")
//     }catch(e)
//     {
//       alert("invalid") 
//       console.log(e)
//     }
//   }
//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Add Issue</h2>
//       <form onSubmit={handleFormSubmit} className="space-y-4">
//         <input
//           name="poll_title"
//           placeholder="Poll Title"
//           className="w-full p-2 rounded bg-gray-800"
//         />
        
//         <input
//           name="subCategory"
//           placeholder="Category"
//           className="w-full p-2 rounded bg-gray-800"
//         />
        
//         <textarea
//           name="description"
//           placeholder="Description"
//           className="w-full p-2 rounded bg-gray-800"
//         />
//         <button
//           onClick={showItem}
//           type="button"
//           className="p-2 bg-blue-600 rounded"
//         >
//           Add Question
//         </button>

//         <button type="submit" className="w-full p-3 bg-blue-500 rounded text-white font-bold">
//           Submit Issue
//         </button>
//       </form>
//     </div>
//   );
// }

"use client"
import { useState } from "react";
import { z } from "zod";
import POSTQuestion from "./actions/action"

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options: Option[];
}

enum QuestionType {
  SELECT_ONE = "SELECT_ONE",
  SELECT_MANY = "SELECT_MANY",
  TEXT = "TEXT",
  NUMBER = "NUMBER",
}

const questionSchema = z.object({
  id: z.number(),
  text: z.string().min(1, "Question text is required"),
  type: z.nativeEnum(QuestionType),
  options: z.array(
    z.object({
      id: z.number(),
      text: z.string().min(1, "Option text is required"),
    })
  ),
});

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subCategory: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  questions: z.array(questionSchema),
});

export default function AddIssue() {
  const [state, setState] = useState<{ questions: Question[] }>({ questions: [] });
  const [errors, setErrors] = useState<any>({});

  const addQuestion = () => {
    setState((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { id: Date.now(), text: "", type: QuestionType.SELECT_ONE, options: [] },
      ],
    }));
  };

  const removeQuestion = (id: number) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }));
  };

  const addOption = (questionId: number) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? { ...q, options: [...q.options, { id: Date.now(), text: "" }] }
          : q
      ),
    }));
  };

  const removeOption = (questionId: number, optionId: number) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((o) => o.id !== optionId) }
          : q
      ),
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const parsed = formSchema.safeParse({ ...data, questions: state.questions });
    if (!parsed.success) {
      setErrors(parsed.error.format());
      return;
    }

    console.log(parsed.data);
    try {
        const response = await fetch('/api/POSTQuestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parsed.data), // Send the parsed data as JSON
        });
    
        const result = await response.json();
        console.log(result); // You can log the server's response
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    setErrors({});
    // event.currentTarget.reset();
    setState({ questions: [] });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Issue</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="title"
          required
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-800"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title._errors[0]}</p>}
        
        {/* Category Input */}
        <input
          name="subCategory"
          required
          placeholder="Category"
          className="w-full p-2 rounded bg-gray-800"
        />
        {errors.subCategory && <p className="text-red-500 text-sm">{errors.subCategory._errors[0]}</p>}
        
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 rounded bg-gray-800"
        />
        <button
          type="button"
          onClick={addQuestion}
          className="p-2 bg-blue-600 rounded"
        >
          Add Question
        </button>

        {state.questions.map((question, qIdx) => (
          <div key={question.id} className="p-4 border border-gray-700 rounded space-y-2">
            <input
              type="text"
              value={question.text}
              onChange={(e) => {
                const updatedQuestions = [...state.questions];
                updatedQuestions[qIdx].text = e.target.value;
                setState({ questions: updatedQuestions });
              }}
              placeholder="Question text"
              className="w-full p-2 rounded bg-gray-800"
            />
            {errors.questions?.[qIdx]?.text && (
              <p className="text-red-500 text-sm">{errors.questions[qIdx].text._errors[0]}</p>
            )}
            <select
              value={question.type}
              onChange={(e) => {
                const updatedQuestions = [...state.questions];
                updatedQuestions[qIdx].type = e.target.value as QuestionType;
                setState({ questions: updatedQuestions });
              }}
              className="w-full p-2 rounded bg-gray-800"
            >
              {Object.values(QuestionType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {question.type !== QuestionType.TEXT && question.type !== QuestionType.NUMBER && (
              <>
                <button
                  type="button"
                  onClick={() => addOption(question.id)}
                  className="p-2 bg-green-600 rounded"
                >
                  Add Option
                </button>
                {question.options.map((option, oIdx) => (
                  <div key={option.id} className="flex space-x-2">
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => {
                        const updatedQuestions = [...state.questions];
                        updatedQuestions[qIdx].options[oIdx].text = e.target.value;
                        setState({ questions: updatedQuestions });
                      }}
                      placeholder="Option text"
                      className="w-full p-2 rounded bg-gray-800"
                    />
                    {errors.questions?.[qIdx]?.options?.[oIdx]?.text && (
                      <p className="text-red-500 text-sm">
                        {errors.questions[qIdx].options[oIdx].text._errors[0]}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => removeOption(question.id, option.id)}
                      className="p-2 bg-red-600 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
              </>
            )}
            <button
              type="button"
              onClick={() => removeQuestion(question.id)}
              className="p-2 bg-red-600 rounded"
            >
              Remove Question
            </button>
          </div>
        ))}
        <button type="submit" className="w-full p-3 bg-blue-500 rounded text-white font-bold">
          Submit Issue
        </button>
      </form>
    </div>
  );
}
