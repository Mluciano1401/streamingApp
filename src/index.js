const http = require('./app');

http.listen(3000, () => {
    console.log("Server is running in http://localhost:3000");
})