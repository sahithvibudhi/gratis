# gratis
An open-source, easy-to-customize back-end service right out of the box. Write your front-end let gratis handle the Back-end. ⚡

# 🚀 Quick Start

1. Install Gratis

```
npm install -g gratis-server
```

2. Start server

```
gratis-server --port 9000 --dburl mongodb://localhost:32770 --log true
```

That's it 💁‍♂️

# 📖 How to Use?

To Insert Records:

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"t-series","subscribers":"78,000,000", "region":"asia"}' \
  http://localhost:3000/youtube/channels
```

To Fetch Records:

```
curl --request GET \
  http://localhost:3000/youtube/channels
# returns max 20 records
```

Querying data
```
curl --request GET \
  http://localhost:3000/youtube/channels?region=asia&sort=-subscribers&limit=5
```

To Update Records:
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"t-series","subscribers":"79,000,000", "region":"asia"}' \
  http://localhost:3000/youtube/channels?name=t-series
```

To Delete Recrods:
```
curl --request DELETE \
  http://localhost:3000/youtube/channels?name=t-series
```

## How to Set up?
```
git clone https://github.com/sahithvibudhi/gratis.git
cd gratis
npm install
node index.js
```

NOTE: Gratis needs a MongoDB server to store the data 💾.

To run it on a specific port. use:
```
node index.js --port 9000
```

To pass the database connection URL. use:
```
node index.js --port 9000 --dburl mongodb://localhost:32770 
```

To enable logging, use:
```
node index.js --port 9000 --dburl mongodb://localhost:32770 --log true
```

Gratis comes with a GUI to create new apps, to enable, use:
```
node index.js --dburl mongodb://localhost:32770 --log true --dashboard true
```

---

<center> Built with ❤️ for front-end Developers </center>