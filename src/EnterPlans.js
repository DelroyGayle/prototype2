import React from "react";
// import Search from "./Search.js";
// import SearchResults from "./SearchResults.js";
// import FakeBookings from "./data/fakeBookings.json";

import { useState, useEffect } from "react";

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

const showRemainingTextMessage = [];
const remainingTextColourClass = [];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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
const filenameTimeStamp =
  `USERNAME:${yearNumber}${String(monthNumber).padStart(2, "0")}${String(dayNumber).padStart(2, "0")}:` +
  `${String(hoursNumber).padStart(2, "0")}${String(minutesNumber).padStart(2,"0")}` +
  `${String(secondsNumber).padStart(2, "0")}`;
const displayTimeStamp = `${String(dayNumber).padStart(2, "0")} ${monthNames[monthNumber]} ${yearNumber}` +
                         ` ${String(hoursNumber).padStart(2, "0")}:${String(minutesNumber).padStart(2,"0")}:` +
                         `${String(secondsNumber).padStart(2, "0")}`;
  
// EG USERNAME:20221122:184715
const EnterPlans = () => {
  //   const search = (searchVal) => {
  //     console.info("TO DO!", searchVal);
  //   };

  const [planText, setPlanText] = useState(["", "", "", "", ""]);

  const [planCharacterCount, setPlanCharacterCount] = useState([0, 0, 0, 0, 0]);

  // const [remainingNumber, setRemainingNumber] = useState([
  //   PLAN_ENTRY_LIMIT,
  //   PLAN_ENTRY_LIMIT,
  //   PLAN_ENTRY_LIMIT,
  //   PLAN_ENTRY_LIMIT,
  //   PLAN_ENTRY_LIMIT
  // ]);

  const [remainingNumber, setRemainingNumber] = useState(null);

  const [remainingTextColour, setRemainingTextColour] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);

  function showRemainingChars(whichPlan, updatedText, charCount) {
    console.log("S+", whichPlan, updatedText, planText);
    charCount = updatedText[whichPlan].length;
    let diff = PLAN_ENTRY_LIMIT - charCount;
    let newRemainingText = String(diff).padStart(3) + " Remaining Characters";
    // show in red if less or equal to 20 characters
    // let newRemainingTextColour =
    //   diff <= 20 ? LESSTHAN21_COLOUR : REMAINING_TEXT_DEFAULT_COLOUR;
    let newRemainingTextColour = diff > 20;

    // Show Entered Text
    setPlanText(updatedText);
    // Show Number Of Characters Remaining
    console.log(
      charCount,
      updatedText,
      planCharacterCount[whichPlan] !== charCount,
      planCharacterCount[whichPlan],
      whichPlan,
      planCharacterCount
    );

    if (planCharacterCount[whichPlan] !== charCount) {
      const updatedCount = [...planCharacterCount];
      updatedCount[whichPlan] = charCount;
      console.log(updatedCount);
      console.log(remainingTextColour[whichPlan], newRemainingTextColour);
      setPlanCharacterCount(updatedCount);
      /*
      const updatedRemainingText = [...remainingText];
      updatedRemainingText[whichPlan] = newRemainingText;
      setRemainingText(updatedCount);
      */
      // Show Number Of Characters Remaining Text's Colour
      if (remainingTextColour[whichPlan] !== newRemainingTextColour) {
        const updatedColour = [...remainingTextColour];
        updatedColour[whichPlan] = newRemainingTextColour;
        setRemainingTextColour(updatedColour);
        console.log(updatedColour);
      }
    }
  }

  function applyPrevent(event) {
    if (
      !(
        ["Tab", "Enter", "Space"].includes(event.code) && event.key.length !== 1
      )
    ) {
      event.preventDefault();
    }
  }

  function checkKeyEvent(event, charCount) {
    /*
   These checks are not exhaustive.
   They are used to check regarding keystrokes, whether they would make any difference 
   to the actual Character Count
   For more information regarding the keycode constants see
   https://css-tricks.com/snippets/javascript/javascript-keycodes/   
   
   http://gcctech.org/csc/javascript/javascript_keycodes.htm


   see  
   see 
*/

    const BACKSPACE = 8,
      // TAB = 9,
      ENTER = 13,
      SPACE = 32,
      DELETE = 46,
      ZERO = 48,
      LEFTWINDOW = 91,
      RIGHTWINDOW = 92,
      SELECT = 93,
      FUNCTIONKEY_F1 = 112,
      // SCROLL_LOCK = 145,
      MYCOMPUTER = 182,
      MYCALCULATOR = 183;

    const eventCode = event.code;
    const eventKey = event.key;

    const eventKeyCode = event.keyCode;

    console.log(eventCode, eventKey, event.keyCode);

    console.log(event);

    if (eventKeyCode === BACKSPACE || eventKeyCode === DELETE) {
      --charCount; // assume character deleted so decrement count
      return charCount;
    }

    if (eventKeyCode === SPACE || eventKeyCode === ENTER) {
      ++charCount;
      return charCount;
    }

    // ignore the following keystrokes including TAB (which is equal to 9)
    if (
      eventKeyCode < ZERO ||
      eventKeyCode === LEFTWINDOW ||
      eventKeyCode === RIGHTWINDOW ||
      eventKeyCode === SELECT ||
      eventKeyCode === MYCOMPUTER ||
      eventKeyCode === MYCALCULATOR ||
      (eventKeyCode >= FUNCTIONKEY_F1 && eventKeyCode <= MYCALCULATOR)
    ) {
      event.preventDefault();
      return charCount;
    }

    // Assume a legitimate character has been entered - increment the count
    ++charCount;
    return charCount;
  }

  function checkAndIncrementCharCount(event, whichPlan, enteredPlan) {
    let charCount;
    //applyPrevent(event);
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
    console.log(planText, enteredPlan);
    if (enteredPlan !== planText[whichPlan]) {
      // Update display with the Remaining Characters
      const updatedText = [...planText];
      console.log(planText);
      updatedText[whichPlan] = enteredPlan;
      console.log(whichPlan, enteredPlan, updatedText);
      console.log(whichPlan, planCharacterCount);

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
    console.log(event.code, event.key, event.keyCode);
    console.log("DOC", document.getElementById(PLAN_INPUT_IDS[whichPlan]));
    console.log("H>", event.target.value);
    //let enteredPlan = document.getElementById(PLAN_INPUT_IDS[whichPlan]).trim();
    let enteredPlan = event.target.value.trim();
    console.log(enteredPlan, planInputs[S_PLAN]);
    checkAndIncrementCharCount(event, whichPlan, enteredPlan);
    theKey = event.key;
  };

  // useEffect(() => {
  //   // attach the event listener
  //   document.addEventListener("keydown", handleKeyPress);

  //   // remove the event listener
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [handleKeyPress]);

  useEffect(() => {
    setRemainingNumber([1000, 1000, 1000, 1000, 1000]);
  }, []);

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      // Using -1 until I figure out why it is showing the previous value
      const diff = PLAN_ENTRY_LIMIT - planCharacterCount[i] - 1;
      console.log(PLAN_ENTRY_LIMIT, planCharacterCount, diff);
      showRemainingTextMessage[i] =
        String(diff).padStart(3) +
        " Remaining Character" +
        (diff !== 1 ? "s" : "");
      remainingTextColourClass[i] = remainingTextColour[i]
        ? "td-remaining-default"
        : "td-remaining-less21";
    }

    console.log(planCharacterCount, showRemainingTextMessage);
  }, [planText, planCharacterCount, remainingTextColour]);

  return (
    <div>
      <header className="display-flex">
        <div className="title-header">MY SMART GOALS</div>
        <div className="title-header timestamp-header">{displayTimeStamp}</div>
      </header>
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
                    //onChange={(event) => handleChange(event, 0)}
                    onKeyUp={(event) => keyDownHandler(event, 0)}
                  ></textarea>
                </div>
              </form>
            </div>
          </td>
          <td className="td-remaining">
            <section className={remainingTextColourClass[0]} id="S-remaining">
              {showRemainingTextMessage[0]}
            </section>
          </td>
          <td className="td-expand-buttons">
            <button className="expand">Expand</button>
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
                    onKeyUp={(event) => keyDownHandler(event, 1)}
                  ></textarea>
                </div>
              </form>
            </div>
          </td>
          <td className="td-remaining">
            <section className={remainingTextColourClass[1]} id="M-remaining">
              {showRemainingTextMessage[1]}
            </section>
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
                    onKeyUp={(event) => keyDownHandler(event, 2)}
                  ></textarea>
                </div>
              </form>
            </div>
          </td>
          <td className="td-remaining">
            <section className={remainingTextColourClass[2]} id="A-remaining">
              {showRemainingTextMessage[2]}
            </section>
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
                    onKeyUp={(event) => keyDownHandler(event, 3)}
                  ></textarea>
                </div>
              </form>
            </div>
          </td>
          <td className="td-remaining">
            <section className={remainingTextColourClass[3]} id="R-remaining">
              {showRemainingTextMessage[3]}
            </section>
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
                    onKeyUp={(event) => keyDownHandler(event, 4)}
                  ></textarea>
                </div>
              </form>
            </div>
          </td>
          <td className="td-remaining">
            <section className={remainingTextColourClass[4]} id="T-remaining">
              {showRemainingTextMessage[4]}
            </section>
          </td>
          <td className="td-expand-button edit-buttons">
            <button className="edit">Edit</button>
            {/* <button className="delete">Delete</button> */}
          </td>
        </tr>
      </table>
      <section className="buttons-container">
        <button className="button-78">Discard</button>
        <button className="button-78">Save</button>
        <button className="button-78">Save & Close</button>
      </section>
    </div>
  );
};

export default EnterPlans;
