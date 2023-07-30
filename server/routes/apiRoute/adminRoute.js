import { Router } from "express";
import {
  adminsList,
  adminProfile,
  adminPhoto,
  adminsFilter,
  adminSearch,
  adminStatus,
  adminRemove,
  adminUpdatePassword,
  adminUpdate,
  adminRead,
  adminCreate,
} from "../../controllers/apiControllers/adminController.js";
import { adminPhotoUpload, bodyPath } from "../../middleware/index.js";

const router = Router();

const routes = {
  // get requests
  get: {
    search: adminSearch,
    "read/:id": adminRead,
    list: adminsList,
    filter: adminsFilter,
    profile: adminProfile,
  },

  // post requests
  post: {
    create: [[adminPhotoUpload.single("photo"), bodyPath], adminCreate],
    photo: [[adminPhotoUpload.single("photo"), bodyPath], adminPhoto],
  },

  // patch requests
  patch: {
    "update/:id": adminUpdate,
    "status/:id": adminStatus,
    "password-update/:id": adminUpdatePassword,
  },

  // delete requests
  delete: { "remove/:id": adminRemove },
};

for (const request in routes) {
  for (const route in routes[request]) {
    router[request](`/admin/${route}`, routes[request][route]);
  }
}

export default router;
