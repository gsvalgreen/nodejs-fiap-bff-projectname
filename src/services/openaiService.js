const axios = require('axios');

async function askOpenAI() {
  const prompt = `Elabore 5 palavras aleatórias distintas e seus respectivos significados e um exemplo de uso. Retorne um JSON no formato [{word, description, useCase}]. Não adicione quebras de linhas, não repita palavras, use palavras criativas.`;

  const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent', {
    system_instruction: {
      parts: [
        { text: 'Responda somente questões relacionadas ao ensino de inglês.' }
      ]
    },
    contents: [{
      parts: [
        { text: prompt }
      ]
    }],
    generationConfig: {
      temperature: 2.0
    }
  }, {
    headers: {
      'x-goog-api-key': `${process.env.GEMINI_API_KEY}`
    }
  });

  const message = response.data.candidates[0].content.parts[0].text.trim();

  return {
    answer: message,
    timestamp: new Date().toISOString()
  };
}

module.exports = { askOpenAI };