import Room from '../models/roomModel.js';
import Package from '../models/pacakageModel.js';
import askGemini from './Gemini-ask.js';

const getGeminiAnswer = async (message) => {
  const room = await Room.find().select('roomName price description amenities');
  const roomText = room
    .map(
      (r) =>
        `${r.roomName}: Rs.${r.price}/night. ${r.description}.Amenities:${r.amenities.join(' , ')}`
    )
    .join('\n');

  const pacakges = await Package.find().select(
    'name price description duration'
  );

  const packageText = pacakges
    .map(
      (p) =>
        `${p.name}: Rs.${p.price}. ${p.description}. duration:${p.duration}`
    )
    .join('\n');

  const prompt = `You are a friendly customer service assistant for GharStay resort.
Answer the guest's question using ONLY the information provided below.
If you don't know the answer from this information, politely say you're
not sure and suggest they contact the resort directly.
Available rooms:
${roomText}
Available packages:
${packageText}

Guest's question: ${message}`;

  try {
    const answer = await askGemini(prompt);
    return answer
  } catch (err) {
    return 'I could not process that right now. Please contact us directly.';
  }
};

export default getGeminiAnswer;
