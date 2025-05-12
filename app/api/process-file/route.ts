import { TextEmbedding } from "@/types/file";
import { NextRequest, NextResponse } from "next/server";
import { createEmbeddings } from "@/lib/create-embeddings";
import extractTextFromFile from "@/lib/extract-text-from-file";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { mkdir } from "fs/promises";
import { tmpdir } from "os";

export async function POST(req: NextRequest) {
  try {
    // Create temporary directory for uploaded file
    const tempDir = join(tmpdir(), "pdf-chat-uploads");
    await mkdir(tempDir, { recursive: true });

    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save the file to a temporary location
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = join(tempDir, `${uuidv4()}-${file.name}`);
    const fileType = file.type;

    await writeFile(filePath, buffer);

    // Extract text from the file
    const extractedText = await extractTextFromFile({
      filepath: filePath,
      filetype: fileType,
    });

    // Process the extracted text and generate embeddings
    const { meanEmbedding, chunks } = await createEmbeddings({
      text: extractedText,
    });

    return NextResponse.json({
      text: extractedText,
      meanEmbedding,
      chunks,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Error processing file" },
      { status: 500 }
    );
  }
}
