document.getElementById('my-button').addEventListener('click', function() {

const textSecondaryClass = "text-secondary";

const listItems = document.getElementsByClassName("listItem");

console.log(listItems);

for (const item of listItems) {
  item.classList.add(textSecondaryClass);
}

const pElements = document.getElementsByTagName("p");

for (const item of pElements) {
  item.classList.add("text");
}

const heading1 = document.querySelector("#heading");
console.log(heading1);
heading1.textContent = "Heading of the page";

const textSecondaryElements = document.querySelectorAll(".text-secondary");
console.log(textSecondaryElements);

textSecondaryElements.forEach((element) => {
  element.classList.add("color-red");
  element.classList.remove([textSecondaryClass, "list-group-item"]);
});


const emailInput = document.getElementsByName("email")[0];
console.log(emailInput);

emailInput.placeholder = "john@gmail.com";
/**
 *
 * 1. Is it variable/function name?
 * 2. Is it a number?
 * 3. Is it a boolean?
 * 4. Is it another suppported JS type (undefined, null, Nan)?
 */
});