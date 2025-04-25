import { Model } from "./Model.js";
import { View } from "./View.js";
import { API } from "./api.js";



const Controller = ((model, view, api) => {
    const state = new model.State();


    // add event listeners for form submission
    const addGoalHandler = (e) => {
        e.preventDefault();

        if(!view.validateForm()){
            alert('Please fill out all fields');
            return;
        }

        const {description, category, repetitions} = view.getInputValues();

        const newGoal = {
            description,
            category,
            repetitions,
            achieved: false
        };

        api.createGoal(newGoal).then(createdGoal => {
            state.addGoal(createdGoal);
            view.clearInputs();
        });
    };

    // mark goal as achieved
    const markAsAchievedHandler = (id) => {
        api.updateGoal(id, {achieved: true}).then(updatedGoal => state.markAsAchieved(id));
    };


    const init = () => {
        // subscribe view to model changes
        state.subscribe(() => {
            view.renderGoals(state.goals);
        })

        // load initial goals from server
        api.getAllGoals().then(goals => state.goals = goals);


        view.goalForm.addEventListener('submit', addGoalHandler);

        // event delegation
        view.goalsList.addEventListener('click', (e) => {
            if(e.target.className === 'btn-achieved' && !e.target.disabled){
                const goalItem = e.target.closest('li');
                const id = goalItem.id;
                markAsAchievedHandler(id);
            }
        });
    };

    return {init};
})(Model, View, API);


Controller.init();