const express = require('express');
const router = express.Router();
const dummyData = require('./dummyData');
const { rateMessage, createPrompt } = require('./openai');

router.post('/', async (req, res) => {
    const { mode, message } = req.body;
    const data = dummyData.find(item => item.mode === mode);
    if (!data) {
        res.json({ message: 'Invalid mode' });
        return;
    }

    try {
        const feedback = await rateMessage(data.promptScorer, message);
        const score = feedback.score;
        if (score > 4) {
            const responseMessage = await createPrompt(data.promptResponder, message);
            res.json({ message: responseMessage, feedback: feedback });
        }
        else {
            res.json({ message: null, feedback: feedback });
        }
    } catch (e) {
        console.error('Error:', e);
    }
});

module.exports = router;
