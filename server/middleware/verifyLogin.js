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
    return true;
  } 
  else{
    console.log(`Credentials are not a match`);
    return false;
  }  
};

export default verifyLogin;
