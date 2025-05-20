// explicit type annotation
let num: number = 100;
let str: string = "hello";
let u: undefined = undefined;
let n: null = null;

// array
let numArray: number[] = [1,2,3,4];


// function declaration
function add(x: number, y: number): number{
    return x + y;
}


// arrow function, 
const times: (x: number, y: number) => number = (x, y) => {
    return x * y
};

const minus = (x: number, y:number): number => {
    return x - y;
}


// any: revert to JS dynamic typing
// unknown: must use type checking before operations
function convert(data: unknown){
    if(typeof data === "string"){
        return parseInt(data);
    }
    else if(typeof data === "number"){
        return String(data);
    } else {
        return null;
    }
}


// object, anonymous inline
let person: {name: string, age: number} = {
    name: "Woody",
    age: 23,
};


// type alias
type Person = {name: string, id: number | string, wage?: number};

// extend from another type
type Student = Person & {
    school: string
};

let person2: Student = {
    name: "John",
    id: "123",
    school: "UMB"
}

// string literal union type
type Gender = "Male" | "Female" | "Other"



// interface, declaration merging
interface IPerson {name: string, gender: Gender}
interface IPerson {age: number}
interface IEmployee extends IPerson {id: number}

let person3: IPerson = {
    name: "Alice",
    age: 33,
    gender: "Female",
}


// Enums
enum Direction {Up = "Up", Down = "Down"};
let user: Direction = Direction.Down;



// generic type
function toArray<T>(x: T, y: T): T[]{
    return [x, y];
}
const result = toArray<string | number>("1",2);


function toArray2<T extends string | number>(...items: T[]): T[]{
    return items;
}

const stringOnly = toArray2<string>("1","2");
const numberOnly = toArray2<number>(3,4);



// tuple
let tuple: [string, number, undefined] = ["world", 42, undefined];



