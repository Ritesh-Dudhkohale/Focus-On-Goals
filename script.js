// Selecting the error label element for displaying error messages
let errorLabel = document.getElementsByClassName("error-label")[0];

// LocalStorage is a browser-provided storage object, part of the Browser Object Model (BOM) like document (DOM).

// Integrating LocalStorage for goals data
let goalsData = JSON.parse(localStorage.getItem('goalsData')) || {
    'first-goal': {
        name: '',
        completed: false,
    },
    'second-goal': {
        name: '',
        completed: false,
    },
    'third-goal': {
        name: '',
        completed: false,
    }
};

// Selecting the first element with the class "progress-value" for the progress bar
let progressBar = document.querySelectorAll('.progress-value')[0];

// Function to update the progress bar based on completed goals
function progressBarUpdate() {
    //counting length by making array of completed goal
    let progress = Object.values(goalsData).filter((goal) => goal.completed).length;

    progressBar.style.width = `${(progress / 3) * 100}%`;
    progressBar.firstElementChild.textContent = `${progress}/3 completed`;
}
progressBarUpdate();// Initial update of progress bar on page load

// Adding an event listener for checkbox actions for each checkbox
let checkBoxList = document.querySelectorAll('.checkbox');
checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (event) => {

        // Checking whether goals input fields are filled or empty
        let checkGoalSets = [...goalsList].every((goalText) => {
            return goalText.value.trim();
        });

        // Check if all goal input fields have values else clicking them throw warning
        if (checkGoalSets) {
            checkbox.parentElement.classList.toggle('completed');

            // Get the goal number from the next sibling element's ID
            let goalsNumber = checkbox.nextElementSibling.id;
            goalsData[goalsNumber].completed = !goalsData[goalsNumber].completed;

            // Updating localstorage and progressbar after click on checkbox
            localStorage.setItem('goalsData', JSON.stringify(goalsData));
            progressBarUpdate();
        } else {
            errorLabel.innerHTML = `Please set all the 3 goals!`;
        }
    });
});

// This code runs when the page is loaded to set the goals entered last time for each goals input box
let goalsList = document.querySelectorAll('.goal-input');
goalsList.forEach((goal) => {
    // Getting old/saved data from LocalStorage when the client hits the URL
    goal.value = goalsData[goal.id].name || '';

    // Getting the initial flag of completion from LocalStorage at loading 
    let checkBoxFlag = goalsData[goal.id].completed;
    if (checkBoxFlag) {
        //and changing class based on that flags
        goal.parentElement.classList.toggle('completed');
    }

    // Saving change data in LocalStorage 
    goal.addEventListener('input', (e) => {

        //goal input box should not change if checkbox is clicked
        if (goalsData[goal.id].completed) {
            goal.value = goalsData[goal.id].name
            return
        }

        goalsData[goal.id] = {
            name: goal.value,
            completed: false,
        };
        localStorage.setItem('goalsData', JSON.stringify(goalsData));
    });

    // Clear error message on focus on input box
    goal.addEventListener('focus', () => (errorLabel.innerHTML = ''));
});
