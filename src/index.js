
import { reactive } from './reactive/reactive';
import { effect } from './reactive/effect';
const observed = (window.observed = reactive({ count: 0 }))
// const observed = (window.observed = reactive(reactive({ count: 0 }))) // 测试多次嵌套执行reactive方法

effect(() => {
  console.log('observed count is: ' + observed.count)
})