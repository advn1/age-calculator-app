function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}


function isValidDate(year, month, day) {
    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let errors = [];

    if (!year || year < 1 || year > 9999) {
        errors.push('year');
    }
    if (!month || month < 1 || month > 12) {
        errors.push('month');
    }
    if (!day || day < 1 || day > daysInMonth[month - 1]) {
        errors.push('day');
    }

    return errors;
}

function changeData(state) {
    document.querySelector('.data-' + state).style.border = "1px solid red";
    document.querySelector('.title-' + state).style.color = "red";
    document.querySelector('.invalid-data-' + state).textContent = "Invalid " + state;
    document.querySelector('.invalid-data-' + state).hidden = false;
}

function resetState(state) {
    document.querySelector('.data-' + state).style.border = "1px solid gray";
    document.querySelector('.title-' + state).style.color = "black";
    document.querySelector('.invalid-data-' + state).textContent = "";
    document.querySelector('.invalid-data-' + state).hidden = true;
}

function calculateData(year, month, day) {
    const currentDate = new Date();
    let years = currentDate.getFullYear() - year;
    let months = currentDate.getMonth() - month + 1;
    let days = currentDate.getDate() - day
    if (months < 0) {
        years -= 1
        months = 12 + months
    }

    if (days < 0) {
        days = 31 + days
        months -=1
    }
    console.log(years,months,days)

    document.querySelector('.bold-years').textContent = years + " ";
    document.querySelector('.bold-months').textContent = months + " ";
    document.querySelector('.bold-days').textContent = days + " ";
}

function othername() {
    const day = document.querySelector('.data-day').value;
    const month = document.querySelector('.data-month').value;
    const year = document.querySelector('.data-year').value;

    const errors = isValidDate(year, month, day);

    if (errors.length === 0) {
        resetState('day');
        resetState('month');
        resetState('year');
        calculateData(year, month, day);
    } else {
        errors.forEach(changeData);
    }
}
