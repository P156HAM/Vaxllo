import express from "express";
import { telnyxController } from "./controllers/telnyxController";
import { errorHandler } from "./middleware/errorHandler";

// Initialize express app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.post("/", telnyxController.handleAnswer);
app.post("/telnyx/answer", telnyxController.handleAnswer);
app.post("/telnyx/recording", telnyxController.handleRecording);
app.post("/telnyx/transcription", telnyxController.handleTranscription);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("🔗 Using Supabase:", process.env.SUPABASE_URL);
});
