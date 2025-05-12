import { FileChunk } from "@/types/file";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

type Data = {
  answer?: string;
  error?: string;
};

export const runtime = "edge";

const MAX_FILES_LENGTH = 2000 * 3;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { question, fileChunks } = body as unknown as {
      question: string;
      fileChunks: FileChunk[];
    };

    const filesString = fileChunks
      .map((fileChunk) => `###\n\"${fileChunk.filename}\"\n${fileChunk.text}`)
      .join("\n")
      .slice(0, MAX_FILES_LENGTH);

    const systemPrompt =
      `Given a question, try to answer it using the content of the file extracts below, and if you cannot answer, or find a relevant file, just output \"I couldn't find the answer to that question in your files.\".\n\n` +
      `If the answer is not contained in the files or if there are no file extracts, respond with \"I couldn't find the answer to that question in your files.\" If the question is not actually a question, respond with \"That's not a valid question.\" YOU DO NOT HAVE TO SAY ANYTHING ELSE OR QUESTION ON YOUR OWN AT ALL COSTS!\n\n` +
      `In the cases where you can find the answer, first give the answer. Then explain how you found the answer from the source or sources, and use the exact filenames of the source files you mention. Do not make up the names of any other files other than those mentioned in the files context. Give the answer in markdown format.` +
      `Use the following format:\n\nQuestion: <question>\n\nFiles:\n<###\n\"filename 1\"\nfile text>\n<###\n\"filename 2\"\nfile text>...\n\nAnswer: <answer or "I couldn't find the answer to that question in your files" or "That's not a valid question.">\n\n` +
      `Question: ${question}\n\n` +
      `Files:\n${filesString}\n\n`;

    // const answer = await streamText({
    //   model: openai("gpt-4o-mini"),
    //   system: systemPrompt,
    //   messages: [
    //     {
    //       role: "user",
    //       content: question,
    //     },
    //   ],
    //   maxTokens: 300,
    //   temperature: 0,
    // });
    const stream = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      max_tokens: 300,
      temperature: 0,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices?.[0]?.delta?.content;
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return new Response(JSON.stringify({ error: "Error processing file" }), {
      status: 500,
    });
  }
}
