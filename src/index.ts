import * as express from "express";
import * as bodyParser from "body-parser";

import controllers from "./controllers";

const app = express();
const port = process.env.PORT || 9229;

app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {
  res.json('CT TEMP API');
});

app.use('/api', controllers);

app.listen(port);

console.log("Server Listening on port: ", port);

export default app;