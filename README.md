# gratis
An open-source, easy-to-customize back-end service right out of the box.

## How to Set up?
```
git clone https://github.com/sahithvibudhi/gratis.git
cd gratis
npm install
node index.js
```

NOTE: Gratis needs a MongoDB server to store the data.

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
