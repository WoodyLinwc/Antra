function person(){
    let count = 0;

    return {
        getCount(){
            return count;
        },

        add(){
            count++;
            return count;
        }
    }
}


const counter = person();

