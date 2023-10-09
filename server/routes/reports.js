import { app, environment, key } from "../app.js";
import { createTransaction, getAddress } from "arweavekit";

const reports = [];

app.get("/reports", (req, res) => {
  return res.json(reports);
});

app.post("/reports", (req, res) => {
  return Promise
    .resolve()
    .then(() => {
      return getAddress({
        environment,
        key,
      });
    })
    .then((address) => {
      return createTransaction({
        environment,
        data: "hello",
        key,
        type: "data",
      });
    })
    .then((transaction) => {
      console.log({ transaction });

      reports.push(transaction);

      res.json({
        success: true,
        transaction,
      });
    })
    .catch((error) => {
      console.log({ error });
      res.json({
        success: false,
      });
    });
});
