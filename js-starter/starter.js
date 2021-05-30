/**
 * @param {number} a first factor
 * @param {number} b second factor
 * @return {number} the product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * For every odd number less than n, prints out the number or "FizzBuzz" if the
 * number is divisible by 15, or "Fizz" if the number is divisible by 3, or
 * "Buzz" if the number is divisible by 5.
 * @param {number} n a positive, whole number
 */
function fizzBuzz(n) {
  if (n < 1) {
    return;
  }
  for (var i = 0; i < n; i++) {
    if (i % 2 === 1) {
      if (i % 15 === 0) {
        console.log("FizzBuzz");
      } else if (i % 3 === 0) {
        console.log("Fizz");
      } else if (i % 5 === 0) {
        console.log("Buzz");
      } else {
        console.log(i);
      }
    }
  }
}

/**
 * @param {number} n a positive, whole number
 * @return {boolean} whether the number is prime
 */
function isPrime(n) {
  if (n <= 1) {
    return false;
  }
  half = n / 2;
  for (var i = 2; i <= half; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

/**
 * @return {object} an array of the numbers from 0 to 100
 */
function getArray0To100() {
  var x = [];
  for (var i = 0; i <= 100; i++) {
    x.push(i);
  }
  return x;
}

/**
 * @param {object} array of numbers
 * @return {number} a the sum of the array elements
 */
function sumOfElements(a) {
  var sum = 0;
  for (var i = 0; i < a.length; i++) {
    sum += a[i];
  }
  return sum;
}

/**
 * @param {object} o any object
 * @return {boolean} whether the object is a person (has a name, age, and children)
 */
function isPerson(o) {
  if (typeof o.name === "string" && o.name.length > 0
      && typeof o.age === "number" && o.age >= 0
      && typeof o.children === "object") {
    for (var i = 0; i < o.children.length; i++) {
      if (!isPerson(o.children[i])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

/**
 * @param {object} a array of strings
 * @param {number} n trim length
 */
function trimStringsInPlace(a, n) {
  for (var s = 0; s < a.length; s++) {
    if (a[s].length <= n) {
      continue;
    } else {
      var chars = a[s].split("");
      var newChars = [];
      var charCount = 0;
      for (var i = 0; charCount < n && i < chars.length; i++) {
        if (chars[i] !== ' ' && chars[i] !== '\n') {
          charCount++;
        }
        newChars.push(chars[i]);
      }
      for (var i = newChars.length; i >= 0; i--) {
        if (newChars[i] === ' ' || newChars[i] === '\n') {
          newChars[i] = "";
        } else {
          break;
        }
      }
      a[s] = newChars.join("") + "...";
    }
  }
}

/**
 * @param {object} a array of strings
 * @param {number} n trim length
 * @return {object} new array with trimmed strings
 */
function trimStrings(a, n) {
  var newArray = []
  for (var s = 0; s < a.length; s++) {
    if (a[s].length <= n) {
      continue;
    } else {
      var chars = a[s].split("");
      var newChars = [];
      var charCount = 0;
      for (var i = 0; charCount < n && i < chars.length; i++) {
        if (chars[i] !== ' ' && chars[i] !== '\n') {
          charCount++;
        }
        newChars.push(chars[i]);
      }
      for (var i = newChars.length; i >= 0; i--) {
        if (newChars[i] === ' ' || newChars[i] === '\n') {
          newChars[i] = "";
        } else {
          break;
        }
      }
      newArray[s] = newChars.join("") + "...";
    }
  }
  return newArray;
}

function doubleEachIn(a) {
  return a.map(function(n) {return n * 2});
}

function positivesIn(a) {
  return a.filter(function(n) {return n > 0});
}

function getNameOfPerson(person) {
  if (isPerson(person)) {
    return person.name;
  }
  return null;
}

function getNamesOfPeople(people) {
  return people.filter(isPerson).map(getNameOfPerson);
}

function map(a, func) {
  var a2 = [];
  for (var i = 0; i < a.length; i++) {
    a2.push(func(a[i]));
  }
  return a2;
}

function filter(a, func) {
  var a2 = [];
  for (var i = 0; i < a.length; i++) {
    if (func(a[i])) {
      a2.push(a[i]);
    }
  }
  return a2;
}

/**
 * @param {object} o any object
 * @param {object} a array of functions
 * @return {object} result of applying each function in sequence to o
 */
function transform(o, a) {
  for (var i = 0; i < a.length; i++) {
    a[i](o);
  }
  return o;
}

function functionGenerator(functions) {
  return function(o) {
    transform(o, functions);
  }
}
