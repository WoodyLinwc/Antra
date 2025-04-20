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
    return s.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
}

// 6. Write a JavaScript function that accepts a string as a parameter and find the longest word within the string.
function longestWord(s){
    let wordsArray = s.split(' ');
    let longest = '';

    for(let word of wordsArray){
        if(word.length > longest.length){
            longest = word;
        }
    }
    return longest;
    
}


// 7. Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string.
function countVowel(s){
    let count = 0;
    const vowel = ['a','e','i','o','u'];
    // const vowel = 'aeiou';

    for(let char of s){
        if(vowel.includes(char.toLowerCase())){
            count++;
        }
    }
    return count;
}

// 8. Write a JavaScript function that accepts a number as a parameter and check the number is prime or not
function isPrime(num){
    if(num < 2) return false;

    for(let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++){
        if(num % i === 0) return false;
    }
    return true;
}

// 9. Write a JavaScript function which accepts an argument and returns the type
function getType(x){
    return typeof x;
}


// 10. Write a JavaScript function which returns the n rows by n columns identity matrix
function createIdentityMatrix(n){
    const matrix = [];

    for(let i = 0; i<n ;i++){
        let row = [];

        for(let j = 0; j<n;j++){
            row.push(j === i ? 1 : 0);
        }
        matrix.push(row);
    }
    return matrix;
}


// 11. Write a JavaScript function which will take an array of numbers stored and find the second lowest and second
// greatest numbers, respectively

function findSecond(arr){
    const result = [];

    const sortArr = [...arr].sort((a,b) => a - b);
    result.push(sortArr[1]);
    result.push(sortArr[arr.length-2]);


    return result;
}


// 12. Write a JavaScript function which says whether a number is perfect
function isPerfect(num){
    let sum = 0;

    for(let i = 1; i<num; i++){
        if(num % i === 0){
            sum += i;
        }
    }

    return sum === num;
}


// 13. Write a JavaScript function to compute the factors of a positive integer.
function findFactor(num){
    const result = [];

    for(let i = 1; i < num; i++){
        if(num % i === 0){
            result.push(i)
        }
    }
    return result;
}


// 14. Write a JavaScript function to convert an amount to coins.
function amountToCoins(amount, coins){

    const result = [];
    let remain = amount;
    const sortedCoins = [...coins].sort((a,b) => b - a);

    for(let coin of sortedCoins){

        while(remain >= coin){
            result.push(coin);
            remain -= coin;
        }
    }

    return result;
}


// 15. Write a JavaScript function to compute the value of bn where n is the exponent and b is the bases. Accept b and n
// from the user and display the result
function computePower(b,n){
    if(n === 0) return 1;

    if(n < 1){
        return 1 / computePower(b,-n)
    }

    let result = 1;
    for(let i = 0; i<n;i++){
        result *= b;
    }
    return result;
}


// 16. Write a JavaScript function to extract unique characters from a string.
function uniqueChar(s){
    const set = new Set();
    const result = [];

    for(let char of s){
        if(!set.has(char)){
            set.add(char);
            result.push(char)
        }
    }
    return result.join('');
}

// 17. Write a JavaScript function to get the number of occurrences of each letter in specified string.
function occurrences(s){
    const map = new Map();

    for(let char of s){
        // Only count letters (ignore spaces, numbers, symbols)
        if(/[a-zA-z]/.test(char)){
            map.set(char, (map.get(char) || 0) + 1);
        }
    }

    return map;
}

// 18. Write a function for searching JavaScript arrays with a binary search.
function binarySearch(arr, target){
    let left = 0;
    let right = arr.length - 1;

    while(left <= right){
        let mid = Math.floor(left + (right - left) / 2);

        if(arr[mid] === target){
            return mid;
        } else if(arr[mid] < target){
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}


// 19. Write a JavaScript function that returns array elements larger than a number.
function largerThan(arr, threshold){
    return arr.filter(element => typeof element === 'number' && element > threshold);
}


// 20. Write a JavaScript function that generates a string id (specified length) of random characters
function randomID(n){

    const list =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = list.length;
    let result = '';

    for(let i = 0; i<n;i++){
        let index = Math.floor(Math.random() * length);
        result += list[index];
    }

    return result;
}


// 21. Write a JavaScript function to get all possible subset with a fixed length (for example 2) combinations in an array.






// 22. Write a JavaScript function that accepts two arguments, a string and a letter and the function will count the number
// of occurrences of the specified letter within the string.

function countOccurrence(s, letter){
    const map = new Map();

    for(let char of s){
        map.set(char, (map.get(char) || 0) + 1);
    }

    return map.get(letter);
}

// 23. Write a JavaScript function to find the first not repeated character.
function notRepeat(s){
    const map = new Map();
    for(let char of s){
        map.set(char, (map.get(char) || 0) + 1);
    }

    // we need to preserve order, so not using for(let [key, value] of map)
    for(let char of s){
        if(map.get(char) === 1){
            return char;
        }
    }

    return undefined;
}

// 24. Write a JavaScript function to apply Bubble Sort algorithm.
function bubbleSort(arr){
    const result = [...arr];
    const n = arr.length;
    let swapped;


    for(let i = 0; i < n; i++){
        swapped = false;

        for(let j =0; j < n - i - 1; j++){
            if(result[j] > result[j+1]){
                [result[j],result[j+1]] = [result[j+1],result[j]];
                swapped = true;
            }
        }

        if(!swapped){
            break;
        }
    }
    return result;
}


// 25. Write a JavaScript function that accept a list of country names as input and returns the longest country name as
// output.
function longestCountry(countries){
    let longest = countries[0];

    for(let i = 0; i<countries.length; i++){
        if(countries[i].length > longest.length){
            longest = countries[i]
        }
    }
    return longest;
}
const countryList = ["Australia", "Germany", "United States of America", "Brazil", "India"];


// 26. Write a JavaScript function to find longest substring in a given a string without repeating characters.
function longestSubstringWithoutRepeating(s){
    let startIndex = 0;
    let maxLength = 0;
    let maxStartIndex = 0;

    const map = new Map();

    for(let i = 0; i<s.length;i++){
        const char = s[i];

        // if seen this char before and it's within current window
        if(map.has(char) && map.get(char) >= startIndex){
            startIndex = map.get(char) + 1;
        }

        // update the most recent index of this char
        map.set(char, i);

        // check if the current substring is longer than our max
        let currentLength = i - startIndex + 1;
        if(currentLength > maxLength){
            maxLength = currentLength;
            maxStartIndex = startIndex;
        }
    }

    return s.substring(maxStartIndex, maxStartIndex + maxLength);
}

// 27. Write a JavaScript function that returns the longest palindrome in a given string.
function longestPalindrome(s){
    function expand(i,j){
        let left = i;
        let right = j;

        while(left >= 0 && right < s.length && s[left] == s[right]){
            left--;
            right++;
        }
        return s.slice(left + 1, right);
    }

    let result = '';

    for(let i = 0; i<s.length; i++){
        // expand for odd palindrome
        let odd = expand(i,i);
        if(odd.length > result.length){
            result = odd;
        }

        // expand for even palindrome
        let even = expand(i,i+1);
        if(even.length > result.length){
            result = even;
        }
    }
    return result;
}


// 28. Write a JavaScript program to pass a 'JavaScript function' as parameter.
function operation(callback, data){
    return callback(data);
}
function double(x){
    return x * 2;
}
// console.log(operation(double,10))

// 29. Write a JavaScript function to get the function name.
function getFunctionName(fn){
    if(typeof fn !== 'function') return null;

    return fn.name;
}
