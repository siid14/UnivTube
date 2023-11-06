const form = document.querySelector('form');

// * validate username input - input test : Ateyaba
const usernameInput = form.querySelector('#username');
let usernameValue = usernameInput.value; // * "let" to ensure that any user input update is assigned
const usernameRegex = /^[a-zA-Z]/;
// yes
function validateUsername(event) {
  console.log('Username value:', usernameValue);
  
  // ? maybe couple both conditions with &&
  // checking first character is letter
  if (!usernameRegex.test(usernameValue)) {
    event.preventDefault();
    console.log('Username validation failed');
    alert('Username must start with a letter');
  }

  // checking if input is 3 characters minimum
  if(!(usernameValue.length >= 3)){
    event.preventDefault();
    console.log('Username validation failed');
    alert('Username must be 3 or more characters');
  }
}

// * validate password input - password test : -P@ssw0rd-! 
const passwordInput = form.querySelector('#pwd');
let passwordValue = passwordInput.value; // * "let" to ensure that any user input update is assigned
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[/*\-+!@#$%^&~\[\]\-])[a-zA-Z\d/*\-+!@#$%^&~\[\]\-]{8,}$/;

// ! linked with !2
// const passwordRegex2 = /^(?=.*[A-Z]?)(?=.*\d?)(?=.*[/*\-+!@#$%^&~\[\]\-]?)(?=.*[a-z]?)[a-zA-Z\d/*\-+!@#$%^&~\[\]\-]{8,}$/;

function validatePassword(event){
console.log('Password value:', passwordValue);

    // checking if password input meets all conditions
  if (!passwordRegex.test(passwordValue)){
    event.preventDefault();
    console.log('Password validation failed');

    // * alerts to user 
    // checking all conditions 
    if (!passwordRegex.test(passwordValue)) {
      alert('Password must contain at least one uppercase letter, one number, and one of the following special characters: / * - + ! @ # $ ^ & ~ [ ]');
    }

    // checking length conditions only
    if (!(passwordValue.length >= 8)) {
      alert('Password must be 8 or more characters');
    }
  }

  // !2 don't work - trying to return specific missing requirements alert to user 
  // !2 issue with code not recognizing missing requriement, maybe Regex expression to review
  // if (!passwordRegex2.test(passwordInput.value)) {
  //   event.preventDefault();
  //   console.log('Password validation failed');
  
  //   const missingRequirements = [];
  
  //   if (!/(?=.*[A-Z])/.test(passwordInput.value)) {
  //     missingRequirements.push("an uppercase letter");
  //   }
  //   if (!/(?=.*\d)/.test(passwordInput.value)) {
  //     missingRequirements.push("a digit");
  //   }
  //   if (!/(?=.*[/*\-+!@#$%^&~\[\]\-])/.test(passwordInput.value)) {
  //     missingRequirements.push("a special character");
  //   }
  //   alert(`Password must contain at least ${missingRequirements.join(", ")}.`);
  // }
} 


// * validate confirm password input (in conjunction with password input)
const confirmPasswordInput = form.querySelector('#confirmpwd');
// const confirmPasswordValue = confirmPasswordInput.value;

function validateConfirmPassword(event){
const confirmPasswordValue = confirmPasswordInput.value;
console.log('Confirm Password value:', confirmPasswordValue);

// checking if password input is similar to confirm password input through various conditions
if(confirmPasswordValue.length == passwordValue.length){
    // console.log("Both string have the same length")
    // let sameCharacter = true;

    // * alert to user
    for(let i = 0; i < confirmPasswordValue.length; i++){
        if(confirmPasswordValue[i] != passwordValue[i]){
            // sameCharacter = false;
            event.preventDefault();
            console.log('Confirm Password validation failed');
            alert('Password and Confirm Password must match');
            break;
        } 
        // if (sameCharacter) {
        //     console.log("Both strings have the same characters");
        // }
    }
  } else {
           event.preventDefault();
           console.log("Confirm Password validation failed") // not the same length
           alert('Password and Confirm Password must match');
        }
} 


// * validate email input - test : ateyaba@gmail.com
const emailInput = form.querySelector("#email");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(event){
  const emailValue = emailInput.value;

  // * alert to user
  // check if email input is in the correct format 
  if(!emailRegex.test(emailValue)){
    event.preventDefault;
    console.log("Email validation failed");
    alert('Email is not in a valid format')
  }

}

// * for update of user input change (add/delete characters)
usernameInput.addEventListener('input', () => {
  usernameValue = usernameInput.value;
});

passwordInput.addEventListener('input', () => {
  passwordValue = passwordInput.value;
});

emailInput.addEventListener('input', () => {
emailValue = emailInput.value;
})


// * when user submit/press enter key the registration form
form.addEventListener('submit', function(event) {
  console.log('Form submitted');
  // validateUsername(event);
  // validateEmail(event);
  // validatePassword(event);
  // validateConfirmPassword(event);
});

