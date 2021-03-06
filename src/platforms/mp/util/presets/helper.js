export function createFindEventTypeFn (eventTypeMap) {
  return function findEventType (type) {
    let res = ''
    Object.keys(eventTypeMap)
      .some(mpType => {
        if (eventTypeMap[ mpType ].indexOf(type) > -1) {
          res = mpType
          return true
        }
      })
    return res
  }
}

export function mergePreset (presetA, presetB) {
  const res = Object.assign({}, presetA, presetB)
  const aVisitors = presetA.visitors || {}
  const bVisitors = presetB.visitors || {}
  const mergeVisitors = Object.assign({}, aVisitors, bVisitors)
  Object.assign(res, {
    visitors: mergeVisitors
  })

  return res
}

export function alterAttrName (el, oldName, newName) {
  const { attrsMap = {}, attrsList = [], attrs = [] } = el
  let index = -1

  attrs.some((attr, i) => {
    if (attr.name === oldName) {
      index = i
      return true
    }
  })

  if (index > -1) {
    const rawOldName = attrsList[index].name
    const rawNewName = rawOldName.replace(oldName, newName)
    attrs[index].name = newName
    attrsList[index].name = rawNewName

    const mapValue = attrsMap[rawOldName]
    delete attrsMap[rawOldName]
    attrsMap[rawNewName] = mapValue
  }
}
