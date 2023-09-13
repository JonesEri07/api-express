import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.Promise = global.Promise;

// Local DB
mongoose.connect('mongodb://127.0.0.1/CRMdb', {
    useNewUrlParser: true
});

// Atlas replica DB
// mongoose.connect(process.env.DB_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// JWT setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET, (err, decode) => {
            if (err) {
                req.user = undefined;
            }
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
})

routes(app);

app.get('/', (req, res) => {
    res.send('hi');
});

app.listen(PORT, () => {});

console.log(`Server is listening on port: ${PORT}`);

/**
 * 
 * MongoDB local commands
 * 
 * brew services start mongodb-community@7.0
 * 
 * brew services stop mongodb-community@7.0
 * 
 * brew services list // checks if running
 */