var makeCounter = function() {
  var i = 0;

  return function() {
    i++;
    return i;
  };
};

var counter = makeCounter();
var counter2 = makeCounter();

var brokenMakeCounter = function() {
  return function() {
    var i = 0;
    i++;
    return i;
  };
}

var brokenCounter = brokenMakeCounter();



var doIt = function() {
  setTimeout(function() {
    console.log("Hello!");
  }, 1000);
}



var a = [1,2,3,4];

// for (var i = 0; i < a.length; i++) {
//   setTimeout(function() {
//     console.log(a[i]);
//   }, 500);
// }

// a.forEach(function(element) {
//   setTimeout(function() {
//     console.log(element);
//   }, 500);
// });






//
// Arguments keyword
//

var printArguments = function() {
  console.log(arguments);
  console.log(arguments instanceof Array);
}

var sum = function() {
  var result = 0;

  for (var i = 0; i < arguments.length; i++) {
    result = result + arguments[i];
  }

  return result;
}

// Array-like object: Object with a length property
// and which has properties with numeric names.
