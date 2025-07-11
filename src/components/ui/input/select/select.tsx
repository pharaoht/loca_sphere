import styles from './select.module.css';
import { InputProps } from '../input/input';

interface SelectProps extends InputProps {
    dropDownOptions: Array<{id: number | string, name: string}>
    defaultOptionLabel?: string;
}

const SelectGroup: React.FC<SelectProps> = (
    {   label, isDisabled, idnName, 
        defaultOptionLabel = 'Select an option', 
        inputValue, onChangeHandler, 
        dropDownOptions, isRequired, validationMessage
    }
) => {

    const inputInvalid = !!validationMessage;

    return (
        <div className={styles.formGroup}>
            <label htmlFor={idnName}>{label} *</label>
            <select 
                name={idnName}
                id={idnName} 
                className={styles.select} 
                required={isRequired}
                disabled={isDisabled}
                value={inputValue}
                onChange={onChangeHandler}
            >
                <option value="">{defaultOptionLabel}</option>
                {
                    Array.isArray(dropDownOptions) && dropDownOptions.length > 0 && dropDownOptions.map((itm, idx) => (
                        <option key={itm.id} value={String(itm.id)}>{itm.name}</option>
                    ))
                }
            </select>
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

export default SelectGroup;