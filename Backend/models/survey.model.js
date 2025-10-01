// kiosk/backend/models/survey.model.js

import mongoose from 'mongoose';

// This defines the structure for the data we will save in MongoDB
const surveySchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  answers: { type: Object, required: true },
  submittedAt: { type: Date, default: Date.now },
});

// The model is the tool we use to interact with the 'surveys' collection
const Survey = mongoose.model('Survey', surveySchema);

// Export the model so we can use it in other files (like our routes)
export default Survey;