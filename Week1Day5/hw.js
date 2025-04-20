// 1. Write a JavaScript function that reverse a number.
function reverse(num){
    return num.toString().split("").reverse().join("");
}

// 2. Write a JavaScript function that checks whether a passed string is palindrome or not?
function isPalindrome(s){
    // return s === s.split("").reverse().join("");
    let left = 0;
    let right = s.length - 1;

    while(left < right){
        if(s[left] !== s[right]){
            return false;
        }
        left++;
        right--;
    }
    return true;
}

// 3. Write a JavaScript function that generates all combinations of a string.
function allCombination(s){
    const result = [];

    for(let i = 0; i<s.length;i++){
        let combination = '';

        for(let j = i; j < s.length;j++){
            combination += s[j];
            result.push(combination);
        }
    }
    return result;
}

// 4. Write a JavaScript function that returns a passed string with letters in alphabetical order.
function alphabeticalOrder(s){
    return s.split("").sort().join("");
}


// 5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in Upper case
function firstUpperCase(s){
    return s.split(" ").map(word => word.charAt(0).)
}