/*  

  takes in our standard UTC datetime we get from mongoDB:
    2024-08-09T14:33:00.000+00:00

  and converts it into a string we can use like this:
    August 1, 2024 at 11:43 AM

*/

export function dateConversion(dateFromDB) {
  // console.log(`Our dateFromDB is:`, dateFromDB);  
  const date = new Date(dateFromDB);
  const monthString = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
  ];
  const month = monthString[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM

  return `${month} ${day}, ${year} at ${hours}:${minutes} ${suffix}`;  	
};


/* 
  My version of the XSS escape function 
  Prevents users from writing <script/> tags in any input fields
*/

export function xssSanitize(string) {
  const cleanString = string.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  console.log(`Newly sanitized string is now:\n `, string);
  return cleanString;
};

