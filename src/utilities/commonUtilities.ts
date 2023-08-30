import { DeepMap, FieldError } from "react-hook-form";

export const getHookFormKey = (configKey: string, configArrKey?: string, configArrIndex?: number) => {
  return `${ typeof configArrKey === "undefined" ? "" : configArrKey+"." }${ typeof configArrIndex === "undefined" ? "" : configArrIndex+"." }${ configKey }`;
}
  
export const getHookFieldErrorMsg = (errors: DeepMap<any, FieldError>, configKey: string, configArrKey?: string, configArrIndex?: number) => {
  if(configArrKey && typeof configArrIndex !== "undefined"){
    return errors[ configArrKey ]?.[ configArrIndex ]?.[ configKey ]?.message;
  }
  return errors[ configKey ]?.message;
}