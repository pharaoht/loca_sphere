'use client'
import moment from "moment"

const useDate = () => {


    function createMomentObj(yyyy?: string | number, mm?: string | number, dd?: string | number){

        if(!yyyy || !mm || !dd){

            console.warn('Make sure all parameters are defined to create a date string.');

            return '';
        }

        return moment(`${yyyy}-${mm}-${dd}`);
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