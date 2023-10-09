import { app, port } from "./app.js";
import "./routes/balance.js";
import "./routes/reports.js";

app.get("/", (req, res) => {
  console.log("Incoming request");
  res.end("Got.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
