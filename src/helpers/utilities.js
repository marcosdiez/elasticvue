/**
 * isEmpty(value)
 *
 * Returns true if given value is
 * * undefined
 * * null
 * * empty string
 * * empty array
 * * empty object
 *
 * @example
 *   isEmpty(1)  => false
 *   isEmpty({}) => true
 * @param value
 * @returns {boolean}
 */
export function isEmpty (value) {
  if (typeof value === 'object') {
    // array or object or null
    if (Array.isArray(value)) {
      return value.length === 0
    } else if (value === null) {
      return true
    } else {
      // object
      return Object.keys(value).length === 0
    }
  } else {
    return (typeof value === 'undefined') || (value === '')
  }
}

/**
 * Returns the unique keys every object of an array of objects
 * Example:
 *   var array = [{a: 1, b: {b1: 1, b2: 2}}, {b: {b2: 2, b3: 3}, c: 4}]
 *   objectArrayUniqueKeys (array)      => ['a', 'b', 'c']
 *   objectArrayUniqueKeys (array, 'b') => ['b1', 'b2', 'b3']
 * @param array
 * @param key - Optional
 * @returns {*[]}
 */
export function objectArrayUniqueKeys (array, key) {
  let nested = []
  if (key !== undefined) {
    nested = array.map(value => (Object.keys(value[key])))
  } else {
    nested = array.map(value => (Object.keys(value)))
  }
  let flattened = [].concat.apply([], nested)
  return [...new Set(flattened)]
}

/**
 * flattenObject(object)
 *
 * Returns a flattened object.
 * Warning: by default only flattens the first layer. Pass +true+ as a second parameter to flatten deep
 *
 * @example
 *   var object = {id: 1, data: {name: 'test'}}
 *   flattenObject(object) => {id: 1, name: 'test'}
 *
 *   var deepObject = {id: 1, data: {name: 'test', address: {zip: 123}}}
 *   flattenObject(object)       => {id: 1, name: 'test', address: {zip: 123}}
 *   flattenObject(object, true) => {id: 1, name: 'test', zip: 123}
 * @param object
 * @param deep {boolean} - set to true if you want to flatten deep
 * @returns {object} the flattened object
 */
export function flattenObject (object, deep) {
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      deep ? Object.assign(object, flattenObject(value)) : Object.assign(object, value)
      delete object[key]
    }
  })
  return object
}
