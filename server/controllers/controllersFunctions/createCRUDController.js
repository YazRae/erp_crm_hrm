import * as controllers from "./curdControllers.js";

const createCRUDController = (Model) => {
  let crudMethods = {};

  for (const controller in controllers) {
    crudMethods[controller] = async (req, res) => {
      controllers[controller](Model, req, res);
    };
  }

  return crudMethods;
};
export default createCRUDController;
