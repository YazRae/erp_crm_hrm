import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin, callBack) => {
    /*
      In case the usage of postman. add || !origin to the condition >> if (allowedOrigins.indexOf(origin) !== -1 || !origin)
    */

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callBack(null, true);
    } else {
      callBack(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
  optionsSuccessStatus: 200, // 204 errors have problems with TVs and old browsers
};

export default corsOptions;
