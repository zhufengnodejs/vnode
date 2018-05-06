const keys = Object.keys

const each = (obj, fn) => {
  return keys(obj).forEach((k) => {
    fn(obj[k], k)
  })
}

const mixinToClass = (originClass, spec) => {
  each(spec, (value, key) => {
    originClass.prototype[key] = value
  })
}

const reduce = (obj, handler, initial = {}) => keys(obj).reduce((last, key, index) => handler(last, obj[key], key, index), initial)

const filter = (obj, handler) => reduce(obj, (last, value, key, index) => (handler(value, key, index) ? { ...last, [key]: value } : last))

const mapKey = (obj, keymap) => reduce(obj, (last, value, key) => ({ ...last, [keymap[key] ? keymap[key] : key]: value }))

const map = (obj, handler) => reduce(obj, (last, value, key, index) => ({ ...last, [key]: handler(value, key, index) }))

const map2Array = (obj, handler) => keys(obj).map((key, index) => handler(obj[key], key, index))

const values = obj => map2Array(obj, identity)

const pairs = arr => arr.reduce((last, [key, value]) => ({ ...last, [key]: value }), {})

const unpairs = obj => map2Array(obj, (value, key) => ([key, value]))

const zip = ([zipKeys, zipValues]) => zipKeys.reduce((last, key, index) => ({ ...last, [key]: zipValues[index] }), {})

const unzip = obj => [keys(obj), values(obj)]

const invert = obj => reduce(obj, (last, value, key) => ({ ...last, [value]: key }))

const omit = (obj, names) => filter(obj, (value, key) => !names.includes(key))

export {
  each,
  mixinToClass,
  omit,
  reduce,
}