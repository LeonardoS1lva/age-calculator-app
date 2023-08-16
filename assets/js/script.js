const form = document.getElementById("form");

const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");

const resultDay = document.getElementById("result-day");
const resultMonth = document.getElementById("result-month");
const resultYear = document.getElementById("result-year");

const fieldErrorDay = document.getElementById("error-day")
const fieldErrorMonth = document.getElementById("error-month")
const fieldErrorYear = document.getElementById("error-year")

const labelDay = document.querySelector("#form > div.header > div:nth-child(1) > label > span");
const labelMonth = document.querySelector("#form > div.header > div:nth-child(2) > label > span");
const labelYear = document.querySelector("#form > div.header > div:nth-child(3) > label > span");

const actualDate = new Date();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    cleanForm();
    if (validForm()) {
        calcAge();
    }
});

function cleanForm() {
    fieldErrorDay.innerHTML = "";
    fieldErrorMonth.innerHTML = "";
    fieldErrorYear.innerHTML = "";

    inputDay.classList.remove("error-border");
    inputMonth.classList.remove("error-border");
    inputYear.classList.remove("error-border");

    labelDay.classList.remove("error-empty");
    labelMonth.classList.remove("error-empty");
    labelYear.classList.remove("error-empty");

    resultDay.innerHTML = "--";
    resultMonth.innerHTML = "--";
    resultYear.innerHTML = "--";
}

function validDate() {
    switch (parseInt(inputMonth.value)) {
        case 4: case 6:
        case 9: case 11:
            if (inputDay.value > 30) {
                fieldErrorDay.innerHTML = "Must be a valid date";
                return false;
            }
            break;
        case 2:
            if ((inputYear.value % 400 == 0) || (inputYear.value % 4 == 0 && inputYear.value % 100 != 0)) {
                if (inputDay.value > 29) {
                    fieldErrorDay.innerHTML = "Must be a valid date";
                    return false;
                }
            }
            else if (inputDay.value > 28) {
                fieldErrorDay.innerHTML = "Must be a valid date";
                return false;
            }
    }
    return true;
}

function validForm() {
    let isValidDate = true;
    if (inputDay.value === "") {
        fieldErrorDay.innerHTML = "The field is required";
        inputDay.classList.add("error-border");
        labelDay.classList.add("error-empty");
        isValidDate = false;
    } else if (inputDay.value > 31 || inputDay.value < 1) {
        fieldErrorDay.innerHTML = "Must be a valid day";
        inputDay.classList.add("error-border");
        labelDay.classList.add("error-empty");
        isValidDate = false;
    }

    if (inputYear.value === "") {
        fieldErrorYear.innerHTML = "The field is required";
        inputYear.classList.add("error-border");
        labelYear.classList.add("error-empty");
        isValidDate = false;
    } else if (inputYear.value > actualDate.getFullYear() || inputYear.value < 1) {
        fieldErrorYear.innerHTML = "Must be in the past";
        inputYear.classList.add("error-border");
        labelYear.classList.add("error-empty");
        isValidDate = false;
    }

    if (inputMonth.value === "") {
        fieldErrorMonth.innerHTML = "The field is required";
        inputMonth.classList.add("error-border");
        labelMonth.classList.add("error-empty");
        isValidDate = false;
    } else if (inputMonth.value > 12 || inputMonth.value < 1) {
        fieldErrorMonth.innerHTML = "Must be a valid month";
        inputMonth.classList.add("error-border");
        labelMonth.classList.add("error-empty");
        isValidDate = false;
    } else if (!validDate()) {
        isValidDate = false;
    }

    if (!isValidDate) {
        inputDay.classList.add("error-border");
        inputMonth.classList.add("error-border");
        inputYear.classList.add("error-border");
        labelDay.classList.add("error-empty");
        labelMonth.classList.add("error-empty");
        labelYear.classList.add("error-empty");
        return false;
    }
    return true;
}

function calcAge() {
    let actualDay = actualDate.getDate();
    let actualMonth = actualDate.getMonth() + 1;
    let actualYear = actualDate.getFullYear();

    resultYear.innerHTML = (actualYear - inputYear.value);
    if (inputMonth.value > actualMonth) {
        resultYear.innerHTML = (actualYear - inputYear.value) - 1;
        if (inputDay.value > actualDay) {
            resultMonth.innerHTML = 12 - (inputMonth.value - actualMonth) - 1;
            resultDay.innerHTML = calcDay(actualMonth, actualYear) - (inputDay.value - actualDay);
        } else {
            resultMonth.innerHTML = 12 - (inputMonth.value - actualMonth);
            resultDay.innerHTML = actualDay - inputDay.value;
        }
    } else {
        if (inputDay.value > actualDay) {
            resultYear.innerHTML = (actualYear - inputYear.value) - 1;
            resultMonth.innerHTML = 12 - (actualMonth - inputMonth.value) - 1;
            resultDay.innerHTML = calcDay(actualMonth, actualYear) - (inputDay.value - actualDay);
        } else {
            resultMonth.innerHTML = actualMonth - inputMonth.value;
            resultDay.innerHTML = actualDay - inputDay.value;
        }
    }
}

function calcDay(month, year) {
    let daysMonth;
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            daysMonth = 31
            break;
        case 4: case 6: case 9: case 11:
            daysMonth = 30;
            break;
        case 2:
            if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {
                daysMonth = 29;
            }
            else {
                daysMonth = 28;
            }
    }
    return daysMonth;
}