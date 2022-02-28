const mongoose = require("mongoose");

const connectToMongo = () => {
  const mongoURL =
    "mongodb+srv://fitstreak_by_psa:psa.solutionfest23@cluster0.dulyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  mongoose.connect(mongoURL, () => {
    console.log("connected to mongo cloud");
  });
};

module.exports = { connectToMongo };
