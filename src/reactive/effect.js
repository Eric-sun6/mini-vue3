//targetMap 用于存储副作用，并建立副作用和依赖的对应关系。
//一个副作用可能以来多个响应式对象，一个响应式对象里可能依赖多个属性。同一个属性又可能被多个副作用所依赖。因此targetMap的结构设计如下：
// {
//   //这是一个WeakMap
//   [target]: { //key 是reactiveObject, value是一个map
//     [key]: []// key是reactiveObject的键值，，value是一个Set，为什么是set是因为依赖不可以是重复的
//   }
// }
//使用WeakMap的原因就是当reactiveObject不再使用的时候，垃圾回收机制会自动回收，不必手动去WeakMap里删除
let activeEffect = null
export function effect (fn) {
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      return fn();
    } finally {
      activeEffect = undefined
    }
  }
  effectFn();
  return effectFn
}
let targetMap = new WeakMap();
export function track (target, key) {
  if (!activeEffect) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(activeEffect);
}
export function trigger (target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const dep = depsMap.get(key);
  if (!dep) {
    return;
  }
  dep.forEach((effectFn) => {

    effectFn();

  });
}