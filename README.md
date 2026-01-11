# HRBP AI Assistant Frontend

## Project Approach

This frontend application is a **modern React-based chat interface** for interacting with the HRBP AI Assistant. Built with a focus on user experience and responsive design, it provides an intuitive conversational interface for HR-related queries.

### Architecture Overview

1. **React 19 with TypeScript**: Modern React with strict type safety
2. **Vite Build Tool**: Fast development server and optimized production builds
3. **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development
4. **Component-Based Architecture**: Modular, reusable React components
5. **Markdown Rendering**: Rich text formatting for AI responses using `react-markdown`

### Key Components

- **App.tsx**: Root component that renders the main chat dashboard
- **ChatDashboard.tsx**: Main container managing state, API communication, and conversation history
- **ChatArea.tsx**: Chat interface with message display, input field, and markdown rendering
- **Sidebar.tsx**: Navigation sidebar with agent selection and conversation history

### Features

- **Real-time Chat Interface**: Interactive conversation with the HRBP AI Assistant
- **Markdown Support**: Renders formatted responses including tables, lists, and headers
- **Conversation Management**: Create new chats and view previous conversations
- **Agent Selection**: Switch between different AI agents (HRBP, Leadership Coach, Growth Consultant)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading States**: Visual feedback during API requests
- **Error Handling**: Graceful error messages for failed requests

### UI/UX Highlights

- Clean, modern interface with gradient accents
- Smooth animations and transitions
- Typography optimized for readability
- Accessible keyboard navigation (Enter to send)
- Empty state with welcoming message
- Loading indicators for better user feedback

## Instructions to Run the Project

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Backend API**: Ensure the backend server is running (see backend README.md)

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API Endpoint** (Optional)
   
   The application is currently configured to use the production backend at:
   ```
   https://aimirtaskbackend-production.up.railway.app/chat
   ```
   
   To use a local backend, you can:
   
   - **Option 1**: Create a `.env` file in the `frontend` directory:
     ```env
     VITE_API_URL=http://localhost:5500
     ```
   
   - **Option 2**: Modify the API URL directly in `src/components/ChatDashboard.tsx`:
     ```typescript
     const response = await fetch('http://localhost:5500/chat', {
       // ... rest of the code
     });
     ```

### Running the Project

#### Development Mode
```bash
npm run dev
```

This starts the Vite development server, typically at `http://localhost:5173`. The server includes:
- Hot Module Replacement (HMR) for instant updates
- Fast refresh for React components
- Source maps for debugging

#### Production Build

1. **Build the project:**
   ```bash
   npm run build
   ```
   
   This creates an optimized production build in the `dist` directory.

2. **Preview the production build:**
   ```bash
   npm run preview
   ```
   
   This serves the production build locally for testing.

#### Linting
```bash
npm run lint
```

Runs ESLint to check for code quality issues.

### Usage

1. **Start the application** using `npm run dev`
2. **Open your browser** to the URL shown in the terminal (usually `http://localhost:5173`)
3. **Select an agent** from the sidebar (My HRBP, My Leadership Coach, or My Growth Consultant)
4. **Type your question** in the input field and press Enter or click Send
5. **View responses** formatted with markdown (tables, lists, etc.)
6. **Create new chats** using the "+ New Chat" button
7. **Access previous conversations** from the sidebar

### Example Queries

- "Who are you?"
- "Show me all employees"
- "What is the average salary in the Engineering department?"
- "List employees who joined in 2023"
- "Hello"

```

### Troubleshooting

- **Port already in use**: Vite will automatically try the next available port
- **API connection errors**: 
  - Verify the backend server is running
  - Check the API URL in `ChatDashboard.tsx`
  - Ensure CORS is enabled on the backend
- **Build errors**: Run `npm run lint` to identify TypeScript or linting issues
- **Styles not loading**: Ensure Tailwind CSS is properly configured (should work out of the box with `@tailwindcss/vite`)

### Development Tips

- The app uses React 19 features - ensure your Node.js version is compatible
- Tailwind CSS v4 is configured via the Vite plugin - no separate config file needed
- Markdown rendering supports GitHub Flavored Markdown (GFM) for tables and more
- Component state is managed locally - consider adding state management (Redux/Zustand) for complex scenarios