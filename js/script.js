 function validateForm(){
    let fullName =  document.getElementById('Name').value;
    let phoneNumber =  document.getElementById('phoneNumber').value;
    let zipCode =  document.getElementById('zipCode').value;
    let fullAddress =  document.getElementById('AddressLine1').value;
    let city =  document.getElementById('citySelection').value;
    let province =  document.getElementById('province').value;
    let creditCard = document.getElementById("Credit-Card").value;
    let creditCardExpiryMonth = document.getElementById("expiryMonth").value;
    let creditExpiryYear = document.getElementById("creditExpiryYear").value;
    let Email =  document.getElementById("EmailSelection").value;
    let password = document.getElementById("Password").value;
    let ConfirmPassword =  document.getElementById("confirmPassword").value;
    let productItem = document.getElementById('productOfItem').value;
    let creditCardregex = /^([0-9]{4})[-]([0-9]{4})[-]([0-9]{4})[-]([0-9]{4})$/;
    let monthRegex = /^([A-Z]{3})$/;
    let yearRegex = /^([0-9]{4})$/;
    let regexEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let regexPhoneNumber= /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    
   if ((fullName == "") || (fullName.length <= 2)) {
      document.getElementById("result").innerText = "Name is required";
      document.getElementById("Name").focus();
      return false;
   }
    else{
      document.getElementById("result").innerText = "";
    }
   
 
   if (phoneNumber == "" || !regexPhoneNumber.test(phoneNumber)) {
    document.getElementById("phoneErrorNumber").innerText = "Phone Number is required";
      document.getElementById("phoneNumber").focus();
      return false;
    }
    else{
      document.getElementById("phoneErrorNumber").innerText = "";
    }


   if (zipCode == "") {
    document.getElementById("PostalErrorCode").innerText = "Postal code is required";
      document.getElementById("zipCode").focus();
      return false;
    }
    else{
      document.getElementById("PostalErrorCode").innerText = "";
    }

   if (fullAddress == "") {
    document.getElementById("AddressError").innerText = "Address is required";
      document.getElementById("AddressLine1").focus();
      return false;
    }
    else{
      document.getElementById("AddressError").innerText = "";
    }

   if (city == "") {
    document.getElementById("CityError").innerText = "City is required";
      document.getElementById("citySelection").focus();
      return false;
    }
    else{
      document.getElementById("CityError").innerText = "";
    }

   if (province == "") {
      document.getElementById("provinceError").innerText = "Province is required";
      document.getElementById("province").focus();
      return false;
    }
    else{
      document.getElementById("provinceError").innerText = "";
    }

    if (creditCard == "" || !creditCardregex.test(creditCard)) {
      document.getElementById("CreditCardError").innerText = "Credit Card is invalid";
      document.getElementById("Credit-Card").focus();
      return false;
    }
    else{
      document.getElementById("CreditCardError").innerText = "";
    }

  if (creditCardExpiryMonth == "" || !monthRegex.test(creditCardExpiryMonth)) {
      document.getElementById("monthExpiryError").innerText = "Credit card expiry month is invalid";
      document.getElementById("expiryMonth").focus();
      return false;
    }
    else{
      document.getElementById("monthExpiryError").innerText = "";
    }

    
  if (creditExpiryYear == "" || !yearRegex.test(creditExpiryYear)) {
      document.getElementById("yearExpiryError").innerText = "Credit card expiry year is invalid";
      document.getElementById("creditExpiryYear").focus();
      return false;
    }
    else{
      document.getElementById("yearExpiryError").innerText = "";
    }

      if (Email == "" || !regexEmail.test(Email)) {
      document.getElementById("emailIncorrect").innerText = "Email is invalid";
      document.getElementById("EmailSelection").focus();
      return false;
    }
    else{
      document.getElementById("emailIncorrect").innerText = "";
    }

   if (password == ""){
      document.getElementById("incorrectPassword").innerText = "Enter a password";
      document.getElementById("Password").focus();
      return false;
    }
    else{
      document.getElementById("incorrectPassword").innerText = "";
    }

  
    // if (password === ConfirmPassword){
    //   document.getElementById("PasswordIncorrect").innerText = "Password Matched";
    //   document.getElementById("Password").focus();
    //   errors = false;
    //   return true;
    // }

    if(ConfirmPassword != password){
       document.getElementById("PasswordIncorrect").innerText = "Password not matched"
       document.getElementById("confirmPassword").focus();
       return false
      }
    else{
      document.getElementById("PasswordIncorrect").innerText = "Password Matched";
      }

    if (productItem == "") {
      document.getElementById("productError").innerText = "select quantity";
      document.getElementById("productOfItem").focus();
      errors = true;
      return false;
    
    }else{
       document.getElementById("productOfItem").innerText = "";
    }

     if(productItem <= 10){
      document.getElementById("formReceipt").innerText = "Minimum purchase should be $10 or more.";
      return false;
    }
     else{
      receipt();
      return false;
    }
   
  }

  function receipt() {
         
      var fullName =  document.getElementById('Name').value;
      var Email =  document.getElementById("EmailSelection").value;
      
      var productItem = document.getElementById('productOfItem').value;

      var container = document.getElementById('formReceipt');
      container.innerHTML = '';
      
      var receipt = document.createElement('div');
      receipt.className = 'receipt';
   
      var title = document.createElement('h2');
      title.innerText = 'Receipt';

      var information = document.createElement('p');
      information.innerHTML = '<strong>Client Name:</strong> ' + fullName + '<br>' +
                               '<strong>Client Email:</strong> ' + Email + "<br>";

      var productInformation = document.createElement('p');
      productInformation.innerHTML = '<strong>Product Quantity:</strong> $' + productItem;

      var forTotal = document.createElement('div');
      forTotal.id = "total";
             
      container.appendChild(receipt);  
      receipt.appendChild(title);
      receipt.appendChild(information);
      receipt.appendChild(productInformation);
      receipt.appendChild(forTotal);
      taxCalulateAndprice();
     
   }
  
function taxCalulateAndprice(forTotal) {
  var state = document.getElementById('province').value;
  var getPriceValue = parseFloat(document.getElementById('productOfItem').value);

  var taxRate = calculateTaxRate(state);
  var Tax = getPriceValue * taxRate;
  var total = getPriceValue + Tax;

  var forTotal = document.getElementById('total');
  forTotal.innerHTML = '<strong>Total (plus sales tax):</strong> $ ' + total.toFixed(2);// for round figure method, in recording it sounds like"wrong figure" it is for round figure.
                                                                                        //  so i put comment here..

}

function calculateTaxRate(state) {
  if (state === 'AB') {
    return 0.05; 
  } else if (state === 'BC') {
    return 0.12; 
  } else if (state === 'MB') {
    return 0.13; 
  } else if (state === 'NB' || state === 'NL' || state === 'NS' || state === 'PE') {
    return 0.15; 
  } else if (state === 'ON') {
    return 0.13; 
  } else if (state === 'QC') {
    return 0.14975; 
  } else if (state === 'SK') {
    return 0.11;
  } else if (state === 'NT' || state === 'NU' || state === 'YT') {
    return 0.05;
  } else {
    return 0;
  }
}
 
  





  
   

