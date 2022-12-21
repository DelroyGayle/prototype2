import React from "react";
// import Search from "./Search.js";
// import SearchResults from "./SearchResults.js";
// import FakeBookings from "./data/fakeBookings.json";

import { useState } from "react";

// Setup
const S_PLAN = 0;
const M_PLAN = 1;
const A_PLAN = 2;
const R_PLAN = 3;
const T_PLAN = 4;
const PLAN_INPUT_IDS = ["S-input", "M-input", "A-input", "R-input", "T-input"];
const PLAN_ENTRY_LIMIT = 1000;
const REMAINING_TEXT_DEFAULT_COLOUR = "#657786";
const LESSTHAN21_COLOUR = "#FF0000"; // Red
const remainingLoc = document.querySelector(".remaining");
//let charCount = 0;
//let tweetTextArea = document.querySelector("textarea"); // The entered plan text area
//tweetTextArea.addEventListener("keyup", checkAndIncrementCharCount);
let planInputs = [];
let theKey;

const EnterPlans = () => {
  //   const search = (searchVal) => {
  //     console.info("TO DO!", searchVal);
  //   };

  const [planText, setPlanText] = useState([[""], [""], [""], [""], [""]]);

  const [planCharacterCount, setPlanCharacterCount] = useState([
    [0],
    [0],
    [0],
    [0],
    [0],
  ]);

  const [remainingText, setRemainingText] = useState([
    [""],
    [""],
    [""],
    [""],
    [""],
  ]);

  const [remainingTextColour, setRemainingTextColour] = useState([
    [REMAINING_TEXT_DEFAULT_COLOUR],
    [REMAINING_TEXT_DEFAULT_COLOUR],
    [REMAINING_TEXT_DEFAULT_COLOUR],
    [REMAINING_TEXT_DEFAULT_COLOUR],
    [REMAINING_TEXT_DEFAULT_COLOUR],
  ]);

  function showRemainingChars(whichPlan, updatedText, charCount) {
    let diff = PLAN_ENTRY_LIMIT - charCount;
    let newRemainingText = String(diff).padStart(3) + " Remaining Characters";
    // show in red if less or equal to 20 characters
    let newRemainingTextColour =
      diff <= 20 ? LESSTHAN21_COLOUR : REMAINING_TEXT_DEFAULT_COLOUR;
    // Show Entered Text
    setPlanText(updatedText);
    // Show Number Of Characters Remaining
    if (planCharacterCount[whichPlan] !== charCount) {
      const updatedCount = [...planCharacterCount];
      updatedCount[whichPlan] = newRemainingText;
      setPlanCharacterCount(updatedCount);
      const updatedRemainingText = [...remainingText];
      updatedRemainingText[whichPlan] = newRemainingText;
      setRemainingText(updatedCount);
      // Show Number Of Characters Remaining Text's Colour
      if (remainingTextColour[whichPlan] !== newRemainingTextColour) {
        const updatedColour = [...remainingTextColour];
        updatedColour[whichPlan] = newRemainingTextColour;
        setRemainingTextColour(updatedCount);
      }
    }
  }

  function checkKeyEvent(event, charCount) {
    /*
   These checks are not exhaustive.
   They are used to check regarding keystrokes, whether they would make any difference 
   to the actual Character Count
   For more information regarding the keycode constants used 
   see https://css-tricks.com/snippets/javascript/javascript-keycodes/  
*/

    const BACKSPACE = 8,
      // TAB = 9,
      SPACE = 32,
      DELETE = 46,
      LEFTWINDOW = 91,
      RIGHTWINDOW = 92,
      SELECT = 93,
      FUNCTIONKEY_F1 = 112,
      SCROLL_LOCK = 145;

    const ZERO = 48,
      ENTER = 13;

    let keyCode = event.which;

    console.log(event.which, keyCode);
    console.log(event);
    if (keyCode === BACKSPACE || keyCode === DELETE) {
      --charCount; // assume character deleted so decrement count
      return charCount;
    }

    if (keyCode === SPACE || keyCode === ENTER) {
      ++charCount;
      return charCount;
    }

    // ignore the following keystrokes including TAB (which is equal to 9)
    if (
      keyCode < ZERO ||
      keyCode === LEFTWINDOW ||
      keyCode === RIGHTWINDOW ||
      keyCode === SELECT ||
      (keyCode >= FUNCTIONKEY_F1 && keyCode <= SCROLL_LOCK)
    ) {
      return charCount;
    }

    // Assume a legitimate character has been entered - increment the count
    ++charCount;
    return charCount;
  }

  function checkAndIncrementCharCount(event, whichPlan, enteredPlan) {
    let charCount;
    if (enteredPlan === "") {
      charCount = 0;
    } else {
      // check whether keystroke ought to be ignored
      charCount = checkKeyEvent(event, planCharacterCount[whichPlan]);
      if (charCount < 1) {
        charCount = 0;
      } else if (charCount > PLAN_ENTRY_LIMIT) {
        charCount = PLAN_ENTRY_LIMIT;
      }
    }

    if (enteredPlan !== planText[whichPlan]) {
      // Update display with the Remaining Characters
      const updatedText = [...planText];
      updatedText[whichPlan] = enteredPlan;
      showRemainingChars(
        whichPlan,
        updatedText,
        charCount,
        setPlanText,
        setPlanCharacterCount
      );
    }
  }

  function handleChange(event, whichPlan) {
    let enteredPlan = event.target.value.trim();
    planInputs[S_PLAN] = event.target.value.trim();
    console.log("ALSO", event.code, event.key);
    checkAndIncrementCharCount(event, whichPlan, enteredPlan);
    // setSearchInput(enteredString);
    console.log(enteredPlan, planInputs[S_PLAN], theKey, theKey.length);
  }

  // onKeyDown handler function
  const keyDownHandler = (event, whichPlan) => {
    console.log(event.code, event.key, PLAN_INPUT_IDS[whichPlan]);
    console.log("DOC", document.getElementById(PLAN_INPUT_IDS[whichPlan]));
    console.log("H>", event.target.value);
    //let enteredPlan = document.getElementById(PLAN_INPUT_IDS[whichPlan]).trim();
    let enteredPlan = event.target.value.trim();
    console.log(enteredPlan, planInputs[S_PLAN]);
    theKey = event.key
  };

  return (
    <div className="App">
      <header className="user-header">
        <table className="table">
          <tr>
            <td className="td-letter-column">
              <section className="goal-letter">S</section>
            </td>
            <td className="td-goal-column">
              <section className="goal-attribute">SPECIFIC</section>
            </td>
            <td className="td-goal-text-entry">
              <div className="form-body">
                <form className="row g-3">
                  <div className="col-auto">
                    <textarea
                      className="text-area"
                      rows="6"
                      cols="90"
                      placeholder="What do you want to do?"
                      maxLength="1000"
                      id="S-input"
                      name="S-goal"
                      autoComplete="off"
                      value={planInputs[S_PLAN]}
                      onChange={(event) => handleChange(event, 0)}
                      onKeyUp={(event) => keyDownHandler(event, 0)}
                    ></textarea>
                  </div>
                </form>
              </div>
            </td>
            <td className="td-remaining">
              <section className="remaining" id="S-remaining"></section>
            </td>
            <td className="td-expand-button edit-buttons">
              <button className="edit">Edit</button>
              {/* <button className="delete">Delete</button> */}
            </td>
          </tr>
          <tr>
            <td className="td-letter-column">
              <section className="goal-letter">M</section>
            </td>
            <td className="td-goal-column">
              <section className="goal-attribute">MEASURABLE</section>
            </td>
            <td className="td-goal-text-entry">
              <div className="form-body">
                <form className="row g-3">
                  <div className="col-auto">
                    <textarea
                      className="text-area"
                      id="M-input"
                      name="M-goal"
                      rows="6"
                      cols="90"
                      placeholder="How will you track your progress?"
                      maxLength="1000"
                    ></textarea>
                  </div>
                </form>
              </div>
            </td>
            <td className="td-remaining">
              <section className="remaining" id="M-remaining"></section>
            </td>
            <td className="td-expand-button edit-buttons">
              <button className="edit">Edit</button>
              {/* <button className="delete">Delete</button> */}
            </td>
          </tr>
          <tr>
            <td className="td-letter-column">
              <section className="goal-letter">A</section>
            </td>
            <td className="td-goal-column">
              <section className="goal-attribute">ACHIEVABLE</section>
            </td>
            <td className="td-goal-text-entry">
              <div className="form-body">
                <form className="row g-3">
                  <div className="col-auto">
                    <textarea
                      className="text-area"
                      id="A-input"
                      name="A-goal"
                      rows="6"
                      cols="90"
                      placeholder="How will you do it?"
                      maxLength="1000"
                    ></textarea>
                  </div>
                </form>
              </div>
            </td>
            <td className="td-remaining">
              <section className="remaining" id="A-remaining"></section>
            </td>
            <td className="td-expand-button edit-buttons">
              <button className="edit">Edit</button>
              {/* <button className="delete">Delete</button> */}
            </td>
          </tr>
          <tr>
            <td className="td-letter-column">
              <section className="goal-letter">R</section>
            </td>
            <td className="td-goal-column">
              <section className="goal-attribute">RELEVANT</section>
            </td>
            <td className="td-goal-text-entry">
              <div className="form-body">
                <form className="row g-3">
                  <div className="col-auto">
                    <textarea
                      className="text-area"
                      id="R-input"
                      name="R-goal"
                      rows="6"
                      cols="90"
                      placeholder="Is this relevant to your life now?"
                      maxLength="1000"
                    ></textarea>
                  </div>
                </form>
              </div>
            </td>
            <td className="td-remaining">
              <section className="remaining" id="R-remaining"></section>
            </td>
            <td className="td-expand-button edit-buttons">
              <button className="edit">Edit</button>
              {/* <button className="delete">Delete</button> */}
            </td>
          </tr>
          <tr>
            <td className="td-letter-column">
              <section className="goal-letter">T</section>
            </td>
            <td className="td-goal-column">
              <section className="goal-attribute">TIMEBOUND</section>
            </td>
            <td className="td-goal-text-entry">
              <div className="form-body">
                <form className="row g-3">
                  <div className="col-auto">
                    <textarea
                      className="text-area"
                      id="T-input"
                      name="T-goal"
                      rows="6"
                      cols="90"
                      placeholder="When do you want to do it?"
                      maxLength="1000"
                    ></textarea>
                  </div>
                </form>
              </div>
            </td>
            <td className="td-remaining">
              <section className="remaining" id="T-remaining"></section>
            </td>
            <td className="td-expand-button edit-buttons">
              <button className="edit">Edit</button>
              {/* <button className="delete">Delete</button> */}
            </td>
          </tr>
        </table>
      </header>
    </div>
  );
};

export default EnterPlans;
