export interface FileLite {
  expanded?: boolean;
  name: string;
  url?: string;
  type?: string;
  score?: number;
  size?: number;
  embedding?: number[];
  chunks?: TextEmbedding[];
  extractedText?: string;
}

export interface FileChunk extends TextEmbedding {
  filename: string;
  score?: number;
}

export interface TextEmbedding {
  text: string;
  embedding: number[];
}
