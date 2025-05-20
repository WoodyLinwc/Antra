// explicit type annotation
var num = 100;
var str = "hello";
var u = undefined;
var n = null;
// array
var numArray = [1, 2, 3, 4];
// function declaration
function add(x, y) {
    return x + y;
}
// arrow function, 
var times = function (x, y) {
    return x * y;
};
var minus = function (x, y) {
    return x - y;
};
// any: revert to JS dynamic typing
// unknown: must use type checking before operations
function convert(data) {
    if (typeof data === "string") {
        return parseInt(data);
    }
    else if (typeof data === "number") {
        return String(data);
    }
    else {
        return null;
    }
}
// object, anonymous inline
var person = {
    name: "Woody",
    age: 23,
};
var person2 = {
    name: "John",
    id: "123",
    school: "UMB"
};
var person3 = {
    name: "Alice",
    age: 33,
    gender: "Female",
};
// Enums
var Direction;
(function (Direction) {
    Direction["Up"] = "Up";
    Direction["Down"] = "Down";
})(Direction || (Direction = {}));
;
var user = Direction.Down;
// generic type
function toArray(x, y) {
    return [x, y];
}
var result = toArray("1", 2);
function toArray2() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    return items;
}
var stringOnly = toArray2("1", "2");
var numberOnly = toArray2(3, 4);
// tuple
var tuple = ["world", 42, undefined];
