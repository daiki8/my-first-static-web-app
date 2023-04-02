const { Configuration, OpenAIApi } = require("openai");

// OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async function (context, req) {
  let result = ''

  if (req.body) {

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user", content: req.body.message
      }],
    });
    result = completion.data.choices[0].message.content
  } else {
    result = "No message provided"
  }

  context.res.json({
      text: result
  });
};
