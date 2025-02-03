import { FunctionComponent, ReactNode } from "react";
import { InputErrorMessageContainer } from "./Input-error-message.styles";

interface InputErrorMessageProps {
  children: ReactNode
}

const InputErrorMessage: FunctionComponent<InputErrorMessageProps> = ({ children }) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default InputErrorMessage