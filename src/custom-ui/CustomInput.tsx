import React, { useEffect, useState } from "react";
import { IonIcon, IonInput, IonText } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

type StaticProps = {
  type?: "number" | "password" | "text",
  inputmode?: "search" | "text" | "email" | "tel" | "url" | "none" | "numeric" | "decimal",
  label: string,
  aditionalLabel?: string,
  onBlur?: () => void,
  disabled?: boolean,
  required?: boolean,
  className?: string
}
type DynamicProps<T> = {
  value?: T,
	onChange: (value: T) => void
}

type CustomInputProps = StaticProps & (DynamicProps<string> | DynamicProps<number>);

const useStyles = createUseStyles({
  root: {
    position: "relative"
  },
  multiLineInput: {
    marginTop: 10
  },
  multiLineLabel: {
    marginTop: -18
  },
  labelContainer: {
    position: "relative",
    zIndex: 2
  },
  label: {
    display: "block"
  },
  required: {
    color: "#cc0000"
  },
  showPassword: {
    position: "absolute",
    right: 4,
    zIndex: 3000,
    bottom: 16,
    fontSize: "22px"
  }
});
const CustomInput: React.FC<CustomInputProps> = (props) => {
	const { value, type = "text", inputmode, label, aditionalLabel, onChange, onBlur, disabled =  false, required, className } = props;
  const [ inputValue, setInputValue ] = useState<string | null | undefined>(""+value);
  const [ showPassword, setShowPassword ] = useState(false);
	const classes = useStyles();
  const toggleShowPassword = () => {
    setShowPassword((previousState: boolean) => {
      return !previousState;
    });
  }
  const onInputChange = (value: string | null | undefined) => {
    setInputValue(value);
    onChange(((type === "number" && !isNaN(parseFloat(value || ""))) ? parseFloat(value || "") : ""+value) as never);
  }
  useEffect(() => {
    setInputValue((prevValue) => {
      if(type === "number" && parseFloat(""+prevValue) === parseFloat(""+value)){
        return prevValue;
      }
      return ""+value;
    })
  }, [ value ]);
	return (
  <IonInput 
    value={ inputValue }
    labelPlacement="floating"
    type={ type === "password" ? ( showPassword ? "text" : "password" ) : type } 
    inputmode={ inputmode }
    onIonInput={ event => onInputChange(event.detail.value) }
    //onChange={ (event: any) => onInputChange(event.target.value || "") }
    onIonBlur={ onBlur }
    className={ clsx(classes.root, className, aditionalLabel && classes.multiLineInput) }
    disabled={ disabled }
    fill="solid"
    clearOnEdit={ false }
  >
    <div slot="label" className={ clsx(classes.labelContainer, aditionalLabel && classes.multiLineLabel) }>
      <IonText className={ classes.label }>
        { label }{ required && <span className={ classes.required }> *</span> }
      </IonText>
      { aditionalLabel && <IonText>{ aditionalLabel }</IonText> }
    </div>
    { type === "password" && <IonIcon slot="end" className={ classes.showPassword } icon={ showPassword ? eyeOff : eye } onClick={ toggleShowPassword }></IonIcon> }
  </IonInput>);

// return (
//   <input 
//     value={ inputValue || "" }
//     type={ type === "password" ? ( showPassword ? "text" : "password" ) : type } 
//     onChange={ (event: any) => onInputChange(event.target.value || "") }
//     onBlur={ onBlur }
//     className={ clsx(classes.root, className, aditionalLabel && classes.multiLineInput) }
//     disabled={ disabled }
//     placeholder={ `${ label }${ required ? "*": "" }` }
//   >
//   </input>);
}
export default CustomInput;