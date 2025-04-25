export const View = (() => {
    // DOM elements
    const goalForm = document.getElementById('goal-form');
    const goalDescription = document.getElementById('goal-description');
    const goalCategory = document.getElementById('goal-category');
    const goalReps = document.getElementById('goal-reps');
    const addGoalBtn = document.getElementById('add-goal-btn');
    const goalsList = document.getElementById('goals-list');

    const getInputValues = () => {
        return {
            description: goalDescription.value.trim(),
            category: goalCategory.value,
            repetitions: goalReps.value.trim(),
        };
    };

    const clearInputs = () => {
        goalDescription.value = '';
        goalCategory.value = '';
        goalReps.value = '';
    };

    const validateForm = () => {
        const {description, category, repetitions } = getInputValues();
        return description !== '' && category !== '' && repetitions !== '';
    }

    const renderGoals = (goals) => {
        goalsList.innerHTML = '';

        goals.forEach((goal) => {
            const goalItem = document.createElement('li');
            goalItem.id = goal.id;
            goalItem.className =  `goal-item ${goal.achieved} ? 'goal-achieved' : ''`;

            const goalInfo = document.createElement('div');
            goalInfo.className = 'goal-info';


            // goal description
            const descSpan = document.createElement('span');
            descSpan.textContent = `${goal.description} - `;

            // category (bold)
            const catSpan = document.createElement('span');
            catSpan.className = 'goal-category';
            catSpan.textContent = goal.category;

            // repetitions (in parentheses)
            const repsSpan = document.createElement('span');
            repsSpan.className = 'goal-repetitions';
            repsSpan.textContent = ` (${goal.repetitions})`;

            goalInfo.appendChild(descSpan);
            goalInfo.appendChild(catSpan);
            goalInfo.appendChild(repsSpan);

            // mark as achieved button
            const achievedBtn = document.createElement('button');
            achievedBtn.className = 'btn-achieved';
            achievedBtn.textContent = 'Mark as Achieved';
            achievedBtn.disabled = goal.achieved;

            goalItem.appendChild(goalInfo);
            goalItem.appendChild(achievedBtn);
            goalsList.appendChild(goalItem);
        });
    };

    return{
        goalForm,
        addGoalBtn,
        goalsList,
        getInputValues,
        clearInputs,
        validateForm,
        renderGoals,
    };
})();