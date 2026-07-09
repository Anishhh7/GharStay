const dotenv = require('dotenv');

const app = require('./app');

const port = (process.env.PORT = process.env.port || 3000)
app.listen(port, () => {
    console.log("server connected!!");
})