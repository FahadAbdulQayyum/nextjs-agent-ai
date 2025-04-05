# AI-Powered Education Assistant LLM

This project is a frontend application developed using **Next.js** and **TypeScript**. It includes various components such as a Summarizer, Quiz Generator, and Quiz Checker. The application is styled using **Tailwind CSS** and custom fonts.

## Project Structure

- **src/app/layout.tsx**: Main layout component that includes the Navbar and sets up the global styles and fonts.
- **src/app/globals.css**: Global CSS file that includes Tailwind CSS base, components, and utilities, as well as custom styles and font definitions.
- **src/app/components/Navbar/index.tsx**: Navbar component that provides navigation links and search functionality.
- **src/app/components/Summarizer/index.tsx**: Summarizer component that allows users to upload PDF files or input text to generate summaries.
- **src/app/components/QuizGenerator/index.tsx**: Quiz Generator component that enables users to create quizzes from summaries or manually input questions.
- **src/app/components/QuizChecker/index.tsx**: Quiz Checker component that evaluates quiz answers and provides feedback.
- **src/app/components/Home/index.tsx**: Home component that serves as the main container for the Summarizer, Quiz Generator, and Quiz Checker components.
- **src/app/components/TabsComponent/index.tsx**: Tab component that allows users to select options from a list.
- **src/app/components/CardComponent/index.tsx**: CardComponent that displays summaries, quizzes, or results in a card format.

## Features

### 1. **Summarizer**
   - Allows users to upload PDF files or input text.
   - Generates concise summaries using AI-powered algorithms.
   - Provides real-time feedback and error handling for invalid inputs.

### 2. **Quiz Generator**
   - Enables users to create quizzes based on summaries or manually input questions.
   - Supports multiple question types (e.g., multiple-choice, true/false, short answer).
   - Includes drag-and-drop functionality for reordering questions.

### 3. **Quiz Checker**
   - Evaluates quiz answers submitted by users.
   - Provides detailed feedback, including correct answers and explanations.
   - Tracks user performance and displays statistics.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ai-quiz-creator.git
   cd ai-quiz-creator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Summarizer**: Upload a PDF file or input text to generate a concise summary.
- **Quiz Generator**: Create quizzes by selecting summaries or manually entering questions.
- **Quiz Checker**: Submit quiz answers to receive feedback and performance metrics.
- **Tab**: Select options from predefined lists (e.g., summarizer, quiz-generator, quiz-checker).
- **CardComponent**: View summaries, quizzes, and results in a clean card format.

## Custom Fonts

The project uses custom fonts defined in the `globals.css` file. Ensure that the font files are placed in the correct directory (`/fonts/`).

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the **MIT License**.

---

### Notes for Future Updates:
- If you plan to add more features or components, update the **Project Structure** and **Features** sections accordingly.
- Include screenshots or GIFs of the application in action to make the README more engaging.
- Add badges (e.g., for build status, code coverage) if applicable.

Let me know if you need further refinements or additional sections!