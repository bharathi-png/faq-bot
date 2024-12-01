# LangChain FAQ Bot

A simple FAQ bot built with Next.js, TypeScript, and LangChain. It handles predefined questions and uses OpenAI for generating answers to unknown questions.

## Features

- AI-powered responses using OpenAI
- Predefined FAQ database
- Light/Dark mode support
- Fast and responsive UI
- Secure API key handling

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3.Create a `.env.local` file in the root directory with your OpenAI API key:

```plaintext
OPENAI_API_KEY=your-api-key-here
```

4.Run the development server:

```bash
npm run dev
```

5.Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [LangChain](https://js.langchain.com/) - LLM framework
- [OpenAI](https://platform.openai.com/) - AI model provider
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Project Structure

```text
├── app/
│   ├── api/
│   │   └── faq/
│   │       └── route.ts    # API endpoint
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Main page
├── public/                # Static files
└── package.json          # Dependencies
```

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request
