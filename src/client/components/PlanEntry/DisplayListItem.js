import React from "react";
import { monthNames } from "../../utils/constants.js";

const PREAMBLE_SIZE = 300;

const DisplayListItem = ({ theIndex, theKey, fiveLines }) => {
  if (theIndex === 0) {
    // This is the exception - this will display CREATE PLAN instead
    return (
      <div className="main-menu-item">
        <div className="main-menu-date datetime0-colour">
          <>
            <span className="line1">Create</span>
            <span className="line2">Plan</span>
          </>
        </div>
        <div className="new-plan-desc">Click to create a new plan</div>
      </div>
    );
  };

  let [colourClass, theDateAndTime] = createDateDisplay(theIndex, theKey);
  const thePreamble = createPreamble(fiveLines);
  colourClass += " main-menu-date";
  return (
    <>
      <div className="main-menu-item">
        <div className={colourClass}>
          <p className="date-and-time">{theDateAndTime}</p>
        </div>
        <div className="main-menu-description">{thePreamble}</div>
      </div>
      <button className={"delete-button"}>Delete</button>
    </>
  );
};

function createDateDisplay(index, eachKey) {
  // EG USERNAME.20220106.193749
  let [, theDate, theTime] = eachKey.split(".");
  const displayTimeStamp =
    `${theDate.slice(6, 8)} ${
      monthNames[theDate.slice(4, 6) - 1]
    } ${theDate.slice(0, 4)} ` +
    `${theTime.slice(0, 2)}:${theTime.slice(0, 2)}:${theTime.slice(0, 2)}`;
  const theClassName = "datetime" + (index % 4) + "-colour";
  return [theClassName, displayTimeStamp];
}

function createPreamble(fiveLinesArray) {
  let result = "";
  for (let i = 0; i < fiveLinesArray.length; i++) {
    result += fiveLinesArray[i];
    if (result.length > PREAMBLE_SIZE) {
      break;
    }
  }
  return result.slice(0, PREAMBLE_SIZE) + " ...";
}

export default DisplayListItem;
