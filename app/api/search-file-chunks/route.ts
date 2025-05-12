import { NextRequest, NextResponse } from "next/server";
import { searchFileChunks } from "@/lib/search-file-chunks";
import { FileChunk, FileLite } from "@/types/file";

type Data = {
  searchResults?: FileChunk[];
  error?: string;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    // Get search query from request body
    const body = await req.json();

    const { searchQuery, files, maxResults } = body as {
      searchQuery: string;
      files: FileLite[];
      maxResults: number;
    };

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: "files must be a non-empty array" },
        { status: 400 }
      );
    }

    if (!maxResults || maxResults < 1) {
      return NextResponse.json(
        { error: "maxResults must be a number greater than 0" },
        { status: 400 }
      );
    }

    const searchResults = await searchFileChunks({
      searchQuery,
      files,
      maxResults,
    });

    return NextResponse.json({ searchResults });
  } catch (error) {}
}
