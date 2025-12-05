'use server'
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { revalidatePath } from 'next/cache';


export async function createPromptAction(formData: FormData) {
    const { user } = await getAuthenticatedUser();
}

export async function editPromptAction(promptId: string, formData: FormData) {}

export async function deletePromptAction(promptId: string) {} {}

