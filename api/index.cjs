const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Transaction = require('./models/Transactions.cjs')
// require('dotenv').config();

const app = express();
const port = 5555;

app.use(cors());
app.use(express.json());

app.post('/api/transactions', async (request, response) => {
    const {
        price,
        name,
        description,
        dateTime
    } = request.body;

    const transaction = await Transaction.create({
        price,
        name,
        description,
        dateTime
    });

    response.json(transaction);
})

app.get('/api/transactions', async (request, response) => {
    const transations = await Transaction.find();
    response.json(transations);
});

mongoose.connect(`mongodb://localhost:27017/money-tracker`)
    .then(() => {
        console.log(`money-tracker is connected to DB`);

        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch(err => console.log('Cannot connect to DB'));