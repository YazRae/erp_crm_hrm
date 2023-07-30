const bodyPath = (req, res, next) => {
  if (req.file) {
    req.body[req.file.fieldname] = req.file.path.replace("public/", "");
  }

  next();
};

export default bodyPath;
