import Infobar from '@/components/ui/infobar/infobar';
import styles from './accomodations.module.css'

const Accomodations = () => {

    return (
        <main>
            <Infobar />
            <div className={styles.split}>
                <div>left</div>
                <div>right</div>
            </div>
            
        </main>
    )
};

export default Accomodations