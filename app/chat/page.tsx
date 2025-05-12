"use client";

import FileUploadArea from "@/components/file-uploader/file-upload-area";
import { FileLite } from "@/types/file";
import React from "react";

export default function ChatPage() {
  const [files, setFiles] = React.useState<FileLite[]>([]);
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="space-y-6">
        <div className="space-y-4 max-w-3xl text-center mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 md:text-4xl">
            Unlock Insights from Your Documents with AI
          </h1>
          <p className="text-muted-foreground">
            Upload your documents and start a conversation with them instantly.
            Our advanced AI system, powered by state-of-the-art language models,
            analyzes your content to deliver precise and contextual responses to
            your specific questions.
          </p>
        </div>
        <FileUploadArea
          handleSetFiles={setFiles}
          maxNumFiles={50}
          maxFileSizeMB={70}
        />
      </div>
    </div>
  );
}
