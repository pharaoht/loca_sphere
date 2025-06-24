'use client'
import Image from "next/image";
import Dropdown from "../dropdown/dropdown"
import styles from './sortby.module.css';
import useParams from "@/hooks/useParams";

interface Props {
    length: number
}

const sortValues = [
    {
        title:'Best matches',
        key: 'orderBy',
        value: 'distance',
        direction: 'asc'
    },
    {
        title: 'Price - low to high',
        key: 'orderBy',
        value: 'monthlyRent',
        direction: 'asc',
    },
    {
        title: 'Price - high to low',
        key: 'orderBy',
        value: 'monthlyRent',
        direction: 'desc',
    }
];

const Sortby: React.FC<Props> = ({ length = 0 }) => {

    const { setParam } = useParams();

    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>, key: string = '', value: string = '', direction: string = '') => {
        
        event.preventDefault();

        if(direction != ''){
            setParam([{ key: key, value: value }, { key: 'direction', value: direction}]);
            return
        }

        setParam([{ key: key, value: value }]);
    };


    const SortMethods = () => (
        <section>
            <ul className={styles.smContainer}>
                {
                    sortValues.map((itm, idx) => {

                        return (
                            <li key={idx} className={styles.active}>
                                <button 
                                    className={styles.defaultBtn} 
                                    type='button' 
                                    value={itm.value} 
                                    onClick={(event) => onClickHandler(event, itm.key, itm.value, itm.direction)}
                                >
                                    {itm.title}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )

    return (
        <div className={styles.container}>
            <Dropdown startFromRightSide={true}  dropDownContent={<SortMethods />}>
                <button className={styles.sortBtn} type='button'>
                    <div className={styles.sectionDiv}>
                        <span className={styles.fText}>Best Places</span>
                        <span className={styles.icon}>
                            <Image src='/chevron-down.png' alt="Option Icon" height={16} width={16} />
                        </span>
                    </div>
                    <span className={styles.lText}>{length} places matched</span>
                </button>
            </Dropdown>
        </div>
    )
};

export default Sortby;


{/* <li>Recently updated</li>              
  <li>Recently added</li>             
   <li>Rating</li> */}