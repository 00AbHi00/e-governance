"use server"
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const questionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  type: z.enum(['SELECT_ONE', 'SELECT_MANY', 'TEXT', 'NUMBER']),
  options: z.array(z.object({
    text: z.string().min(1, 'Option text is required'),
  })).min(1, 'At least one option is required'),
});

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subCategory: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  questions: z.array(questionSchema),
});

export  default async function POSTQuestion(req: NextRequest) {
  const formData = await req.json();
  const result = formSchema.safeParse(formData);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.format() }, { status: 400 });
  }

  const { title, subCategory, description, questions } = result.data;
  const creatorId = 'your-logged-in-user-id'; // Get this from your session or authentication

  try {
    const pool = await prisma.pool.create({
      data: {
        title,
        subCategory,  // Include subCategory here
        description,
        creatorId,
        questions: {
          create: questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: {
              create: q.options.map((opt) => ({
                text: opt.text,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json({ message: 'Issue submitted successfully', pool }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit issue' }, { status: 500 });
  }
}
