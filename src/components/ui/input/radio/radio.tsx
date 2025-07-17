import { InputProps } from '../input/input';
import styles from '../input/input.module.css';

interface RadioProps extends InputProps {

    radioOptions: Array<{id: boolean, name: string}>
}
const RadioInputGroup: React.FC<RadioProps> = ({ label, idnName, isRequired, isDisabled, radioOptions }) => {

    return (
        <fieldset className={styles.formGroup}>
            <legend>{label} {isRequired && '*'}:</legend>
            {
                radioOptions.length > 0 && radioOptions.map((itm, idx) => (

                    
                        <label key={idx} htmlFor={idnName}>{itm.name} 
                        <input
                            type='radio'
                        />
                        </label>


                ))
            }
        </fieldset>
    )
};

export default RadioInputGroup;