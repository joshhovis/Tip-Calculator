const billInput = document.querySelector(".tip__bill-input");
const customTipInput = document.querySelector(".tip__selection-custom");
const peopleInput = document.querySelector(".tip__people-input");
const tipItems = document.querySelectorAll(".tip__selection-item");
const resultAmount = document.querySelector(".tip__results-amount-number");
const resultTotal = document.querySelector(".tip__results-total-number");
const resetButton = document.querySelector(".tip__results-button");

let selectedTip = null;

tipItems.forEach((item) => {
    item.addEventListener("click", handleTipSelection);
});

customTipInput.addEventListener("input", handleCustomTipInput);

billInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);

resetButton.addEventListener("click", resetCalculator);
