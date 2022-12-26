import {
  PLAN_ENTRY_MAXLENGTH,
  TEXTAREA_NUMROWS,
  TEXTAREA_NUMCOLS,
  PLAN_PLACEHOLDERS,
} from "../../utils/constants.js";
import "../../components/PlanEntry/GridPlan.css";

import RemainingCharactersText from "./RemainingCharactersText";

import React from "react";

const PlanDefinition = ({
  whichPlan,
  letter,
  attribute,
  planText,
  setPlanText,
  planCharacterCount,
  setPlanCharacterCount,
}) => {
  function showRemainingChars(whichPlan) {
    let diff = PLAN_ENTRY_MAXLENGTH - planCharacterCount[whichPlan];
    let newRemainingText =
      String(diff).padStart(4, "0") + " Remaining Characters";
    let s = String(diff);
    newRemainingText =
      " ".repeat(4 - s.length) + diff + " Remaining Characters";
    console.log(">" + newRemainingText);
    return <p className="leading-whitespace">{newRemainingText}</p>;
  }

  function handleChange(event, whichPlan) {
    let enteredPlan = event.target.value.trim();
    console.log(whichPlan, planText, enteredPlan);
    // Update display with the Remaining Characters
    const updatedText = [...planText];
    updatedText[whichPlan] = enteredPlan;
    console.log(updatedText);
    // Show Entered Text
    setPlanText(updatedText);

    // Show Number Of Characters Remaining
    const updatedCount = [...planCharacterCount];
    console.log(whichPlan, planCharacterCount);
    updatedCount[whichPlan] = enteredPlan.length;
    console.log(whichPlan, updatedCount);
    setPlanCharacterCount(updatedCount);
  }

  return (
    <section className="grid-container">
      <div className="td-goal-letter">
        <div className="goal-letter">{letter}</div>
      </div>
      <div className="td-goal-attribute">
        <div className="goal-attribute">{attribute}</div>
      </div>
      <div className="td-goal-text-entry">
        <div>
          <form>
            <div className="textarea-label">
              <textarea
                className="text-area"
                rows={TEXTAREA_NUMROWS}
                cols={TEXTAREA_NUMCOLS}
                placeholder={PLAN_PLACEHOLDERS[whichPlan]}
                maxLength={PLAN_ENTRY_MAXLENGTH}
                // EG "S-input"
                id={letter + "-input"}
                // EG "S-goal"
                name={letter + "-goal"}
                autoComplete="off"
                value={planText[whichPlan]}
                onChange={(event) => handleChange(event, whichPlan)}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      <div className="td-remaining-and-button">
        <RemainingCharactersText
          maxLength={PLAN_ENTRY_MAXLENGTH}
          remainNum={planCharacterCount[whichPlan]}
          text={showRemainingChars(whichPlan)}
        />
        <div>
          <button className="expand-button">Expand</button>
        </div>
      </div>
    </section>
  );
};

export default PlanDefinition;
