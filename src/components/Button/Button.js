import React from "react";
import styled from "styled-components";
import iconPath from "./icons.svg";

const ButtonComponent = styled.button`
  background: #fdc605;
  border: none;

  &:hover {
    filter:brightness(0.9);
  }
`

const ButtonSvg = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
`

/**
 * <Button
 *   className="MyButton"
 *   onClick={() => console.log('Click')}
 * />
 *
 * @prop {Function} onClick
 * @prop {mixed} ... All other props will be forwarded to the native DOM button.

 */
export function Button(props) {
  const { onClick, className, ...otherProps } = props;

  return (
    <ButtonComponent
      type="button"
      onClick={onClick}
      {...otherProps}
    >
      <ButtonSvg viewBox="0 0 24 24" width="24" height="16">
        <use xlinkHref={iconPath + "#dls-icon-arrow-right"} />
      </ButtonSvg>
    </ButtonComponent>
  );
}
