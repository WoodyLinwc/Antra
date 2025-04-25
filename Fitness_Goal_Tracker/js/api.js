export const API = (() => {
    const baseURL = 'http://localhost:3000/goals';

    const getAllGoals = () => {
        return fetch(baseURL)
            .then(response => {
                if(!response.ok){
                    throw new Error('Failed to fetch goals');
                }

                return response.json();
            });
    };

    const createGoal = (newGoal) => {
        return fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGoal),
        })
        .then(response => response.json());
    };



    const updateGoal = (id, updatedFields) => {
        return fetch(`${baseURL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFields),
        })
        .then(response => response.json());
    };


    return {
        getAllGoals,
        createGoal,
        updateGoal,
    };

})();