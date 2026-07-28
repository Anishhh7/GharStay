import ai from '../Config/gemini.js';
 
const askGemini = async (prompt) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: prompt,
  });
 

  return response.text;
};
 
export default askGemini;
 