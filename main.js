document.addEventListener("DOMContentLoaded", () => {
    const billInput = document.querySelector(".tip__bill-input");
    const customTipInput = document.querySelector(".tip__selection-custom");
    const peopleInput = document.querySelector(".tip__people-input");
    const resultAmount = document.querySelector(".tip__results-amount-number");
    const resultTotal = document.querySelector(".tip__results-total-number");
    const resetButton = document.querySelector(".tip__results-button");
    const tipItems = document.querySelectorAll(".tip__selection-item");
    const peopleError = document.querySelector(".tip__people--error");
    let selectedTip = null;

    /*
     * Handle tip selection
     * - Adds active class to selected tip item
     * - Removes active class from other tip items
     * - Clears and deactivates custom tip input
     * - Updates selectedTip value
     * - Calls calculateTip to update results
     */
    tipItems.forEach((item) => {
        item.addEventListener("click", () => {
            tipItems.forEach((i) => i.classList.remove("active"));
            item.classList.add("active");
            selectedTip = parseFloat(
                item
                    .querySelector(".tip__selection-number")
                    .innerText.replace("%", "")
            );

            customTipInput.value = "";
            customTipInput.classList.remove("active");

            calculateTip();
        });
    });

    /*
     * Handle custom tip input
     * - Removes active class from all tip items
     * - Adds active class to custom tip input
     * - Updates selectedTip value
     * - Calls calculateTip to update results
     */
    customTipInput.addEventListener("input", () => {
        tipItems.forEach((i) => i.classList.remove("active"));
        customTipInput.classList.add("active");
        selectedTip = parseFloat(customTipInput.value);
        calculateTip();
    });

    /*
     * Validate and calculate tip
     * - Validates bill and people inputs using validator.js
     * - Calculates tip amount and total amount per person
     * - Updates resultAmount and resultTotal with calculated values
     */
    function calculateTip() {
        const bill = parseFloat(billInput.value);
        const people = parseFloat(peopleInput.value);

        if (
            !validator.isFloat(billInput.value, { min: 0.01 }) ||
            !validator.isInt(peopleInput.value, { min: 1 })
        ) {
            resultAmount.innerText = "$0.00";
            resultTotal.innerText = "$0.00";

            if (
                !validator.isInt(peopleInput.value, { min: 1 }) ||
                !validator.isFloat(billInput.value, { min: 0.01 })
            ) {
                peopleInput.style.border = "1px solid #E17052";
                peopleInput.style.outline = "1px solid #E17052";
                peopleError.style.display = "inline";

                peopleInput.style.border = "1px solid #E17052";
                peopleInput.style.outline = "1px solid #E17052";
                peopleError.style.display = "inline";
            } else {
                peopleInput.style.border = "";
                peopleInput.style.outline = "";
                peopleError.style.display = "none";
            }

            return;
        }

        peopleInput.style.border = "";
        peopleInput.style.outline = "";
        peopleError.style.display = "none";

        if (!selectedTip || isNaN(selectedTip)) {
            resultAmount.innerText = "$0.00";
            resultTotal.innerText = "$0.00";
            return;
        }

        const tipAmount = (bill * (selectedTip / 100)) / people;
        const totalAmount = bill / people + tipAmount;

        resultAmount.innerText = `$${tipAmount.toFixed(2)}`;
        resultTotal.innerText = `$${totalAmount.toFixed(2)}`;
    }

    billInput.addEventListener("input", calculateTip);
    peopleInput.addEventListener("input", calculateTip);

    /*
     * Reset calculator
     * - Clears all input fields and result values
     * - Removes active class from all tip items and custom tip input
     * - Resets selectedTip value
     */
    resetButton.addEventListener("click", () => {
        billInput.value = "";
        customTipInput.value = "";
        peopleInput.value = "";
        tipItems.forEach((i) => i.classList.remove("active"));
        customTipInput.classList.remove("active");
        selectedTip = null;
        resultAmount.innerText = "$0.00";
        resultTotal.innerText = "$0.00";
        peopleInput.style.border = "";
        peopleInput.style.outline = "";
        peopleError.style.display = "none";
    });
});
