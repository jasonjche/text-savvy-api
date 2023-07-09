const { openai } = require('./config');

const createChatCompletion = async (messages) => {
    return await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 100,
    });
};

const rateMessage = async (prompt, messageArray) => {
    let lastResponse = "";
    let startingPoint = 0;
    //find the last response in messageArray
    for (let i = messageArray.length - 1; i >= 0; i--) {
        if (messageArray[i].response) {
            lastResponse = messageArray[i].response;
            startingPoint = i + 1;
            break;
        }
    }

    //create a new message array with only the user messages
    const userMessages = [];
    for (let i = startingPoint; i < messageArray.length; i++) {
        if (messageArray[i].message) {
            userMessages.push(messageArray[i].message);
        }
    }
    const formattedMessage = "Previous message: " + lastResponse + "\n" + "User messages: " + userMessages.join("\n");

    const messages = [
        { role: 'system', content: prompt },
        { role: 'user', content: formattedMessage }
    ];
    const responseScore = await createChatCompletion(messages);
    const scoreJSON = responseScore.data.choices[0].message.content;
    return JSON.parse(scoreJSON);
}

const createPrompt = async (prompt, messageArray) => {
    const messages = [{ role: 'system', content: prompt }];
            for (let i = 0; i < messageArray.length; i++) {
                if (messageArray[i].message) {
                    messages.push({ role: 'user', content: messageArray[i].message });
                }
                if (messageArray[i].response) {
                    messages.push({ role: 'assistant', content: messageArray[i].response });
                }
            }
    const response = await createChatCompletion(messages)
    return response.data.choices[0].message.content;
};


module.exports = { createChatCompletion, rateMessage, createPrompt };
