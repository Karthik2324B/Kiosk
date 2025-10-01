import express from 'express';
import Survey from '../models/survey.model.js';


const router = express.Router();


router.post('/surveys', async (req, res) => {
  try {
    const { sessionId, answers } = req.body;

    if (!sessionId || !answers) {
      return res.status(400).json({ message: 'Session ID and answers are required.' });
    }

    const newSurvey = new Survey({ sessionId, answers });
    await newSurvey.save();

    res.status(201).json({ message: 'Survey data saved successfully!' });
  } catch (error) {
    console.error('Error saving survey:', error);
    res.status(500).json({ message: 'Failed to save survey data.' });
  }
});


export default router;