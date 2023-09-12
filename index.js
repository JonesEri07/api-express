import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://127.0.0.1/CRMdb', {
//     useNewUrlParser: true
// });

mongoose.connect();

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(process.env.DB_URL));

routes(app);

app.get('/', (req, res) => {
    res.send('hello from api');
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