import { addDays, format } from "date-fns";
import { generatePdf } from "./customFunctions.js";
import { Types } from "mongoose";
import bcrypt from "bcrypt";

const customModels = ["Invoice", "Quote", "Payment", "OrderForm"];

/**
 *  Retrieves a single document by id.
 *  @param {string} req.params.id
 *  @returns {Document} Single Document
 */

const read = async (Model, req, res) => {
  try {
    // Find document by id
    const result = await Model.findOne({ _id: req.params.id, removed: false });

    // If no results found, return document not found
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No document found by this id: " + req.params.id,
      });
    } else {
      // Return success resposne
      return res.status(200).json({
        success: true,
        result,
        message: "we found this document by this id: " + req.params.id,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error",
      error: err,
    });
  }
};

/**
 *  Creates a Single document by giving all necessary req.body fields
 *  @param {object} req.body
 *  @returns {string} Message
 */

const create = async (Model, req, res) => {
  try {
    if (req.body.email) {
      const existingModel = await Model.findOne({ email: req.body.email });
      if (existingModel) {
        return res.status(400).json({
          success: false,
          result: null,
          message: "An account with this email already exists.",
        });
      }
    }

    const body = async () => {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }

      if (customModels.includes(Model.modelName)) {
        const { items = [], taxRate = 0, discount = 0 } = req.body;

        // default
        let subTotal = 0,
          taxTotal = 0,
          total = 0,
          credit = 0;

        //Calculate the items array with subTotal, total, taxTotal
        items.map((item) => {
          let total = item["quantity"] * item["price"];
          //sub total
          subTotal += total;
          //item total
          item["total"] = total;
        });

        taxTotal = subTotal * taxRate;
        total = subTotal + taxTotal;

        const bodyObject = req.body;

        bodyObject["subTotal"] = subTotal;
        bodyObject["taxTotal"] = taxTotal;
        bodyObject["total"] = total;
        bodyObject["credit"] = credit;
        bodyObject["items"] = items;
        bodyObject["paymentStatus"] =
          total - discount === credit
            ? "paid"
            : credit > 0
            ? "partially"
            : "unpaid";
        bodyObject["_id"] = new Types.ObjectId();
        bodyObject["pdfPath"] = `${Model.modelName.toLowerCase()}-${
          bodyObject._id
        }.pdf`;

        return bodyObject;
      } else {
        return req.body;
      }
    };

    const doc = await body();

    console.log(doc, "115");

    const result = await Model.create(doc);

    console.log(result, "119");

    // if (customModels.includes(Model.modelName)) {
    //   generatePdf(
    //     Model.modelName,
    //     { filename: Model.modelName.toLowerCase(), format: "A4" },
    //     result
    //   );
    // }

    // Returning successfull response
    return res.status(200).json({
      success: true,
      result,
      message: "Successfully Created the document in Model ",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error!!",
      error: err,
    });
  }
};

/**
 *  Updates a Single document
 *  @param {object, string} (req.body, req.params.id)
 *  @returns {Document} Returns updated document
 */

const update = async (Model, req, res) => {
  try {
    const { email } = req.body;

    if (email) {
      const existingModel = await Model.findOne({ email: email });

      if (existingModel && existingModel._id != req.params.id) {
        console.log(existingModel, "159");
        return res
          .status(400)
          .json({ message: "An account with this email already exists." });
      }
    }
    const body = () => {
      let bodyObject = req.body;
      if (customModels.includes(Model.modelName)) {
        const { items = [], taxRate = 0, discount = 0 } = req.body;

        let subTotal = 0,
          taxTotal = 0,
          total = 0,
          credit = 0;

        items.map((item) => {
          let total = item["quantity"] * item["price"];
          //sub total
          subTotal += total;
          //item total
          item["total"] = total;
        });

        taxTotal = subTotal * taxRate;
        total = subTotal + taxTotal;

        bodyObject["subTotal"] = subTotal;
        bodyObject["taxTotal"] = taxTotal;
        bodyObject["total"] = total;
        bodyObject["credit"] = credit;
        bodyObject["items"] = items;
        bodyObject["paymentStatus"] =
          total - discount === credit
            ? "paid"
            : credit > 0
            ? "partially"
            : "unpaid";
      }

      return bodyObject;
    };

    const doc = body();

    console.log(doc, "204");

    const result = await Model.findOneAndUpdate(
      { _id: req.params.id, removed: false },
      doc,
      {
        new: true, // return the new result instead of the old one
        runValidators: true,
      }
    ).exec();

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No document found by this id: " + req.params.id,
      });
    } else {
      return res.status(200).json({
        success: true,
        result,
        message: "we update this document by this id: " + req.params.id,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error",
      error: err,
    });
  }
};

/**
 *  Delete a Single document
 *  @param {string} req.params.id
 *  @returns {string} Message response
 */

const remove = async (Model, req, res) => {
  try {
    // Find the document by id and delete it
    let updates = {
      removed: true,
    };
    // Find the document by id and delete it
    const result = await Model.findOneAndUpdate(
      { _id: req.params.id, removed: false },
      { $set: updates },
      {
        new: true, // return the new result instead of the old one
      }
    ).exec();
    // If no results found, return document not found
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No document found by this id: " + req.params.id,
      });
    } else {
      return res.status(200).json({
        success: true,
        result,
        message: "Successfully Deleted the document by id: " + req.params.id,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error",
      error: err,
    });
  }
};

/**
 *  Get all documents of a Model
 *  @param {Object} req.params
 *  @returns {Object} Results with pagination
 */

const list = async (Model, req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.items) || 10;
  const skip = page * limit - limit;

  try {
    //  Query the database for a list of all results

    const resultsPromise = Model.find({ removed: false })
      .skip(skip)
      .limit(limit)
      .sort({ created: "desc" })
      .populate();
    // Counting the total documents
    const countPromise = Model.count({ removed: false });
    // Resolving both promises
    const [result, count] = await Promise.all([resultsPromise, countPromise]);

    // console.log(result);
    // Calculating total pages
    const pages = Math.ceil(count / limit);

    // Getting Pagination Object
    const pagination = { page, pages, count };
    if (count > 0) {
      return res.status(200).json({
        success: true,
        result,
        pagination,
        message: "Successfully found all documents",
      });
    } else {
      return res.status(203).json({
        success: false,
        result: [],
        pagination,
        message: "Collection is Empty",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

/**
 *  Searching documents with specific properties
 *  @param {Object} req.query
 *  @returns {Array} List of Documents
 */

const search = async (Model, req, res) => {
  try {
    if (req.query.q === undefined || req.query.q.trim() === "") {
      return res
        .status(202)
        .json({
          success: false,
          result: [],
          message: "No document found by this request",
        })
        .end();
    }
    const fieldsArray = [
      "name",
      "surname",
      "birthday",
      "company",
      "managerSurname",
      "managerName",
      "number",
      "codeName",
      "displayName",
    ];

    const fields = { $or: [] };

    for (const field of fieldsArray) {
      fields.$or.push({ [field]: { $regex: new RegExp(req.query.q, "i") } });
    }

    let results = await Model.find({ fields })
      .where("removed", false)
      .limit(10);

    if (results.length >= 1) {
      return res.status(200).json({
        success: true,
        result: results,
        message: "Successfully found all documents",
      });
    } else {
      return res
        .status(202)
        .json({
          success: false,
          result: [],
          message: "No document found by this request",
        })
        .end();
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error",
      error: err,
    });
  }
};

/**
 *  Getting documents with filters
 *  @param {Object} req.query
 *  @returns {Array} List of Documents
 */

const filter = async (Model, req, res) => {
  try {
    if (req.query.filter === undefined || req.query.equal === undefined) {
      return res.status(403).json({
        success: false,
        result: null,
        message: "filter not provided correctly",
      });
    }
    const result = await Model.find({ removed: false })
      .where(req.query.filter)
      .equals(req.query.equal);
    return res.status(200).json({
      success: true,
      result,
      message:
        "Successfully found all documents where equal to : " + req.params.equal,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error",
      error: err,
    });
  }
};
const status = async (Model, req, res) => {
  try {
    if (req.query.enabled == "true" || req.query.enabled == "false") {
      let updates = {
        enabled: req.query.enabled,
      };
      // Find the document by id and delete it
      const result = await Model.findOneAndUpdate(
        { _id: req.params.id, removed: false },
        { $set: updates },
        {
          new: true, // return the new result instead of the old one
        }
      ).exec();
      // If no results found, return document not found
      if (!result) {
        return res.status(404).json({
          success: false,
          result: null,
          message: "No document found by this id: " + req.params.id,
        });
      } else {
        return res.status(200).json({
          success: true,
          result,
          message:
            "Successfully update status of this document by id: " +
            req.params.id,
        });
      }
    } else {
      return res
        .status(202)
        .json({
          success: false,
          result: [],
          message: "couldn't change admin status by this request",
        })
        .end();
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error",
      error: err,
    });
  }
};

const getFilterbyDate = async (Model, req, res) => {
  try {
    const { filter, equal, date } = req.params;
    let day = null;
    if (date == "today") {
      day = format(new Date(), "ddMMyyyy");
    } else if (date == "tomorrow") {
      day = format(addDays(now, 1), "ddMMyyyy");
    } else {
      day = format(date, "ddMMyyyy");
    }

    const result = await Model.find({ removed: false })
      .where(filter)
      .equals(equal)
      .where("date")
      .equals(day);

    if (result.length == 0) {
      return res.status(400).json({
        success: false,
        result: [],
        message: "Date not found for this api",
      });
    }

    return res.status(200).json({
      success: true,
      result,
      message: "Successfully found all documents where equal to : " + equal,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error",
      error: err,
    });
  }
};

export {
  read,
  create,
  remove,
  update,
  list,
  search,
  filter,
  status,
  getFilterbyDate,
};
