'use client'
import styles from '../../../../wrappers/button/infobutton.module.css';
import Dropdown from "@/components/ui/dropdown/dropdown";
import css from './budget.module.css';
import Image from 'next/image';

const BudgetFilter = () => {

    const Content = () => (
        <div className={css.container}>
            <div>slider</div>
            <div className={css.priceContainer}>

                <div className={css.inputContainer}>
                    <label className={css.inputLabel}>min price</label>
                    <label className={css.currLabel}>$</label>
                    <input className={css.fakeInput} type='number' min={0} max={9999}/>
                </div>

                <div className={css.inputContainer}>
                    <label className={css.inputLabel}>max price</label>
                    <label className={css.currLabel}>$</label>
                    <input className={css.fakeInput} type='number' min={0} max={9999}/>
                </div>
            </div>

            <div>
                <label>
                    <input type='checkbox'/>
                    Include bills
                </label>
            </div>
        </div>
    )

    return (
        <Dropdown dropDownContent={<Content/>} >
            <button className={`${styles.btnBaseClass} ${styles.default} ${styles.selectorBtn}`} type='button' >
                <span>
                    
                    <Image src='/coin-icon.png' alt='Icon for button' width={25} height={25}/>
                    
                </span>

                <span>
                    Set Budget
                </span>
                
                <span className={styles.hide}>
                </span>
            </button>
        </Dropdown>
    )
};

export default BudgetFilter;