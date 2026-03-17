const axios = require('axios');

async function askOpenAI() {
  const prompt = `Elabore 5 palavras aleatórias distintas e seus respectivos significados e um exemplo de uso. Retorne um JSON no formato [{word, description, useCase}]. Não adicione quebras de linhas, não repita palavras, use palavras criativas.`;

  const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent', {
    system_instructions: {
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
      temperature: 1.0
    }
  }, {
    headers: {
      'x-goog-api-key': `${process.env.GEMINI_API_KEY}`
    }
  });

  const message = response.data.choices[0].message.content.trim();

  return {
    answer: message,
    timestamp: new Date().toISOString()
  };
}

module.exports = { askOpenAI };