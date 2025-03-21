import Infobar from '@/components/ui/infobar/infobar';
import styles from './accomodations.module.css'
import Mapbox from '@/components/ui/map/map';
import Breadcrumbs from '@/components/layout/breadcrumbs/breadcumbs';



const Accommodations = () => {

    return (
        <main>
            <Infobar />
            <div className={styles.split}>
                <div className={styles.leftSide}>
                    <Breadcrumbs links={[]}/>
                </div>
                <div className={styles.rightSide} >
                   <Mapbox coordinates={[]}/>
                </div>
            </div>
            
        </main>
    )
};

export default Accommodations;