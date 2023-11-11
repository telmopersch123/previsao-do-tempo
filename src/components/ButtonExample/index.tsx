import React, { ReactNode } from 'react'
import * as S from './styles'

export type ButtonExampleProps = {
  children: string | ReactNode;
  variant?: 'filled' | 'outlined';
  size?: "small" | "medium" | "large";
}

const ButtonExample = ({children,variant}: ButtonExampleProps) => {
  return <S.Wrapper variant={variant}>{children}</S.Wrapper>
}

export default ButtonExample;
