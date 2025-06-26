'use client'
import styles from '../../../../wrappers/button/infobutton.module.css';
import Dropdown from "@/components/ui/dropdown/dropdown";
import css from './budget.module.css';
import Image from 'next/image';
import useParams from '@/hooks/useParams';

const BudgetFilter = () => {

    const { setParam, getParam } = useParams();

    const minValue = getParam('minRent') || 0;
    const maxValue = getParam('maxRent') || 0;

    const submitPriceRange = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        //uncontrolled inputs
        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData);

        const params = Object.entries(data).map(([key, value]) => ({
            key: key,
            value: String(value)
        }));

        setParam(params);
    }

    const Content = () => (
        <section className={css.container}>
            <form className={styles.formContainer} onSubmit={submitPriceRange}>
                <div role="region" aria-label="Price Slider">slider</div>
                <div className={css.priceContainer}>

                    <fieldset  className={css.inputContainer}>
                        <legend  className={css.inputLabel}>min price</legend >
                        <label>
                            <span className={css.currLabel}>$</span>
                            <input className={css.fakeInput} type='number' name='minRent' min={0} max={9999} defaultValue={minValue} />
                        </label>
                    </fieldset >

                    <fieldset className={css.inputContainer}>
                        <legend className={css.inputLabel}>max price</legend>
                        <label>
                            <span className={css.currLabel}>$</span>
                            <input className={css.fakeInput} type='number' name='maxRent' min={0} max={9999} defaultValue={maxValue}/>
                        </label>
                    </fieldset>
                </div>

                <div>
                    <label>
                        <input type='checkbox'/>
                        Include bills
                    </label>

                    <button type='submit'>Submit</button>
                </div>
            </form>
        </section>
    )

    return (
        <Dropdown dropDownContent={<Content/>} >
            <button className={`${styles.btnBaseClass} ${styles.default} ${styles.selectorBtn}`} type='button' >
                <span>
                    
                    <Image src='/coin-icon.png' alt='Icon for button' width={25} height={25}/>
                    
                </span>

                <span>
                    {
                        minValue !== 0 ? `$${minValue} - $${maxValue}` : 'Set Budget'
                    }
                </span>
                
                <span className={styles.hide}>
                </span>
            </button>
        </Dropdown>
    )
};

export default BudgetFilter;