const verifyLogin = (emailField, passwordField, databaseReturn) => {  
  console.log(`
  In middleware verifyLogin function
  user email input is: ${emailField},
  user password input is: ${passwordField},
  and DB returned:\n`, databaseReturn);

  if (!databaseReturn[0]){
    console.error(`No content from DB, cannot validate`);
    return false;
  }
  else if (emailField === databaseReturn[0].email && passwordField === databaseReturn[0].password) {
    console.log(`Success we have a match!`);
    console.log(`CORRESPONDING CITY IS: `, databaseReturn[0].locations[0].city_name);
    return { 
      user_id: databaseReturn[0].user_id,
      name: databaseReturn[0].name,
      email: databaseReturn[0].email,
      pfp: databaseReturn[0].pfp,
      city_name: databaseReturn[0].locations[0].city_name
      }
  } 
  else{
    console.log(`Credentials are not a match`);
    return false;
  }  
};

export default verifyLogin;
