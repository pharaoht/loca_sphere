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

    function getDateAsString(format: string = 'YYYY MMM DD' ){

        return moment().format(format)
    }

    function createDateObject(year: string | number, month: string | number, day: string | number): Date {
        const y = String(year).padStart(4, '0');
        const m = String(month).padStart(2, '0');
        const d = String(day).padStart(2, '0');

        const newDate = new Date(+y, +m - 1, +d, 0, 0, 0, 0);

        if(isNaN(newDate.getDate())){
            return new Date();
        }

        return newDate;
    }

    function convertDateToDisplay(dateObject?: Date | null, format: string = 'YYYY MMM DD'){

        if(!dateObject) return;

        return moment(dateObject).format(format);
    }

    function isDateInPast(date: string | string[]){
        
        let input = date;

        if(Array.isArray(date)){

            input = date.join('-')
        }

        return moment(input).isSameOrBefore(moment(), "day");
    }

    return {
        createMomentObj,
        formatDate,
        getDateAsString,
        createDateObject,
        convertDateToDisplay,
        isDateInPast
    }
}

export default useDate;