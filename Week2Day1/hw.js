const arr = [1,2,3,4,5];
console.log(arr)

// map
console.log(`using map ${arr.map(item => item * 2)}`)

Array.prototype.myMap = function(callback){
    const result = [];
    for(let i = 0; i < this.length; i++){
        result.push(callback(this[i],i,this))
    }
    return result;
}
console.log(arr.myMap(item => item * 2))

// filter
console.log(`using filter ${arr.filter(item => item > 3)}`)

Array.prototype.myFilter = function(callback){
    const result = [];
    for(let i = 0; i < this.length;i++){
        if(callback(this[i],i,this)){
            result.push(this[i])
        }
        // if(callback(this[i])){
        //     result.push(this[i])
        // }
    }
    return result;
}
console.log(arr.myFilter(item => item > 3))

// reduce
console.log(`using reduce ${arr.reduce((acc,value) => value + acc, 0)}`)

Array.prototype.myReduce = function(callback, initialValue){
    let result = initialValue;

    for(let i = 0;i<this.length;i++){
        result = callback(result,this[i],i,this);
    }
    return result;
}

console.log(arr.myReduce((acc,value) => value + acc, 0));

// includes
console.log(`using includes ${arr.includes(5)}`)

Array.prototype.myIncludes = function(value){
    for(let i = 0;i<this.length;i++){
        if(value === this[i]){
            return true;
        }
    }
    return false;
}

console.log(arr.myIncludes(5))



// find
console.log(`using find ${arr.find(item => item > 2)}`)

Array.prototype.myFind = function(callback){
    for(let i = 0;i<this.length;i++){
        if(callback(this[i], i, this)){
            return this[i]
        }
    }
    return undefined;
}

console.log(arr.myFind(item => item > 2))


//slice
console.log(`using slice ${arr.slice(1,3)}`)

Array.prototype.mySlice = function(start = 0, end = this.length){
    const result = [];

    let realStart = start < 0 ? start + this.length : start;
    let realEnd = end < 0 ? end + this.length : end;

    for(let i = realStart; i < realEnd; i++){
        result.push(this[i])
    }
    return result;
}

console.log(arr.mySlice(-1))