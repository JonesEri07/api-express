import express from 'express';

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('hello from api');
});

app.listen(PORT, () => {});

console.log(`Server is listening on port: ${PORT}`);