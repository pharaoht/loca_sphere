import InputGroup, { InputProps } from "../input/input";
import styles from '../input/input.module.css';
import SelectGroup from "../select/select";

interface MultiSelectProps {
    inputValue: any
    inputOnChange: (...args: any) => void;
    selectLabel: string;
    selectIdnName: string;
    selectOnChange: (...args: any) => void;
    selectOptions: Array<{ id: number | string, name: string }>;
    selectDefaultOptionLabel: string;
    selectInputValue: string | number | readonly string[] | undefined;
    multiSelectOptions: Array<{ id: number | string, name: string }>;
    multiSelectOnChange: (...args: any) => void;
}

const MultiSelectGroup: React.FC<MultiSelectProps> = ({ inputOnChange, inputValue, selectIdnName, selectLabel, selectOnChange, selectDefaultOptionLabel, selectInputValue, selectOptions, multiSelectOptions, multiSelectOnChange }) => {

    return (
        <div className={styles.formGroup}>

            <SelectGroup 
                inputValue={selectInputValue}
                label="Select Room Type"
                idnName="test"
                inputType="select"
                onChangeHandler={selectOnChange}
                dropDownOptions={selectOptions || []}
                defaultOptionLabel="pick an option"
            />
            <InputGroup 
                inputType="number"
                idnName="roomNumber"
                label=""
                inputValue={inputValue}
                placeHolder="bedroom 1"
                onChangeHandler={inputOnChange}
            />
            <ul className={styles.dd}>
                {
                    multiSelectOptions.length > 0 && (
                        multiSelectOptions.map((itm, idx) => (
                            <li key={itm.id}>
                                <input type='checkbox' value={itm.id} onClick={() => multiSelectOnChange(itm.id)} />
                                {itm.name}
                            </li>
                        ))  
                    )
                }
                
            </ul>

        </div>
    )
};

export default MultiSelectGroup;