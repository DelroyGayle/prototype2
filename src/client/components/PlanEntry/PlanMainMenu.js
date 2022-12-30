// PlanMainMenu;
// <PlanMainMenu planTable = {thePlanTable}/>
// <PlanMainMenu thePrimaryKeys={primaryKeys} thePlanTable={thePlanTable} />

import React from "react";
import { useState } from "react";
import "../../components/PlanEntry/PlanMainMenu.css";
const PREAMBLE_SIZE = 300;

// <PlanMainMenu thePrimaryKeys={primaryKeys} thePlanTable={thePlanTable} />
const PlanMainMenu = ({ thePrimaryKeys, thePlanTable }) => {
  //console.log();
  //const [planTable, setPlanTable] = useState(thePlanTable);
  //const [primaryKeys, setPrimaryKeys] = useState(thePimaryKeys)

  //console.log(planTable)
  //console.log(primaryKeys)
  //allTheUsersList=[];
  // Create a 'dummy' record for the NEW RECORD OPTION
  console.log(thePlanTable.length, thePrimaryKeys.length);
  console.log(thePrimaryKeys);
  console.log(thePlanTable);
  const keysArray = [...thePrimaryKeys]
  keysArray.unshift(0);
  //thePrimaryKeys.unshift(0);
  const preambleArray = [...thePlanTable];
  preambleArray.unshift("Click to create a new plan.");
  console.log(thePlanTable);
  console.log(keysArray,thePrimaryKeys);
  const orderedList = (
    <ol className="main-menu-items">
      {keysArray.map((eachKey, index) => {
        const theDateAndTime = createDateDisplay(index, eachKey);
        console.log(theDateAndTime, preambleArray[index]);
        const thePreamble = createPreamble(preambleArray[index])
        //const theDateAndTime = "23 Dec 2022 11:11:34"
        return (
          <li className="main-menu-item" key={eachKey}>
            <div className="main-menu-date">
              <p className="date-and-time">{theDateAndTime}</p>
            </div>

            <div className="main-menu-description">
              {thePreamble}
            </div>
            <button className="delete-button">Delete</button>
          </li>
        );
      })}
    </ol>
  );
  const orderedList2 = (
    <ol className="main-menu-items">
      {thePrimaryKeys.map((eachKey, index) => {
        //const theDateAndTime = dateAndTime(index, eachKey);
        return (
          <li className="main-menu-item" key={eachKey}>
            <div className="main-menu-date">
              <p>{eachKey}</p>
            </div>

            <div className="main-menu-preamble">
              TESTING
            </div>
            <button className="delete-button">Delete</button>
          </li>
        );
      })}
      ;
    </ol>
  );
  console.log("OL DONU", orderedList.length,orderedList)

  return (
    <>
      <div className="username-header">USERNAME</div>
      <div className="main-menu-container">
        <div className="main-menu">{orderedList}</div>
      </div>
    </>
  );
};


function createDateDisplay(index, eachKey) {
  if (index === 0) {
    return (
      <>
        <span className="line1">Create</span>{" "}
        <span className="line2">Plan</span>
      </>
    );
  };
  return eachKey;
}

function createPreamble(fiveLinesArray) {
    console.log(fiveLinesArray)
  let result = ""
  for (let i=0;i<fiveLinesArray.length;i++) {
      result += fiveLinesArray[i]
      if (result.length > PREAMBLE_SIZE) {
            break;   
      };
  };  
  return result.slice(0,PREAMBLE_SIZE) + " ...";
}

export default PlanMainMenu;