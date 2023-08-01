import * as actionTypes from "./types";
import { lazy } from "react";

const contextActions = (dispatch, entity = null) => {
  return {
    navMenu: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_NAV_MENU });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_NAV_MENU });
      },
      collapse: () => {
        dispatch({ type: actionTypes.COLLAPSE_NAV_MENU });
      },
    },
    searchConfig: {
      Admin: {
        displayLabels: ["name", "surname"],
        outputValue: "_id",
        path: "admin",
      },
      Client: {
        displayLabels: ["company"],
        outputValue: "_id",
        path: "client",
      },
      Employee: {
        displayLabels: ["name", "surname"],
        outputValue: "_id",
        path: "employee",
      },
      Invoice: {
        // displayLabels: ["paymentInvoice"],
        outputValue: "company",
        path: "invoice",
      },
      Item: {
        displayLabels: ["company"],
        outputValue: "company",
        path: "item",
      },
      Payment: {
        displayLabels: ["number"],
        outputValue: "_id",
        path: "payment",
      },
      PaymentMode: {
        displayLabels: ["name"],
        outputValue: "_id",
        path: "paymentMode",
      },
      Quote: {
        displayLabels: ["name", "surname"],
        outputValue: "_id",
        path: "quote",
      },
      Role: {
        displayLabels: ["role", "displayName"],
        outputValue: "_id",
        path: "role",
      },
      Suppliers: {
        displayLabels: ["company"],
        outputValue: "company",
        path: "suppliers",
      },
    },
  };
};

export default contextActions;
