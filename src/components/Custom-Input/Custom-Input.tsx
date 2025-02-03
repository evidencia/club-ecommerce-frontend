import { InputHTMLAttributes } from "react";
import { CustomInputContainer } from "./Custom-Input.styles";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}


function CustomInput({ hasError, ...rest}: CustomInputProps) {
  return <CustomInputContainer hasError={hasError} {...rest} />;
}

export default CustomInput;



