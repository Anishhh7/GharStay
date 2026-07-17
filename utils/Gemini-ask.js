import ai from '../config/gemini.js';

console.log('askGemini is running');
console.log('Model: gemini-2.5-flash-lite');
 
const askGemini = async (prompt) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: prompt,
  });
 
 
  return response.text;
};
 
export default askGemini;
 