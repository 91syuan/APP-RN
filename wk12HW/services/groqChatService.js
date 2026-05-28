import axios from 'axios';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.1-8b-instant';


export async function fetchGroqChatResponse(messages) {
  
  const key = "YOUR_GROQ_API_KEY"; 

  if (!key) {
    return '請設定您的 Groq API KEY。';
  }

  try {
    const { data } = await axios.post(
      GROQ_URL,
      { 
        model: DEFAULT_MODEL, 
        messages: messages
      },
      {
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        timeout: 120000,
      }
    );

    const content = data?.choices?.[0]?.message?.content;
    return content ? content.trim() : '';

  } catch (error) {
    return '連線失敗，請檢查網路或 API KEY 設定。';
  }
}