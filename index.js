const { app } = require('./config');
const router = require('./routes');

const port = 3001;

app.use('/', router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
