import { createTool } from '@mastra/core/tools';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { CoreMessage, generateText } from 'ai';
import { HttpException } from '@/exceptions/HttpException';

const InputSchema = z.object({
  moodEntries: z.array(
    z.object({
      id: z.number(),
      mood: z.string(),
      journalEntry: z.string(),
      feelings: z.string(),
      sleepHours: z.number(),
      createdAt: z.string(),
    }),
  ),
});

export const analyzeMoodTool = createTool({
  id: 'analyze-mood',
  description: 'Analyze mood entries to determine mood trend.',
  inputSchema: InputSchema,
  execute: async ({ context }) => {
    try {
      const messages: CoreMessage[] = [
        {
          role: 'system',
          content: `You are an expert mood analyst and empathetic coach. You will analyze mood entries provided in JSON format and produce a concise, insightful, and supportive summary.

          **Instructions:**

          1. Evaluate the overall mood trend by considering the average mood score (using this scale: Very Sad = -2, Sad = -1, Neutral = 0, Happy = 1, Very Happy = 2).
          - If average >= 1 → "Positive"
          - If average <= -1 → "Negative"
          - Otherwise → "Neutral"

          2. Check for mood variability:
          - Are the entries mostly stable or do they fluctuate significantly?

          3. Analyze sleep hours:
          - Consider sleep below 6 hours as "insufficient sleep".
          - Check if low sleep coincides with lower mood entries.

          4. Identify common emotional themes:
          - Look at frequently mentioned feelings and words from journal entries.
          - Mention any repeating emotions or stressors.

          5. Write a **concise summary** (max 3 sentences) that:
          - Highlights the overall trend (positive, neutral, or negative).
          - Mentions mood stability or fluctuation.
          - Reflects on sleep patterns and major emotional themes.
          - Uses a warm, supportive, and empathetic tone.

          Guidelines for summary:
          - If the trend is Positive:
            - Use a joyful tone with celebratory emojis (🎉, 🌟, 😊).

          - If the trend is Negative:
            - Use a compassionate tone with comforting or uplifting emojis (💛, 🌈, 🧘‍♀️).

          - If the trend is Neutral:
            - Use a balanced, optimistic tone with gentle emojis (🙂, ✨).

          **Return your answer strictly in this JSON format:**

          {
            "trend": "Positive" | "Negative" | "Neutral",
            "summary": "Your concise, empathetic analysis here.",
            "cause": "Brief reason for the mood trend, including any connections to sleep or recurring emotions."
          }

          **Important:**
          - Be concise and supportive.
          - Do not include code blocks or extra text before or after the JSON.
          - Base your output only on the data provided below.

          **Here is the data:**

          ${JSON.stringify(context.moodEntries, null, 2)}
        `,
        },
      ];
      const { text } = await generateText({
        model: openai('gpt-4o-mini'),
        messages,
      });

      return text;
    } catch (e) {
      console.error('Error generating mood summary');
      throw new HttpException(500, 'Failed to generate mood summary');
    }
  },
});
