// PlanMainMenu;
// <PlanMainMenu planTable = {thePlanTable}/>

import React from "react";
import { useState } from "react";
//import PlanDefinition from "./PlanDefinition";

const PlanMainMenu = ({thePimaryKeys, thePlanTable}) => {
  const [planTable, setPlanTable] = useState(thePlanTable);
  const [primaryKeys, setPrimaryKeys] = useState(thePimaryKeys)
  console.log(thePlanTable)
  console.log(thePimaryKeys)
console.log(planTable)
console.log(primaryKeys)
  
  return (null);
}

export default PlanMainMenu;