import React from "react";
import EnterPlan from "./client/components/PlanEntry/EnterPlan";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      {/* <header className="App-header">My Smart Plan</header> */}
      {/* <header className="title-header">My S. M. A. R. T. Plan</header> */}
      <EnterPlan />
    </div>
  );
};

export default App;
