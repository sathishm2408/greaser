const express = require('express');
const app = express();
const cors = require('cors');
//const path = require('path');
const bodyParser = require('body-parser');
const authRouter = require('./server/routes/index');
const productRouter = require('./server/routes/products');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

app.use('/authService', authRouter);
app.use('/products', productRouter);

// app.use(function(req, res, next) {
//     next();
//   });


// app.use(function (req, res, next) {
//     next(createError(404));
//   });

// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });

app.listen(3005);