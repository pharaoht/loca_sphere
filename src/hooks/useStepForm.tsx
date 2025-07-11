import { DefaultStateType, stepDefaultState,  } from "@/app/landlord/types";
import { createContext, Dispatch, ReactElement, ReactNode, SetStateAction, useContext, useState } from "react";

type FormState = DefaultStateType;

interface FormContextType {
  formState: FormState;
  setFormState: Dispatch<SetStateAction<FormState>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormContextProvider: React.FC<{ children: ReactElement | ReactNode }> = ({ children }) => {

    const [ formState, setFormState ] = useState(stepDefaultState);

    return (
        <FormContext.Provider value={{ formState, setFormState }}>
            {children}
        </FormContext.Provider>
    );
};

export function useFormContext<K extends keyof DefaultStateType>( stepKey: K )
: { stepState: DefaultStateType[K]; setStepState: (updates: Partial<DefaultStateType[K]>) => void } | undefined {

    const context = useContext(FormContext);

    if (!context) {

        console.warn('useFormContext must be used within a FormProvider')

        return undefined;
    }

    const { setFormState, formState } = context;

    const stepState = formState[stepKey];

    const setStepState = (updates: Partial<DefaultStateType[K]>) => {

        setFormState((prevState: any) => ({
            ...prevState,
            [stepKey]: {
                ...prevState[stepKey],
                ...updates,
            }
        }))
    }

    return {
        setStepState, stepState
    }
};

export type UseFormContextReturn<K extends keyof DefaultStateType> = {
  stepState: DefaultStateType[K];
  setStepState: (updates: Partial<DefaultStateType[K]>) => void;
} | undefined;