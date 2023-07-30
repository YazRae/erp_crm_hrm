import createCRUDController from "../controllersFunctions/createCRUDController.js";
import * as Models from "../../models/index.js";

const controllers = {};

// console.log(Models);

for (const Model in Models) {
  controllers[Model] = createCRUDController(Models[Model]);
}

export default controllers;
