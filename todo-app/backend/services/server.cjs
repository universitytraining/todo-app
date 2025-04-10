const jsonServer = require('json-server');
const auth = require('json-server-auth');
const app = jsonServer.create();
const router = jsonServer.router('./data/db.json');

const FRONTEND_PROD_URL = 'https://universitytraining.github.io';
const RENDER_BACKEND_URL = 'https://tasklist-vdgm.onrender.com'; 

app.use((req, res, next) => {
    let allowedOrigin = 'http://localhost:5173'; 

    if (process.env.NODE_ENV === 'production') {
        const origin = req.headers.origin;
        if (origin === FRONTEND_PROD_URL || origin === RENDER_BACKEND_URL) {
            allowedOrigin = origin;
        }
    }

    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.db = router.db;

app.use(auth);

const middlewares = jsonServer.defaults();
app.use(middlewares);

app.use(router);

const port = process.env.PORT || 8787;
app.listen(port, () => {
    console.log(`json-server running on port ${port}`);
});