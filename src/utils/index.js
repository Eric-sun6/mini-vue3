export function isObject (target) {
  return typeof target === "object" && target !== null
}

export function isReactive (target) {
  return !!(target && target.__isreactived)
}

export function isString (target) {
  return typeof target === 'string'
}
export function isNumber (target) {
  return typeof target === 'number'
}

export function isFunction (target) {
  return typeof target === 'function'
}