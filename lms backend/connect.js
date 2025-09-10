const mongoose = require('mongoose');
 //URL="mongodb://localhost:27017/lms3";
URL="mongodb+srv://digvijay:digvijay@cluster0.yisihts.mongodb.net/lms"

const connect = () => {
    try {
        const respone = mongoose.connect(URL);
        console.log("Database connect");
        
        
    } catch (error) {
       console.log(error);
        
    }

}

module.exports = connect;