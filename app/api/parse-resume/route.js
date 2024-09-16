import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CHUNK_SIZE = 4000; // Adjust this value as needed

function extractKeyInfo(text) {
  // Basic regex patterns for extraction
  const patterns = {
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
    phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,
    name: /^([A-Z][a-z]+ )+[A-Z][a-z]+$/m,
  };

  let extracted = {};
  for (const [key, pattern] of Object.entries(patterns)) {
    const match = text.match(pattern);
    if (match) extracted[key] = match[0];
  }

  return extracted;
}

function chunkText(text, size) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileContent = await file.text();
    const chunks = chunkText(fileContent, CHUNK_SIZE);

    let parsedData = {
      bioData: {},
      educationData: [],
      experienceData: [],
      skillsData: []
    };

    for (const chunk of chunks) {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a resume parser. Extract key information from the given text and return it as a valid JSON object with the following structure: { bioData: { name, email, phone, address, summary }, educationData: [{ degree, institution, graduationYear }], experienceData: [{ title, company, startDate, endDate, responsibilities }], skillsData: [] }. Do not wrap the JSON in markdown code blocks." },
          { role: "user", content: chunk }
        ],
      });

      try {
        const rawContent = completion.choices[0].message.content;
        const jsonContent = rawContent.replace(/```json\n|\n```/g, '').trim();
        const chunkData = JSON.parse(jsonContent);

        // Merge the chunk data with the existing parsed data
        parsedData.bioData = { ...parsedData.bioData, ...chunkData.bioData };
        parsedData.educationData = [...parsedData.educationData, ...chunkData.educationData];
        parsedData.experienceData = [...parsedData.experienceData, ...chunkData.experienceData];
        parsedData.skillsData = [...new Set([...parsedData.skillsData, ...chunkData.skillsData])];
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        console.log('Raw OpenAI response:', completion.choices[0].message.content);
        // If parsing fails, we'll skip this chunk and continue with the next one
      }
    }

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error parsing resume:', error);
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 });
  }
}
