'use client'
import moment, { Moment } from "moment"

const useDate = () => {


    function createMomentObj(yyyy?: string | number, mm?: string | number, dd?: string | number): Moment | ''{

        if(!yyyy || !mm || !dd){

            console.warn('Make sure all parameters are defined to create a date string.');

            return '';
        }

        if(Number(mm) < 10) mm = `0${mm}`;
        if(Number(dd) < 10) dd = `0${dd}`;
        
        return moment(`${yyyy}-${mm}-${dd}`, 'YYYY-MM-DD');
    }

    function formatDate(inputDate: string, format: string, desiredFormat: string = 'YYYY MMM DD', ): string {

        if(!inputDate) {

            console.warn('Make sure to provide an inputDate.');

            return '';
        }
        const formattedDate = moment(inputDate, format).format(desiredFormat);

        return formattedDate;
    }

    function getDateAsString(format: string = 'YYYY-MMM-DD' ){

        return moment().format(format)
    }

    return {
        createMomentObj,
        formatDate,
        getDateAsString
    }
}

export default useDate;