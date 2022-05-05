import { useState } from "react";

const useInput = (validateValue) => {
  const [inputValue, setInputValue] = useState("");
  const [IsInputTouched, setIsInputTouched] = useState(false);

  const valueIsValid = validateValue(inputValue);
  const hasError = IsInputTouched && !valueIsValid;

  const valueChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setIsInputTouched(true);
  };

  return {
    value: inputValue,
    isValid: valueIsValid,
    setIsInputTouched,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
  };
};

export default useInput;
