import React from "react";
import { useState } from "react";
import PlanDefinition from "./PlanDefinition";
import { monthNames } from "../../utils/constants.js";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import * as fs from "fs-web";

/* EG FOR new Date("2022-03-01" 
filenameTimeStamp => USERNAME:20220201:000000 - This is used as the unique key for the Plan SQL records 
displayTimeStamp => 01 Mar 2022 00:00:00  - shown onscreen
*/

const currentTimeStamp = new Date(); // Current Date and Time
const dayNumber = currentTimeStamp.getUTCDate(); // Day
// getUTCMonth() is zero-based value (where zero indicates the first month of the year).
// So January is ZERO
const monthNumber = currentTimeStamp.getUTCMonth(); // Month
const yearNumber = currentTimeStamp.getUTCFullYear(); // Year
const hoursNumber = currentTimeStamp.getUTCHours(); // Hours
const minutesNumber = currentTimeStamp.getUTCMinutes(); // Minutes
const secondsNumber = currentTimeStamp.getUTCSeconds(); // Second

// EG USERNAME:20221122:184715

const filenameTimeStamp =
  `USERNAME:${yearNumber}${String(monthNumber).padStart(2, "0")}${String(
    dayNumber
  ).padStart(2, "0")}:` +
  `${String(hoursNumber).padStart(2, "0")}${String(minutesNumber).padStart(
    2,
    "0"
  )}` +
  `${String(secondsNumber).padStart(2, "0")}`;

// EG USERNAME:20221122:184715

const displayTimeStamp =
  `${String(dayNumber).padStart(2, "0")} ${
    monthNames[monthNumber]
  } ${yearNumber}` +
  ` ${String(hoursNumber).padStart(2, "0")}:${String(minutesNumber).padStart(
    2,
    "0"
  )}:` +
  `${String(secondsNumber).padStart(2, "0")}`;

const discardPlan = () => {
  confirmAlert({
    title: "Please Confirm",
    message: "Are you sure you want to discard the plan that you entered?",
    buttons: [
      {
        label: "Yes",
        onClick: () => discardEnteredPlan(filenameTimeStamp),
      },
      {
        label: "No",
        // Leave Plan Intact
      },
    ],
  });
};

const EnterPlan = () => {
  const [planText, setPlanText] = useState(["", "", "", "", ""]);

  const [planCharacterCount, setPlanCharacterCount] = useState([0, 0, 0, 0, 0]);

  return (
    <div>
      <header className="display-flex">
        <div className="title-header">MY SMART GOALS</div>
        <div className="title-header timestamp-header">{displayTimeStamp}</div>
      </header>
      <section className="grid-container-border">
        <PlanDefinition
          whichPlan={0}
          letter={"S"}
          attribute={"SPECIFIC"}
          planText={planText}
          setPlanText={setPlanText}
          planCharacterCount={planCharacterCount}
          setPlanCharacterCount={setPlanCharacterCount}
        />
        <PlanDefinition
          whichPlan={1}
          letter={"M"}
          attribute={"MEASURABLE"}
          planText={planText}
          setPlanText={setPlanText}
          planCharacterCount={planCharacterCount}
          setPlanCharacterCount={setPlanCharacterCount}
        />
        <PlanDefinition
          whichPlan={2}
          letter={"A"}
          attribute={"ACHIEVABLE"}
          planText={planText}
          setPlanText={setPlanText}
          planCharacterCount={planCharacterCount}
          setPlanCharacterCount={setPlanCharacterCount}
        />
        <PlanDefinition
          whichPlan={3}
          letter={"R"}
          attribute={"RELEVANT"}
          planText={planText}
          setPlanText={setPlanText}
          planCharacterCount={planCharacterCount}
          setPlanCharacterCount={setPlanCharacterCount}
        />
        <PlanDefinition
          whichPlan={4}
          letter={"T"}
          attribute={"TIMEBOUND"}
          planText={planText}
          setPlanText={setPlanText}
          planCharacterCount={planCharacterCount}
          setPlanCharacterCount={setPlanCharacterCount}
        />
      </section>
      <section className="buttons-container">
        <button
          className="button-78"
          onClick={() => discardPlan(filenameTimeStamp)}
        >
          Discard
        </button>
        <button
          className="button-78"
          onClick={() => savePlan(filenameTimeStamp, planText)}
        >
          Save
        </button>
        <button className="button-78">Save & Close</button>
      </section>
    </div>
  );
};

function discardEnteredPlan(planId) {
  alert("deleted " + planId);
}

function savePlan(planId, planText) {
  let filename = planId.replace(/:/g, ""); // EG USERNAME20221126224547
  let jsonData = JSON.stringify(planText);
  fs.writeFile(filename, jsonData)
    .then(function () {
      console.log(filename);
      console.log(jsonData);
      console.log(typeof filename, typeof jsonData);
    })
    .catch((err) => alert(err));
 
  return

}
export default EnterPlan;
