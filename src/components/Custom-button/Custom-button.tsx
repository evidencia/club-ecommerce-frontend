import { ButtonHTMLAttributes, ReactNode } from "react";
import { CustomButtonContainer, IconContainer } from "./Custom-button.styles";

interface CustomButtomProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children:  ReactNode
  startIcon?: ReactNode
}

const CustomButton = ({ children, startIcon, ...rest }: CustomButtomProps) => {
  return (
    <CustomButtonContainer {...rest}>
      {startIcon && <IconContainer>{startIcon}</IconContainer>}
      {children}
    </CustomButtonContainer>
  );
}

export default CustomButton;