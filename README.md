# Mimey
File Listener Bot

## 1
```
git clone https://github.com/DracTheDino/Mimey.git
```
## 2
```
npm install
```
## 3
```
node src/index.js
```
or if you're developing and tired of doing the above command again and again
```
nodemon src/index.js
```
## 4
Configuration commands will be added in the future. As of now, you will have to work with a `config.json` file. Make a new `config.json` if it doesn't already exist and add this to it, replacing `<server_id>` with your server's ID and `<channel_id>` with the channel where you want to log usage of Mimey. (I am sorry you have to go through this pain.) That's it.
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