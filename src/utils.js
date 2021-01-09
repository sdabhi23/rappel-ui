import { clear } from "idb-keyval";
import constants from "./constants";

export const verifyCreds = () => {
  const rappelToken = localStorage[constants.STORAGE_NAME];
  if (rappelToken !== undefined) {
    return true;
  } else {
    return false;
  }
};

export const logout = (callback) => {
  const rappelToken = localStorage[constants.STORAGE_NAME];
  fetch(constants.API_BASE + "auth/logout/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + rappelToken,
    },
  }).then((response) => {
    if (response.status === 204) {
      localStorage.removeItem(constants.STORAGE_NAME);
      callback(false);
    } else {
      clear();
      callback(true);
    }
  });
};

export const pickTagTextColor = (bgColor) => {
  if (bgColor === null) {
    return "black";
  }
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 150 ? "black" : "white";
};
