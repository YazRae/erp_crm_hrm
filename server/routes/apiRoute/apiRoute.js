import { Router } from "express";
import controllers from "../../controllers/apiControllers/apiController.js";

const router = Router();

const routes = {
  // get requests
  get: ["search", "read/:id", "list", "filter"],

  // post requests
  post: ["create"],

  // patch requests
  patch: ["update/:id", "status/:id"],

  // delete requests
  delete: ["remove/:id"],
};

for (const Model in controllers) {
  for (const requests in routes) {
    routes[requests].map((route) => {
      router[requests](
        `/${Model.toLocaleLowerCase()}/${route}`,
        controllers[Model][route.split("/")[0]]
      );
    });
  }
}

export default router;
