const { Configuration, OpenAIApi } = require("openai");

// OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async function (context, req) {
  const message = req.body.message
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user", content: message
    }],
  });

  context.res.json({
      text: completion.data.choices[0].message.content
  });
};
