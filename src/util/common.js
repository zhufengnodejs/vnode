const keys = Object.keys

function each(obj, fn) {
  return keys(obj).forEach((k) => {
    fn(obj[k], k)
  })
}