import { isObject, isReactive } from '../utils/index';
import { track, trigger } from './effect'
export function reactive (target) {

  if (!isObject(target)) {
    return target
  }
  if (isReactive(target)) {
    return target
  }
  if (proxyMap.has(target)) {
    return proxyMap.get(target)
  }
  const proxyMap = new WeakMap()
  const proxy = new Proxy(target, {
    get (target, key, receiver) {
      if (key === '__isreactived') {
        return true
      }
      track(target, key)
      const res = Reflect.get(target, key, receiver)
      return res
    }, set (target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return res
    }
  })
  proxyMap.set(target, proxy)
  return proxy
}
// 收集依赖，收集的就是effect里面的函数，是响应式数据去收集以来，为什么用发布订阅的模式？是因为这个函数可能不止被执行一次，依赖不能被重复收集
// object-- > key-- > dep

// 特例处理
// 1: reactive(reactive(target)) 处理被多次代理的数据
// 2: let a = reactive(obj);  let b = reactive(obj)