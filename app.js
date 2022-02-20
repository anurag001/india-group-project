const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routers/users');
const feedRouter = require('./routers/feeds');
app.use(bodyParser.json());

app.use('/health-check', (req, res) => {
    res.send('Working');
});

app.use('/users',userRouter);
app.use('/feeds',feedRouter);

app.listen(8080, ()=>{
    console.log('App running on 8080 PORT');
});