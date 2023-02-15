const mongoose = require("mongoose")
const config = require("../config/index");


const initMongoDB = async () => {
  try {
    mongoose.set('strictQuery', true)
     mongoose.connect(config.default.MONGO_ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('YA ESTOY CONECTADO')
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};


export default initMongoDB 