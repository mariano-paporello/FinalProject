import MongoStore from "connect-mongo";
import config from "../config/index";

const unSegundo = 1000;
const unMinuto = unSegundo * 60;
const unaHora = unMinuto * 60;
export const storeOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_URL,
    crypto: {
      secret: config.CRYPTO_SECRET,
    },
  }),
  secret: config.SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: unaHora,
  },
};
