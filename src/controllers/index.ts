import * as express from "express";

const controllers = express.Router();

import LocationService from "../services/LocationService";

controllers.post("/locations/get-closest", async (req: express.Request, res: express.Response) => {
  const result = await LocationService.getClosestLocationByAddress(req.body.address);
  res.json(result);
});


export default controllers;