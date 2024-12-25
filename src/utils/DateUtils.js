class DateUtils {

    static getSwedishWeekDay(date = '2024-01-01') {
        const weekDays = ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'];
        const selectedDate = new Date(date);
        return weekDays[selectedDate.getDay()];
    }

    static getSwedishMonth(date = '2024-01-01') {
        const months = ['januari','februari','mars','april','maj','juni','juli','augusti','september','oktober','november','december'];
        const selectedDate = new Date(date);
        return months[selectedDate.getMonth()];
    }

    static getYear(date = '2024-01-01') {
        const [year] = date.split('-');
        return year;
    }

    static isDateToday(date = '2024-01-01') {
        const now = new Date();
        const selectedDate = new Date(date);
        return (now.getFullYear() === selectedDate.getFullYear() && now.getMonth() === selectedDate.getMonth() && now.getDate() === selectedDate.getDate()) ? 'Idag, ' : ''
    }

}

export default DateUtils;