import express from "express";
import path from "path";

const __dirname = path.resolve();
const router = express.Router();
const join = path.join;

const staticRoute = router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(join(__dirname, "views/index.html"));
});

const notFoundRoute = (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(join(__dirname, "views/404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
};

export { staticRoute, notFoundRoute };
