
const currentDate = new Date();
const year = currentDate.getFullYear();
const dayOfWeek = currentDate.getDay();
const monthOfYear = currentDate.getMonth();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = daysOfWeek[dayOfWeek];
const currDay = currentDate.getDate();

const date = currentDate.toLocaleDateString('en-GB');
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
 
const formattedDate = `${year}-${monthOfYear +1 < 10 ? "0" : ""}${monthOfYear + 1}-${
  currDay < 10 ? "0" : ""
}${currDay}`;

  const month = months[monthOfYear];


export {day,date,month,formattedDate};