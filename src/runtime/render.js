
import { ShapeFlag, Fragment } from './vnode';
export function render (vnode, container) {
  const preVnode = container._vnode;
  if (!vnode) {
    if (preVnode) {
      unmount(preVnode)
    }
  } else {
    patch(preVnode, vnode, container)
  }
  container._vnode = vnode;
}

function unmount (vnode) {
  const { shapeFlag, el } = vnode;
  if (shapeFlag & ShapeFlag.COMPONENT) {
    unmountComponent(vnode)
  } else if (shapeFlag & ShapeFlag.FRAGMENT) {
    unmountFragment(vnode)
  } else {
    el.parentNode.removeChild(el)
  }
}
function patch (preVnode, vnode, container) {
  // 如果旧节点存在，并且旧节点和新节点的type不同
  if (preVnode && !isSameNode(preVnode, vnode)) {
    unmount(preVnode);
    preVnode = null
  }
  const { shapeFlag } = vnode;
  if (shapeFlag & ShapeFlag.COMPONENT) {
    processComponent(preVnode, vnode, container);
  } else if (shapeFlag & ShapeFlag.FRAGMENT) {
    processFragment(preVnode, vnode, container)
  } else if (shapeFlag & ShapeFlag.TEXT) {
    // 是text类型
    processText(preVnode, vnode, container)
  } else {
    processElement(preVnode, vnode, container)
  }
}
function isSameNode (preVnode, vnode) {
  return preVnode.type === vnode.type
}
function processComponent (preVnode, vnode, container) {

}
function processFragment (preVnode, vnode, container) {

}
function processText (preVnode, vnode, container) {
  //旧节点存在的话，就更新旧节点的子元素
  if (preVnode) {
    vnode.el = preVnode.el;
    preVnode.el.textContent = vnode.children
  } else {
    //旧节点不存在的话，就挂载
    mountText(vnode, container)
  }
}

function mountText (vnode, container) {
  const textNode = document.createTextNode(vnode.children)
  container.appendChild(textNode)
  vnode.el = textNode;
}
function processElement (preVnode, vnode, container) {
  // 还是先判断旧节点存在与否
  if (preVnode) {
    patchElement(preVnode, vnode)
  } else {
    mountElement(vnode, container)
  }
}
function mountElement (vnode, container) {
  const { type, props, children, shapeFlag } = vnode;
  const elementNode = document.createElement(type);
  // mountProps(props, elementNode);
  patchProps(null, props, container)
  // mountChildren(vnode, elementNode)
  if (shapeFlag & shapeFlag == ShapeFlag.TEXT_CHILDREN) {
    mountText(vnode, container)
  } else if (shapeFlag & shapeFlag === ShapeFlag.ARRAY_CHILDREN) {
    mountChildren(vnode, container)
  }

  container.appendChild(elementNode)
  vnode.el = elementNode
}
// function mountProps (props, el) {
//   for (let propKey in props) {
//     const value = props[propKey];
//     switch (propKey) {
//       case 'class':
//         el.className = value;
//         break;
//       case 'style':
//         for (let key in value) {
//           el.style[key] = value[key]
//         }
//         break;
//       default:
//         if (/^on[^a-z]/.test(propKey)) {
//           const eventName = propKey.slice(2).toLocaleLowerCase();
//           el.addEventListener(eventName, value)
//         } else if (domPropsRegex.test(propKey)) {
//           if (value === null & isBoolean(el[propKey])) {
//             value = true
//           }
//           el[propKey] = value
//         } else {
//           if (value === '' | value === false) {
//             el.removeAttribute(propKey)
//           } else {
//             el.setAttribute(propKey, value)
//           }
//         }
//     }
//   }
// }


function mountChildren (vnode, container) {
  children.forEach((child) => {
    patch(null, child, container)
  })
}
function patchElement (preVnode, vnode) {
  vnode.el = preVnode.el;
  patchProps(preVnode.props, vnode.props);
  patchChildren(preVnode, vnode, vnode.el)
}
//子节点有3种类型，text类型，array类型和null类型,一共9种类型
function patchChildren (preVnode, vnode, container) {
  const { shapeFlag: preShapeFlag, children: c1 } = preVnode;
  const { shapeFlag, children: c2 } = vnode;
  if (shapeFlag & ShapeFlag.TEXT_CHILDREN) {
    // if (preShapeFlag & ShapeFlag.TEXT_CHILDREN) {
    //   container.textContent = vnode.textContent;
    // } else if (preShapeFlag & ShapeFlag.ARRAY_CHILDREN) {
    //   unmountChildren(c1);
    //   container.textContent = vnode.textContent;
    // } else {
    //   container.textContent = vnode.textContent
    // }
    if (preShapeFlag & ShapeFlag.ARRAY_CHILDREN) {
      unmountChildren(c1);
    }
    if (vnode !== preVnode) {
      container.textContent = vnode.textContent;
    }
  } else if (shapeFlag & ShapeFlag.ARRAY_CHILDREN) {
    if (preShapeFlag & ShapeFlag.TEXT_CHILDREN) {
      container.textContent = '';
      mountChildren(c2, container)
    } else if (preShapeFlag & ShapeFlag.ARRAY_CHILDREN) {
      // patchArrayChildren()
    } else {
      mountChildren(c2, container)
    }
  } else {
    if (preShapeFlag & ShapeFlag.TEXT_CHILDREN) {
      container.textContent = ''
    } else if (preShapeFlag & ShapeFlag.ARRAY_CHILDREN) {
      unmountChildren(c1)
    }
  }
}
function patchProps (newProps, oldProps, el) {
  if (newProps === oldProps) return;
  //兼容处理，防止下边遍历的时候属性是undefined报错
  newProps = newProps || {};
  // 为什么要用这种老式的写法而不用新的es6的写法，是因为es6的默认赋值只对undefined起作用，如果是null是不起作用的
  oldProps = oldProps || {};
  for (const key in newProps) {
    let next = newProps[key];
    let prev = oldProps[key];
    if (next !== prev) {
      patchDomprop(prev, next, key, el)
    }
  }
  //还有一步就是要遍历老属性，如果在新属性中不存在的话，就删除
  for (const key in oldProps) {
    if (newProps[key] === null) {
      patchDomprop(prev, null, key, el)
    }
  }
}

function patchDomprop (prev, next, propKey, el) {
  switch (propKey) {
    case 'class':
      el.className = next || '';
      break;
    case 'style':
      for (let key in next) {
        el.style[key] = next[key]
      }
      if (prev) {
        for (const styleName in prev) {
          if (next[styleName] === null) {
            el.style.styleName = ''
          }
        }
      }
      break;
    default:
      if (/^on[^a-z]/.test(propKey)) {
        const eventName = propKey.slice(2).toLocaleLowerCase();
        //要判断，如果prev存在要移除事件，如果next存在就才添加事件
        if (prev) {
          el.removeEventListener(eventName, prev)
        }
        if (next) {

          el.addEventListener(eventName, next)
        }
      } else if (domPropsRegex.test(propKey)) {
        if (next === null & isBoolean(el[propKey])) {
          next = true
        }
        el[propKey] = next
      } else {
        if (next === '' | next === false) {
          el.removeAttribute(propKey)
        } else {
          el.setAttribute(propKey, next)
        }
      }
  }
}