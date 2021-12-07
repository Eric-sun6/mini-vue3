import { ShapeFlag } from './vnode'
export function render (vnode, container) {
  import { ShapeFlag } from './vnode';
  mount(vnode, container)
}

export function mount (vnode, container) {
  const { shapeFlag } = vnode;
  if (shapeFlag === ShapeFlag.ELEMENT) {
    mountElement(vnode, container)
  } else if (shapeFlag === ShapeFlag.TEXT) {
    mountText(vnode, container)
  } else if (shapeFlag === ShapeFlag.FRAGMENT) {
    mountFragment(vnode, container)
  } else {
    mountComponent(vnode, container)
  }
}

function mountElement (vnode, container) {

}
function mountText (vnode, container) {

}
function mountFragment (vnode, container) {

}
function mountComponent (vnode, container) {

}