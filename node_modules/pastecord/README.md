# pastecord

#### A [Pastecord](https://pastecord.com/) API wrapper for uploading documents.

### Installation

---

#### npm

```
$ npm i pastecord
```

### Usage

---

Construct a new client and use `client.publish` to create a new document.

```js
const Pastecord = require("pastecord");
const Client = new Pastecord();

(async () => {
    const Data = await Client.publish("Hello, World!");
    // Client.publish() returns an object containing 'url' and 'key'
    console.log(Data.url);
})();
```

### Mini-Docs

---

##

`Client.publish(body: any)`

**Publishes a new document to Pastecord.**

Returns an object containing the url of the document and the identifier (key) of the document.

#### Example:

```
Object {
    url: "https://pastecord.com/ikunisirym",
    key: "ikunisirym",
}
```

### Author

---

@ Justin K. (Aerosphia)

### License

---

MIT License
