const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({ apiKey: process.env.OPEN_IA_API_KEY })
const openai = new OpenAIApi(configuration);


module.exports = async (code) => {
  const prompt = `Please review the following code and provide feedback:\n\n${code}`
  const { data } = await openai.completions.create({
    engine: 'text-davinci-002',
    prompt,
    max_tokens: 1024,
    n: 1,
    stop: '\n',
  })

  return data.choices[0].text
}
