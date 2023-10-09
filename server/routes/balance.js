import { app, environment, key } from "../app.js";
import { getAddress, getBalance } from "arweavekit";

app.get("/balance", (req, res) => {
  return Promise
    .resolve()
    .then(() => {
      return getAddress({
        environment,
        key,
      });
    })
    .then((address) => {
      return getBalance({
        options: {
          winstonToAr: true,
        },
        address,
        environment,
        key,
      });
    })
    .then((balance) => {
      res.send(balance);
    });
});
