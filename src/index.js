
import { reactive } from './reactive/reactive';
import { effect } from './reactive/effect';
const observed = (window.observed = reactive({ count: 0 }))
// const observed = (window.observed = reactive(reactive({ count: 0 }))) // 测试多次嵌套执行reactive方法

effect(() => {
  console.log('observed count is: ' + observed.count)
})



// function type (value) {
//   return Object.prototype.toString.call(value).match(/\[object (.*?)\]/)[1];
// }
// function clone (value, refFrom = [], refTo = []) {
//   var copyFunc = function (copiedValue) {
//     var len = refFrom.length;
//     var idx = 0;

//     // console.log(copiedValue)
//     while (idx < len) {
//       if (value === refFrom[idx]) {
//         // console.log(idx)
//         // console.log(refTo[idx])
//         return refTo[idx];
//       }
//       idx += 1;
//     }
//     refFrom[idx + 1] = value;
//     refTo[idx + 1] = copiedValue;
//     console.log(refTo)
//     for (var key in value) {
//       if (typeof value[key] === 'object') {
//         copiedValue[key] = clone(value[key], refFrom, refTo);
//       } else {
//         copiedValue[key] = value[key];
//       }
//     }
//     return copiedValue;
//   }
//   switch (type(value)) {

//     case 'Object': return copyFunc(Object.create(Object.getPrototypeOf(value)));
//     case 'Array': return copyFunc([]);
//     case 'Date': return new Date(value.valueOf());
//     case 'RegExp': return _cloneRegExp(value);
//     default: return value;
//   }
// }
// var childObj = { name: '111' };
// var obj = {
//   'key1': childObj,
//   'key2': childObj,
// }

// clone(obj)



// function curry1 (fn) {
//   return function f1 () {
//     if (arguments.length == 0) {
//       return f1
//     } else {
//       return fn.apply(this, arguments)
//     }
//   }
// }

// function add (d) {
//   console.log(d++)
// }
// var _add = curry1(add)
// _add(1)(2)



// 1: 实现loadash 的get方法

// let newPath = []
// if(Array.isArray(path)) {
// newPath = path
// } else {
// newPath = path.replace(/\[/g, ‘ .’).replace(/\[/g, ‘.’).split(‘.’);
// }

// Return newPath.reduce( (0,k) => {
// return (o || {})[k]
// },object) || default
// }

// 2: 合并两个有序数组

// let merger = function (num1, m, num2, n){
// num1.splice(m, num1.length -m, …num2)
// num1.sort( (alb) => a-b)
// }

// 实现一个二分查找法，输入一个线性数据结构，如果找到就返回下标，没有找到就返回-1
// 二分查找法就是查找元素，找不到就缩小查找范围
// function search (nums, target) {
//   const length = nums.length;
//   let start = 0, end = length - 1, mid;
//   while (start < end) {
//     mid = Math.floor((end - start) / 2) + start;
//     let numMid = nums[mid];
//     if (numMid === target) {
//       return mid
//     } else if (numMid < target) {
//       start += 1
//     } else {
//       end -= 1
//     }
//   }
//   return -1
// }
//整数反转
// var reverse = function (x) {
//   let result = 0;
//   x = x + '';
//   for (var i = 0; i <= x.length; i++) {
//     const digit = x % 10;
//     x = ~~(x / 10)
//     console.log(digit)
//     console.log(x)
//     result += result * 10 + digit;
//     console.log(result)
//   }
//   return result
// };
// reverse(123)
// const convertInteger = (A, B) => {
//   let n = A ^ B;
//   let count = 0;
//   while (n) {
//     n = n & (n - 1);
//     console.log(n)
//     count++;
//   }
//   console.log(count)
//   return count;
// };
// convertInteger(2, 3)