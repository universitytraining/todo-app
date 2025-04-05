const jsonServer = require('json-server');
const auth = require('json-server-auth');
const app = jsonServer.create();
const router = jsonServer.router('./data/db.json');

app.use(auth);

const middlewares = jsonServer.defaults();
app.use(middlewares);

app.use(router);

const port = 8787;
app.listen(port, () => {
  console.log(`json-server runnin on ${port}`);
});

