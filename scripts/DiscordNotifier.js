require('dotenv').config();

const msg = {
    content: process.env.COMMIT_MESSAGE
};

fetch(process.env.DISCORD_RELEASE_BOT_HOOK, {
    method: 'POST',
    body: JSON.stringify(msg),
    headers: new Headers({
      "Content-Type": "application/json",
    })
});