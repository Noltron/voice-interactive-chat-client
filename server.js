const express = require('express');
const axios = require('axios');
const whisper = require('whisper-api-client');

export const app = express();
app.use(express.jws());

const openaiApiKey = 'your-openai-api-key';
const openaiApiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const geminiApiKey = 'your-gemini-api-key';
const geminiApiUrl = 'https://api.gemini.io/v1/chat';
const whisperApiKey = 'your-whisper-api-key';

app.post('/openai', async (req, res) => {
    try {
        const response = await axios.post(openaiApiUrl, req.body, {
            headers: {
              'Authorization': `Bearer ${openaiApiKey}`
          }
        });
        res.json(response data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/gemini', async (req, res) => {
    try {
        const response = await axios.post(geminiApiUrl, req.body, {
            headers: {
              'Authorization': `Bearer ${geminiApiKey}`
          }
        });
        res.json(response data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/stt', async (req, res) => {
    try {
        const audioBuffer = req.body.audio;
        const text = await whisper.stt(audioBuffer, whisperApiKey);
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/tts', async (req, res) => {
    try {
        const { text } = req.body;
        const audioBuffer = await whisper.tts(text, whisperApiKey);
        res.json({ audio: audioBuffer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = 3066;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});