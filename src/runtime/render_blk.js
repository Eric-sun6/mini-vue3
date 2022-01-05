
import { ShapeFlag, Fragment } from './vnode';
export function render (vnode, container) {
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
  const { type, props, children } = vnode;
  const elementNode = document.createElement(type);
  mountProps(props, elementNode);
  mountChildren(vnode, elementNode)
  container.appendChild(elementNode)
  vnode.el = elementNode
}
function mountText (vnode, container) {
  const textNode = document.createTextNode(vnode.children)
  container.appendChild(textNode)
  vnode.el = textNode;
}
function mountFragment (vnode, container) {
  //因为 Fragment自己是不渲染的，所以可以直接把子组件们渲染出来就行了
  mountChildren(vnode, container)

}
function mountComponent (vnode, container) {

}
function mountChildren (vnode, container) {
  const { shapeFlag, children } = vnode;
  if (shapeFlag & shapeFlag == ShapeFlag.TEXT_CHILDREN) {
    mountText(vnode, container)
  }
  if (shapeFlag & shapeFlag === ShapeFlag.ARRAY_CHILDREN) {
    children.forEach((child) => {
      mount(child, container)
    })
  }
}
const domPropsRegex = /[A-Z] | ^(value | disabled | chcecked | selected)$/;
function mountProps (props, el) {
  for (let propKey in props) {
    const value = props[propKey];
    switch (propKey) {
      case 'class':
        el.className = value;
        break;
      case 'style':
        for (let key in value) {
          el.style[key] = value[key]
        }
        break;
      default:
        if (/^on[^a-z]/.test(propKey)) {
          const eventName = propKey.slice(2).toLocaleLowerCase();
          el.addEventListener(eventName, value)
        } else if (domPropsRegex.test(propKey)) {
          if (value === null & isBoolean(el[propKey])) {
            value = true
          }
          el[propKey] = value
        } else {
          if (value === '' | value === false) {
            el.removeAttribute(propKey)
          } else {
            el.setAttribute(propKey, value)
          }
        }
    }
  }
}