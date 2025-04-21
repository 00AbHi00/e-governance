"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function SubmitForm(formData: FormData) {
  const poolId = formData.get("pollId") as string;

  const answers: Record<string, any> = {};

  // Process formData entries
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("question-")) {
      const qid = key.replace(/^question-|\[\]$/g, "");

      // Check if already exists (checkboxes with same name)
      if (answers[qid]) {
        if (Array.isArray(answers[qid])) {
          answers[qid].push(value);
        } else {
          answers[qid] = [answers[qid], value];
        }
      } else {
        answers[qid] = value;
      }
    }
  }

  // Save submission
  await prisma.submission.create({
    data: {
      poolId,
      submissionData: answers,
    },
  });

  revalidatePath(`/poll/${poolId}`);
}
