export const Model = (() => {
    class State {
        #goals = [];
        #onChange = () => {};

        get goals(){
            return this.#goals;
        }

        set goals(newGoals){
            this.#goals = newGoals;
            this.#onChange();
        }

        addGoal(newGoal){
            this.goals = [...this.goals, newGoal];
        }

        // removeGoal(id)
        removeGoal(id){
            this.goals = this.goals.filter(goal => goal.id !== id);
        }

        updateGoals(id, updateGoal){
            this.goals = this.goals.map((goal) => 
                goal.id === id ? {...goal, ...updateGoal} : goal
            );
        }

        markAsAchieved(id){
            this.goals = this.goals.map((goal) =>
                goal.id === id ? {...goal, achieved: true} : goal
            );
        }

        subscribe(callback){
            this.#onChange = callback;
        }
    }

    return {State};
})();