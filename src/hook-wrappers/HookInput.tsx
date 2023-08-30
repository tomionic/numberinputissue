import React from "react";
import { Control, Controller, DeepMap, FieldError } from "react-hook-form";
import { getHookFormKey, getHookFieldErrorMsg } from "../utilities/commonUtilities";
import CustomInput from "../custom-ui/CustomInput";
import InputError from "../custom-ui/InputError";

type HookInputType = {
  control: Control<any>,
  errors: DeepMap<any, FieldError>,
  label: string,
  aditionalLabel?: string,
  disabled?: boolean,
  configKey: string,
  configArrKey?: string,
  configArrIndex?: number,
  type?: "number" | "password" | "text",
  inputmode?: "search" | "text" | "email" | "tel" | "url" | "none" | "numeric" | "decimal",
  requiredError?: string | false,
  onChange?: (value: string | number) => void,
  onBlur?: () => void,
  className?: string
}

const HookInput: React.FC<HookInputType> = (props) => {
  const { control, errors, label, aditionalLabel, disabled, configKey, configArrKey, configArrIndex, type, inputmode, requiredError, onChange, onBlur, className } =props;
  const errorMessage = getHookFieldErrorMsg(errors, configKey, configArrKey, configArrIndex);
  const onValueChange = (value: string | number, onChangeController: (...event: any[]) => void) => {
    onChangeController(value);
    if(typeof onChange === "function"){
      onChange(value);
    }
  }
  return (
    <div >
      <Controller
        render={ ({  field: { onChange, value } }) => <CustomInput
          value={ value }
          label={ label }
          required={ !!requiredError && requiredError !== " " }
          aditionalLabel={ aditionalLabel }
          onChange={ (value: string | number) => onValueChange(value, onChange) }
          onBlur={ onBlur }
          type={ type }
          inputmode={ inputmode }
          disabled={ disabled }
          className={ className }
        /> }
        name={ getHookFormKey(configKey, configArrKey, configArrIndex) }
        rules={ { 
          required: requiredError
        } }
        control={ control }
      />
      { errorMessage && <InputError >{ errorMessage }</InputError> }
    </div>
  );
}

export default HookInput;