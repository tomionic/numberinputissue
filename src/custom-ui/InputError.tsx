import React, { ReactNode } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  errorMsg: {
    color: "#cc0000",
    fontSize: 12,
    paddingTop: 4,
    paddingLeft: 16
  }
});
type InputErrorProps = {
	children: ReactNode,
  className?: string 
}
const InputError: React.FC<InputErrorProps> = (props) => {
	const { children, className } = props;
  const classes = useStyles();
	return (
  <div className={ clsx(className, classes.errorMsg) }>
    { children }
  </div>);
}
export default InputError;