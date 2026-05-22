// fetch data from data.json file
async function weeklyExpensesData() {

    const spend = await fetch('data.json')
    const data = await spend.json()

    return data;
};

// main opertaion
async function main() {
    const days = await weeklyExpensesData();
    const totalThisWeek = days.reduce((sum, item) => sum + item.amount, 0);
    let myBalance = 921.48;

    days.forEach(item => {
        let precentage = (item.amount / totalThisWeek) * 100;
        createElements(item.amount, precentage, item.day);
    });
    
    animateText();
    
}

// create html elements and adds valus
async function createElements(moneySpend, bar_pct, day) {

    let chart = document.querySelector(".chart");
    let div_bar_container = document.createElement('div');
    let div_bar = document.createElement('div');
    let spanTag = document.createElement('span');
    let labelTag = document.createElement('label');

    // Adding class to html elements
    div_bar_container.className = "bar-container";
    div_bar.className = "bar";

    // Adding values
    spanTag.textContent = "$" + moneySpend;
    labelTag.textContent = day;
    labelTag.htmlFor = day;

    let today = await weekOfTheDay();
    if ( today == day ) {
        div_bar.classList.add('today');
    }

    chart.append(div_bar_container);
    div_bar_container.append(spanTag);
    div_bar_container.append(div_bar);
    div_bar_container.append(labelTag);

    let finalheight = (bar_pct+10) + "%";
    div_bar.dataset.height = finalheight;
    div_bar.style.height = finalheight;

}

//high ligting the current day  
async function weekOfTheDay() {
    const days = await weeklyExpensesData();
    let d = new Date();
    let weekday = d.getDay() === 0 ? d.getDay() : d.getDay() - 1;
    
    let today = days[weekday]["day"];
    return today
}

main();

