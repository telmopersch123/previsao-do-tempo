import styled, {css} from "styled-components";


import {ButtonExampleProps} from '.'
type ButtonExampleProp = Pick<ButtonExampleProps, 'variant'>

const ButtonExampleModifiers= {
  filled: () =>`
    background: none;
  `,
  outlined: () => `
    background: none;
    border: 1px solid red;
  `,
}

export const Wrapper = styled.button<ButtonExampleProp>`
  ${({variant}) => css`
    border: 0;
    outline: none;
    background: #fff000;
    color: #000;

    ${variant && ButtonExampleModifiers[variant]()};
  `}
`;
