# QuizOnAnything

<div style="display: flex; align-items: center;">
  <img src="./public/q-nobg.png" alt="QuizOnAnything Logo" width="100" style="margin-right: 20px;" />
  <div>
    QuizOnAnything is a dynamic quiz application that allows users to create and participate in quizzes on any topic. The app leverages OpenAI's API to generate quiz questions based on user-defined topics, modes, and difficulty levels.
  </div>
</div>

## Features

- **Custom Quiz Creation**: Enter a topic, select a quiz mode, and choose a difficulty level to generate a custom quiz.
- **Multiple Quiz Modes**:
  - **Trivia**: Focus on factual information and interesting facts.
  - **Educational**: Emphasize learning concepts and understanding.
  - **General**: A mix of factual knowledge and conceptual questions.
- **Difficulty Levels**:
  - **Easy**: Basic knowledge, straightforward questions.
  - **Medium**: Moderate knowledge, some complexity.
  - **Hard**: Advanced knowledge, challenging questions.
- **Responsive Design**: Optimized for both desktop and mobile devices.

<img src="./public/homepage-screenshot.png" alt="Homepage Screenshot" width="600" style="display: block; margin: 20px auto;" />

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/quizonanything.git
   cd quizonanything
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env.local` file in the root directory.
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_openai_api_key
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Start the production server**:
   ```bash
   npm start
   ```

## Usage

- Navigate to the home page to create a new quiz.
- Enter a topic, select a mode, and choose a difficulty level.
- Click "Create Quiz" to generate and participate in the quiz.


