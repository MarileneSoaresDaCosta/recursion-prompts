/* jshint esversion: 6 */

// Solve the following prompts using recursion.

// 1. Calculate the factorial of a number. The factorial of a non-negative integer n,
// denoted by n!, is the product of all positive integers less than or equal to n.
// Example: 5! = 5 x 4 x 3 x 2 x 1 = 120
// factorial(5); // 120
var factorial = function(n) {
  // edge case
  if ( n < 0 ) {
    return null;
  }
  // base case
  if ( n === 1 || n === 0) {
    return 1;
  } else {

    var fact = n * factorial(n-1);
    // console.log('fact of ' , n, ' is ', fact);
    return fact;
  }
};

// 2. Compute the sum of an array of integers.
// sum([1,2,3,4,5,6]); // 21

// strat - call sum for sub arrays until reach end
// I - array of nums, also negative
// O - single number
// C - cannot mutate array
// E -   empty array returns 0;
      // array can have single int
var sum = function(array) {
  // edge case : empty array
  if (array.length === 0) {
    return 0;
  }

  // create copy of array to avoid mutating input array
  var workingArray = array.slice();
  var result = 0;

  // base case - arr has a single element
  if ( workingArray.length === 1) {
    result = workingArray[0];
    return result;
  }

  var sumOfTwo = workingArray[0] + workingArray[1];
  workingArray.splice(0, 2, sumOfTwo);
  result = sum(workingArray);
  return result;
};

// 3. Sum all numbers in an array containing nested arrays.
// arraySum([1,[2,3],[[4]],5]); // 15
// strat - i initially thought about flattening first then calling sum. But I guess this is not what the exercise expects
// I - array of nums, also negative
// O - single number
// C - cannot mutate input array; should be invoked with one argument
// E -   empty array returns 0; array can have single int

var arraySum = function(array) {
  // console.log('array:', array);
  // create copy of array
  var workingArray = array.slice();
  var result = 0;
  if ( workingArray.length === 0) {
    return 0;
  }
  // base case - input passed is a single element
  if (workingArray.length === 1 && !Array.isArray(workingArray[0])) {
    result = result + workingArray[0];
    return result;
  }
  // recursive case - call self
  workingArray.forEach(function(item){
    if(!Array.isArray(item)) {
      result = result + item;
    } else {
      result = result + arraySum(item);
    }
  });
  return result;
};

// strat -
// I - integer, can be negative
// O - boolean
// C -
  // should use recursion by calling self;
  // cannot use modulo
  // should be invoked with one argument
// E - is zero ? yeap, line 236 in tests

// 4. Check if a number is even.
var isEven = function(n) {

  if (n === 0) {
    return true;
  } else if( n === 1) {
    return false;
  }  else if (n > 0) {
    return isEven (n - 2);
  } else {
    return isEven (-n);
  }
};

// 5. Sum all integers below a given integer.
// sumBelow(10); // 45
// sumBelow(7); // 21
// sumBelow(-6): // -15
var sumBelow = function(n) {
  if(n === 0) {
    return 0;
  }
  // base case
  if( n === 1 || n === -1) {
    return 0;
  }
  // recursive
  if ( n > 1 ) {
    return sumBelow(n-1) + (n-1);
  } else if (n < -1) {
    return sumBelow(n+1) + (n+1);
  }

};


// strat - similar to sumBelow, figure out how to find a recursion in the process of creating the result array

// I - two integers, x and y. Can be negative. Can be in 'reverse' order
  // for example, range(7, 2) //-> [6, 5, 4, 3]

// O - an array with integers between x and y
// C:
  // should use recursion by calling self;
  // should be invoked with two arguments
// E - if no integers in range, return empty array:
       // range(5, 5) // -> []
       // range(2, 3) // -> []
       // range(-2,-2)// -> []

// 6. Get the integers within a range (x, y).
// range(2,9); // [3,4,5,6,7,8]
  var range = function(x, y) {

    var dif = Math.abs(x - y);
    var min = Math.min(x, y);
    var max = Math.max(x, y);
    var item = (min + max)/ 2;
    var result = [];
    // console.log('min: ', min, 'max: ', max);
    // no integers in range
    if (dif < 2) {
      return [];
    }
    // base case - only one integer in range
    if (dif === 2) {
      result.push(item);
      return result;
    }

    var i = 0;
    var j = 2
    while (min + j <= max ) {
      // console.log('range of ', min+i, min+j);
      result = result.concat(range(min + i, min + j));
      i++;
      j++;
    }

    if(x === max) {
      return result.reverse();
    }
    return result;
  };


// strat - exponentiation is a series of multiplications - so the recursion is repeat as many times as the exponent determines -> loop starting at zero (base case: num to the power of zero = 1, a multiplication identity)

// I - (I think) two integers, base and exponent. Exponent can be negative, but I don't see any tests for base < 0
  // (3,4) // -> 81
  // (4, -2) //-> 0.0625 (1/(4**2))
// O - a number (float)
// C:
  // should use recursion by calling self;
  // should be invoked with two arguments
  // cannot use Math
// E -

// 7. Compute the exponent of a number.
// The exponent of a number says how many times the base number is used as a factor.
// 8^2 = 8 x 8 = 64. Here, 8 is the base and 2 is the exponent.
// exponent(4,3); // 64
// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/computing-powers-of-a-number
var exponent = function(base, exp) {
  var result = 1;
  var neg = exp < 0;
  if(neg){
    exp = -exp;
  }
  // base case
  if ( exp === 0) {
    return result * 1;
  }

  if( exp === 1) {
    return result * base;
  }

  for (var i = 0; i < exp ; i++){
    // console.log('loop i = ', i);
    result = result * exponent(base, 1);
  }

  if (neg === true) {
    return 1/ parseFloat(result);
  } else {return result; }

};


// strat -  try 2^ 0... n until reach num (true). If go above, then false Nope, this would not go TOWARDS the base case. - Then, divide by 2 until we reach either 1 (base case, true) or a non-integer - (false)

// I - a posiitive integer (as seen in tests)
  // powerOfTwo(5) // -> false
  // powerOfTwo(1) // -> true
  // powerOfTwo(128) // -> true
// O - a boolean
// C:
  // should use recursion by calling self;
  // should be invoked with one argument
  // cannot use Math

// E - n === 0 > return false
   //  n ==== 1 > return true

// 8. Determine if a number is a power of two.
// powerOfTwo(1); // true
// powerOfTwo(16); // true
// powerOfTwo(10); // false
var powerOfTwo = function(n) {
  if(n === 0 ) {
    return false;
  }

  if (n === 1){
    return true;
  }
  console.log('n/2', n/2);
  if (!Number.isInteger(n / 2)) {
    return false;
  } else {
    return powerOfTwo(n / 2);
  }
};
// strat -  concatenate a new (result) string until reach end of original string >> did not work, because result was always cleaned.
// in the recursive call, return recursion of increasingly smaller string (slice(1)) + the first char. As it approaches the base case, it will be the last char (base case length of 1), and all +charAt(0)s will be returned exactly in reverse order
// I - a string
// O - a string in reverse order
// C - cannot use native reverse method; use recursion (calling self) and invoke with one argument
// E - if string is empty?

// 9. Write a function that reverses a string.

var reverse = function(string) {
  if ( string.length <= 1 ) {
    return string;
  }
  return reverse(string.slice(1)) + string.charAt(0);
};

// 10. Write a function that determines if a string is a palindrome.
var palindrome = function(string) {
  var str = string.split(' ').join('').toLowerCase();
  if ( str.length <= 1) {
    return true;
  }
  if ( str[0] !== str[str.length - 1] ) {
    return false;
  }
  return palindrome(str.slice(1, -1));

};

// 11. Write a function that returns the remainder of x divided by y without using the
// modulo (%) operator.
// modulo(5,2) // 1
// modulo(17,5) // 2
// modulo(22,6) // 4
var modulo = function(x, y) {
};

// 12. Write a function that multiplies two numbers without using the * operator or
// Math methods.
var multiply = function(x, y) {
};

// 13. Write a function that divides two numbers without using the / operator or
// Math methods to arrive at an approximate quotient (ignore decimal endings).
var divide = function(x, y) {
};

// 14. Find the greatest common divisor (gcd) of two positive numbers. The GCD of two
// integers is the greatest integer that divides both x and y with no remainder.
// gcd(4,36); // 4
// http://www.cse.wustl.edu/~kjg/cse131/Notes/Recursion/recursion.html
// https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
var gcd = function(x, y) {
};

// 15. Write a function that compares each character of two strings and returns true if
// both are identical.
// compareStr('house', 'houses') // false
// compareStr('tomato', 'tomato') // true
var compareStr = function(str1, str2) {
};

// 16. Write a function that accepts a string and creates an array where each letter
// occupies an index of the array.
var createArray = function(str) {
};

// 17. Reverse the order of an array
var reverseArr = function(array) {
};

// 18. Create a new array with a given value and length.
// buildList(0,5) // [0,0,0,0,0]
// buildList(7,3) // [7,7,7]
var buildList = function(value, length) {
};

// 19. Implement FizzBuzz. Given integer n, return an array of the string representations of 1 to n.
// For multiples of three, output 'Fizz' instead of the number.
// For multiples of five, output 'Buzz' instead of the number.
// For numbers which are multiples of both three and five, output “FizzBuzz” instead of the number.
// fizzBuzz(5) // ['1','2','Fizz','4','Buzz']
var fizzBuzz = function(n) {
};

// 20. Count the occurrence of a value in a list.
// countOccurrence([2,7,4,4,1,4], 4) // 3
// countOccurrence([2,'banana',4,4,1,'banana'], 'banana') // 2
var countOccurrence = function(array, value) {
};

// 21. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
var rMap = function(array, callback) {
};

// 22. Write a function that counts the number of times a key occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countKeysInObj(obj, 'r') // 1
// countKeysInObj(obj, 'e') // 2
var countKeysInObj = function(obj, key) {
};

// 23. Write a function that counts the number of times a value occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countValuesInObj(obj, 'r') // 2
// countValuesInObj(obj, 'e') // 1
var countValuesInObj = function(obj, value) {
  var count = 0;

  for (var key in obj) {

    if ( obj[key] === value ) {
      count++;
    }
    if(typeof obj[key] === 'object') {
      count += countValuesInObj(obj[key], value);
    }
  }
   return count;
};

// 24. Find all keys in an object (and nested objects) by a provided name and rename
// them to a provided new name while preserving the value stored at that key.
var replaceKeysInObj = function(obj, oldKey, newKey) {
  for (var key in obj) {
    if ( key === oldKey ) {
      obj[newKey] = obj[key];
      delete obj[key];
    }
    if(typeof obj[key] === 'object') {
      obj[key] = replaceKeysInObj(obj[key], oldKey, newKey);
    }
  }
   return obj;
};


// 25. Get the first n Fibonacci numbers. In the Fibonacci sequence, each subsequent
// number is the sum of the previous two.
// Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.....
// fibonacci(5); // [0,1,1,2,3,5]
// Note: The 0 is not counted.
var fibonacci = function(n) {
};

// 26. Return the Fibonacci number located at index n of the Fibonacci sequence.
// [0,1,1,2,3,5,8,13,21]
// nthFibo(5); // 5
// nthFibo(7); // 13
// nthFibo(3); // 2
var nthFibo = function(n) {
};

// 27. Given an array of words, return a new array containing each word capitalized.
// var words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
var capitalizeWords = function(array) {
};

// 28. Given an array of strings, capitalize the first letter of each index.
// capitalizeFirst(['car','poop','banana']); // ['Car','Poop','Banana']
var capitalizeFirst = function(array) {
};

// 29. Return the sum of all even numbers in an object containing nested objects.
// var obj1 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };
// nestedEvenSum(obj1); // 10
var nestedEvenSum = function(obj) {
};

// 30. Flatten an array containing nested arrays.
// flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]
var flatten = function(array) {
};

// 31. Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {p:1, o:2, t:2, a:1}
var letterTally = function(str, obj) {
};

// 32. Eliminate consecutive duplicates in a list. If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// compress([1,2,2,3,4,4,5,5,5]) // [1,2,3,4,5]
// compress([1,2,2,3,4,4,2,5,5,5,4,4]) // [1,2,3,4,2,5,4]
var compress = function(list) {
};

// 33. Augment every element in a list with a new value where each element is an array
// itself.
// augmentElements([[],[3],[7]], 5); // [[5],[3,5],[7,5]]
var augmentElements = function(array, aug) {
};

// 34. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
var minimizeZeroes = function(array) {
};

// 35. Alternate the numbers in an array between positive and negative regardless of
// their original sign. The first number in the index always needs to be positive.
// alternateSign([2,7,8,3,1,4]) // [2,-7,8,-3,1,-4]
// alternateSign([-2,-7,8,3,-1,4]) // [2,-7,8,-3,1,-4]
var alternateSign = function(array) {
};

// 36. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"
var numToText = function(str) {
};


// *** EXTRA CREDIT ***

// 37. Return the number of times a tag occurs in the DOM.
var tagCount = function(tag, node) {
};

// 38. Write a function for binary search.
// var array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// binarySearch(array, 5) // 5
// https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
var binarySearch = function(array, target, min, max) {
};

// 39. Write a merge sort function.
// mergeSort([34,7,23,32,5,62]) // [5,7,23,32,34,62]
// https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms
var mergeSort = function(array) {
};

// 40. Deeply clone objects and arrays.
// var obj1 = {a:1,b:{bb:{bbb:2}},c:3};
// var obj2 = clone(obj1);
// console.log(obj2); // {a:1,b:{bb:{bbb:2}},c:3}
// obj1 === obj2 // false
var clone = function(input) {
};
