import { InputProps } from '../input/input';
import styles from '../input/input.module.css';
import Image from 'next/image';

interface CheckboxProps extends InputProps {
    
}

const CheckboxGroup: React.FC<CheckboxProps> = ({ idnName, inputType, inputValue }) => {

    return (
        <label htmlFor={idnName}>
            <input
                className={styles.checkbox}
                type='checkbox'
                id={idnName}
                name={idnName}
                value={''}
                checked={false}
                onChange={(e) => {}}
                disabled={false}
            />

        </label>
    )
};

export default CheckboxGroup;