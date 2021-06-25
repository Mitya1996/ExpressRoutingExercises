const express = require('express');
const operations = require('./operations');
const ExpressError = require("./expressError")


const app = express();

app.get('/mean', (req, res, next) => {
    try {
        meanParamStr = req.query.nums;
        if (!meanParamStr) throw new ExpressError("No nums parameter passed.", 400);
        meanParamArr = operations.paramStrToArr(meanParamStr);
        mean = operations.mean(meanParamArr);
        if (isNaN(mean)) throw new ExpressError("Not valid integers.", 400);

        res.json({
            'operation': 'mean',
            'value': mean
        });
    } catch (err) {
        return next(err);
    };
});

app.get('/median', (req, res) => {
    try {
        medianParamStr = req.query.nums;
        median = operations.median(operations.paramStrToArr(medianParamStr))
        res.json({
            'operation': 'median',
            'value': median
        });
    } catch (err) {
        return next(err);
    };
});

app.get('/mode', (req, res) => {
    try {
        modeParamStr = req.query.nums;
        mode = operations.mode(operations.paramStrToArr(modeParamStr))
        res.json({
            'operation': 'mode',
            'value': mode
        });
    } catch (err) {
        return next(err);
    };
});

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
  
    // pass the error to the next piece of middleware
    return next(err);
    });

//generic error handler
app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
});



app.listen(3000, function () {
  console.log('App on port 3000');
})