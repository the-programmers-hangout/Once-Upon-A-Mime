# Once Upon A Mime

File listener bot for Discord written in Sapphire, a Discord.js framework.

## 1. Clone the repo

```
git clone https://github.com/the-programmers-hangout/Once-Upon-A-Mime.git
```

## 2. Install dependencies

```
npm install
```

## 3. Configuration

The first thing to do is to add a `.env` file and add your bot token from your Discord developer portal page (see `.env.example` file).

Configuration commands will be added in the future. As of now, you will have to work with a `config.json` file (see `config.json.example` for an example config file, you can use it as a base). Update `server_id` and `channel_id` in the file and update the `whitelist` and `uploadableMimes` fields as you see fit.

## 4. Run the bot

```
node src/index.js
```

or if you're tired of doing the above command again and again

```
npm i -g nodemon
nodemon src/index.js
```
