import { Router } from "express";
import {
  List,
  Profile,
  Photo,
  Filter,
  Search,
  Status,
  Remove,
  UpdatePassword,
  Update,
  Read,
  Create,
} from "../../controllers/apiControllers/adminController.js";
import { adminPhotoUpload, bodyPath } from "../../middleware/index.js";

const router = Router();

const routes = {
  // get requests
  get: {
    search: Search,
    "read/:id": Read,
    list: List,
    filter: Filter,
    profile: Profile,
  },

  // post requests
  post: {
    create: [[adminPhotoUpload.single("photo"), bodyPath], Create],
    photo: [[adminPhotoUpload.single("photo"), bodyPath], Photo],
  },

  // patch requests
  patch: {
    "update/:id": Update,
    "status/:id": Status,
    "password-update/:id": UpdatePassword,
  },

  // delete requests
  delete: { "remove/:id": Remove },
};

for (const request in routes) {
  for (const route in routes[request]) {
    router[request](`/admin/${route}`, routes[request][route]);
  }
}

export default router;
