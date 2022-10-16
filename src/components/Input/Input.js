import React, { useState, useEffect } from "react";
import styled from "styled-components";

const InputComponent = styled.input`
  border-radius: 0;
  border: 1px solid hsl(0, 0%, 80%);
  display: block;
  font-size: 1rem;
  margin: 0;
  padding: 0.75rem 1.5rem 0.6rem 1rem;
  transition: box-shadow 0.2s ease-out, border-width 0.2s ease-out;
  width: 100%;

  &:focus {
    border-color: #fdc605;
    border-left-width: 0.5rem;
  }

  &::placeholder {
    color: #646464;
    opacity: 1;
  }
`;

/**
 * <Input
 *   className="MyInput"
 *   data-something="Value"
 *   value="Hello, World!"
 *   onChange={(value) => console.log('You typed', value)}
 * />
 *
 * @prop {string} value The default value for the input.
 * @prop {string} placeholder The placeholder text.
 * @prop {Function} onChange Callback that will receive current input value.
 * @prop {mixed} ... All other props will be forwarded to the native DOM input.
 */

export function Input(props) {
  const { className, value, onChange, ...otherProps } = props;

  const [inputValue, setInputValue] = useState(value);

  // Keep the current value, unless the parent component supplies a different "value" prop.
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  function handleChange(event) {
    setInputValue(event.target.value);
    onChange && onChange(event.target.value);
  }

  return (
    <InputComponent
      className={"Input " + (className || "")}
      type="text"
      value={inputValue}
      onChange={handleChange}
      {...otherProps}
    />
  );
}
