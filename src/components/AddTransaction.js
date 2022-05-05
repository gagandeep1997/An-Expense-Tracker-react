import { useContext, useState } from "react";
import { ContextApi } from "../store/contextApi";
import useInput from "../hooks/use-input";

const AddTransaction = () => {
  const context = useContext(ContextApi);

  const {
    value: TextHandler,
    isValid: IsEnteredTextValid,
    setIsInputTouched: toggleTextInputTouched,
    hasError: TextInputIsInvalid,
    valueChangeHandler: textChangeHandler,
    valueBlurHandler: textBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: AmountHandler,
    isValid: IsEnteredAmountValid,
    setIsInputTouched: toggleAmountInputTouched,
    hasError: EnteredAmountIsInvalid,
    valueChangeHandler: amountChangeHandler,
    valueBlurHandler: amountBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const [IsRadioButtonChecked, setIsRadioButtonChecked] = useState(true);

  const radiobuttonhandler = (e) => {
    setIsRadioButtonChecked(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isIncomeChecked =
      document.getElementById("flexRadioDefault1").checked;

    const isExpenseChecked =
      document.getElementById("flexRadioDefault2").checked;

    toggleTextInputTouched(true);
    toggleAmountInputTouched(true);

    if (!isIncomeChecked && !isExpenseChecked) {
      setIsRadioButtonChecked(false);
      return;
    }

    if (!IsEnteredTextValid || !IsEnteredAmountValid) {
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 10000000),
      text: TextHandler,
      amount: isIncomeChecked ? +AmountHandler : +AmountHandler * -1,
    };
    context.addNewTransactionHandler(newTransaction);
  };

  const IsTextValidClass = TextInputIsInvalid
    ? "form-control invalid"
    : "form-control";
  const IsAmountValidClass = EnteredAmountIsInvalid
    ? "form-control invalid"
    : "form-control";

  const RadioButtonClass = IsRadioButtonChecked
    ? "form-check"
    : "form-check invalid";

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={submitHandler}>
        <div className={IsTextValidClass}>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            placeholder="Enter text..."
            onChange={textChangeHandler}
            value={TextHandler}
            onBlur={textBlurHandler}
          />
          {TextInputIsInvalid && (
            <p className="error-text">Text must not be empty.</p>
          )}
        </div>
        <div className={IsAmountValidClass}>
          <label htmlFor="amount">Amount</label>
          <div className={RadioButtonClass} onChange={radiobuttonhandler}>
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value=""
            />
            <label
              className="form-check-label d-inline"
              htmlFor="flexRadioDefault1"
            >
              Income (+)
            </label>
          </div>
          <div className={RadioButtonClass} onChange={radiobuttonhandler}>
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value=""
            />
            <label
              className="form-check-label d-inline"
              htmlFor="flexRadioDefault2"
            >
              Expense (-)
            </label>
          </div>
          <input
            type="number"
            min="0"
            onChange={amountChangeHandler}
            value={AmountHandler}
            onBlur={amountBlurHandler}
            placeholder="Enter amount..."
            className="mt-2"
          />
          {EnteredAmountIsInvalid && (
            <p className="error-text">Amount must not be empty.</p>
          )}
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
