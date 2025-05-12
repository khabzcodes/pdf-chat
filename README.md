# PDF Chat - Chat with your PDF documents using AI

PDF Chat is a modern web application that allows users to upload PDF documents and interact with them through a conversational AI interface. Built with Next.js and OpenAI, this application makes it easy to extract information from your PDFs by simply asking questions in natural language.

![PDF Chat Application](https://example.com/pdf-chat-screenshot.png)

## Features

- 📄 **PDF Upload & Processing** - Upload PDF documents and process them for AI interaction
- 💬 **Conversational AI Interface** - Ask questions about your PDFs and get immediate answers
- 🔍 **Semantic Search** - Find relevant information in your documents using natural language
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast Processing** - Efficient text extraction and embedding generation

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Radix UI
- **AI Processing**: OpenAI API
- **PDF Processing**: pdf-parse
- **Styling**: Tailwind CSS with customizable components
- **Deployment**: Ready for deployment on Vercel

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or higher
- An OpenAI API key for the AI functionality
- npm, pnpm, or Yarn package manager

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/khabzcodes/pdf-chat.git
cd pdf-chat
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How It Works

1. **Upload PDF** - Upload your PDF documents through the user interface
2. **Text Extraction** - The application extracts text from the PDF documents
3. **Embedding Generation** - The text is processed and embeddings are generated
4. **Question & Answer** - Ask questions about your documents and get AI-powered answers

## Project Structure

```
app/               # Next.js App Router pages and API routes
├── api/           # Backend API endpoints for PDF processing and AI
├── chat/          # Chat interface page
components/        # React components
├── file-uploader/ # PDF upload components
├── landing/       # Landing page components
├── ui/            # UI components (built with Radix UI)
lib/               # Utility functions and core logic
├── chunk-text.ts  # Text chunking utilities
├── openai.ts      # OpenAI API integration
types/             # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
