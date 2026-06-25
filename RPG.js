const number = document.getElementById("length");
const includeUppercase = document.getElementById("includeUppercase");
const includeLowercase = document.getElementById("includeLowercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const generatePass = document.getElementById("generatePass");
const retry = document.getElementById("retry");
const password = document.getElementById("password");
const passwordStrength = document.getElementById("passwordStrength");

generatePass.addEventListener("click", () => {
    if (!number.value) return alert("Please enter a password length!"); 
    let charset = "";
    if (includeUppercase.checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase.checked) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers.checked) charset += "0123456789";
    if (includeSymbols.checked) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
        alert("Please select at least one character type.");
        return;
    }
    if (number.value < 4 || number.value > 32) {
        alert("Please enter a password length between 4 and 32.");
        return;
    }

    let generatedPassword = "";
    for (let i = 0; i < number.value; i++) {
        generatedPassword += charset[Math.floor(Math.random() * charset.length)];
    }
    password.textContent = generatedPassword;
    checkstrength(generatedPassword);
});

function checkstrength(pass) {
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pass);
    const typesCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;

    if (pass.length >= 12 && typesCount >= 3) {
        passwordStrength.textContent = "Very Strong 💪";
        passwordStrength.className = "mx-3 px-2 text-sm font-bold text-green-500";
}
    else if (pass.length >= 12 && typesCount >=2){
        passwordStrength.textContent = "Strong ✅";
        passwordStrength.className = "mx-3 px-2 text-sm font-bold text-blue-500";
    }
    else if (pass.length >= 8){
        passwordStrength.textContent = "Medium ⚠️";
        passwordStrength.className = "mx-3 px-2 text-sm font-bold text-yellow-500";
    }
    else if (pass.length >= 4){
        passwordStrength.textContent = "Weak ❌";
        passwordStrength.className = "mx-3 px-2 text-sm font-bold text-red-500";
    }
}
retry.addEventListener("click", () => {
    password.textContent = "------------";
    passwordStrength.textContent = "";
    number.value = "";
    includeUppercase.checked = false;
    includeLowercase.checked = false;
    includeNumbers.checked = false;
    includeSymbols.checked = false;
});

function copyPassword() {
    if (password.textContent === "------------") {
        alert("No password to copy! Generate a password first.");
        return;
    }
  navigator.clipboard.writeText(password.textContent);
  const toast = document.getElementById("toast");
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 1500);
}
window.onload = () => generatePass.click();