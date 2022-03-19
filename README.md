# Mimey

File listener bot for Discord.

## 1. Clone the repo

```
git clone https://github.com/DracTheDino/Mimey.git
```

## 2. Install dependencies

```
npm install
```

## 3. Run the bot

```
node src/index.js
```

or if you're developing and tired of doing the above command again and again

```
nodemon src/index.js
```

## 4. Configuration

The first thing to do is to add a `.env` file and add your bot token from your Discord developer portal page (see `.env.example` file).

Configuration commands will be added in the future. As of now, you will have to work with a `config.json` file (see `.config.json.example` for an example config file, you can use it as a base). Make a new `config.json` if it doesn't already exist and add this to it, replacing `<server_id>` with your server's ID and `<channel_id>` with the channel where you want to log usage of Mimey.

```json
{
  "<server_id>": {
    "logChannel": "<channel_id>",
    "whitelist": [
      "application/octet-stream",
      "video/quicktime",
      "image/gif",
      "video/mp4",
      "image/webp",
      "application/x-matroska",
      "video/3gpp",
      "application/ogg",
      "audio/mp4",
      "audio/vnd.wave",
      "audio/mpeg",
      "image/jpeg"
    ],
    "uploadableMimes": [
      "text/plain",
      "application/javascript",
      "application/xml"
    ]
  }
}
```
