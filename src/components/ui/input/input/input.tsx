import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import styles from './input.module.css';

export interface InputProps {
    label: string;
    inputType: HTMLInputTypeAttribute;
    idnName: string;
    isRequired?: boolean | undefined;
    onChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    placeHolder?: string | undefined;
    isDisabled?: boolean | undefined;
    inputValue?: string | number | readonly string[] | undefined;
    validationMessage?: string | undefined;
    unitText?: string | undefined;
    minimum?: number;
    maximum?: number;
    step?: number;
};

const InputGroup: React.FC<InputProps> = ({ label, unitText = undefined, maximum, minimum, step, inputValue, inputType, idnName, isDisabled, isRequired, onChangeHandler, placeHolder, validationMessage }) => {

    const inputInvalid = !!validationMessage;

    const unitCssClass = unitText && styles.unitSpacing;

    const errorCssClass = inputInvalid && styles.error;

    return (
        <div className={styles.formGroup}>
            <label htmlFor={idnName}>{label} {isRequired && '*'}</label>
            <div className={styles.inputWrapper}>
                <input 
                    className={`${unitCssClass} ${errorCssClass}`}
                    type={inputType}
                    id={idnName}
                    name={idnName}
                    required={isRequired ?? false}
                    value={inputValue ?? ''}
                    onChange={onChangeHandler}
                    placeholder={placeHolder}
                    disabled={isDisabled}
                    min={minimum}
                    max={maximum}
                    step={step}
                    aria-invalid={inputInvalid}
                    aria-describedby={inputInvalid ? `${idnName}-error` : undefined}
                />
                { unitText && <span className={styles.inputUnit}>{unitText}</span> }
            </div>
            { inputInvalid && 
                (
                    <span id={`${idnName}-error`} className={styles.validationError}>
                        {validationMessage}
                    </span>
                )
            }
        </div>
    )
};

export default InputGroup;