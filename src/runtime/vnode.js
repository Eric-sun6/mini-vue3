
import { isNumber, isString } from '../utils'
import { ShapeFlag } from './vnode';
export const ShapeFlag = {
  ELEMENT: 1,
  TEXT: 1 << 1,
  FRAGMENT: 1 << 2,
  COMPONENT: 1 << 3,
  TEXT_CHILDREN: 1 << 4,
  ARRAY_CHILDREN: 1 << 5,
  CHILDREN: (1 << 4) | (1 << 5)
}

export const Text = Symbol('Text')
export const Fragment = Symbol('Fragment')

/**
 *
 *
 * @export
 * @param {*} type {string | Object | Text | Fragment}
 * @param {*} props {Object | null}
 * @param {*} children {string | Array | null | number}
 */
export function h (type, props, children) {
  let shapeFlag = 0
  if (isString(type)) {
    shapeFlag = ShapeFlag.ELEMENT
  } else if (type === Text) {
    shapeFlag = ShapeFlag.TEXT
  } else if (type === Fragment) {
    shapeFlag = ShapeFlag.FRAGMENT
  } else {
    shapeFlag = ShapeFlag.COMPONENT
  }

  if (isString(children) | isNumber(children)) {
    shapeFlag |= ShapeFlag.TEXT_CHILDREN
    children = string(children)
  } else if (isArray(children)) {
    shapeFlag |= ShapeFlag.ARRAY_CHILDREN
  }
  return {
    type,
    props,
    children,
    shapeFlag
  }
}