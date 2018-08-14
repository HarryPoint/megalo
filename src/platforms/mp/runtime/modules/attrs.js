/* @flow */

import {
  extend,
  isDef,
  isUndef
} from 'shared/util'

const ignoreKeys = ['_hid', '_fk']

function updateAttrs (oldVnode: VNodeWithData, vnode: VNodeWithData) {
  const opts = vnode.componentOptions
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  let key, cur, old
  const oldAttrs = oldVnode.data.attrs || {}
  let attrs: any = vnode.data.attrs || {}
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs)
  }

  const { context } = vnode

  for (key in attrs) {
    if (ignoreKeys.indexOf(key) > -1) {
      continue
    }
    cur = attrs[key]
    old = oldAttrs[key]
    if (old !== cur) {
      context.$updateMPData(key, cur, vnode)
    }
  }
}

export default {
  create: updateAttrs,
  update: updateAttrs
}
