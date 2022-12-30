import React from "react";
// import { useState } from "react";
import "../../components/PlanEntry/PlanMainMenu.css";
import DisplayListItem from "./DisplayListItem.js"
// const PREAMBLE_SIZE = 300;

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
        return (
          <li className="main-menu-item-container" key={eachKey}>
            <DisplayListItem
              theIndex={index}
              theKey={eachKey}
              fiveLines={preambleArray[index]}
            />
          </li>
        );
      })}
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

export default PlanMainMenu;