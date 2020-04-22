function isObject (value) {
  return value && typeof value === 'object'
}

function isEmpty (value) {
  return typeof value === 'undefined' || value === ''
}

function getValue (value, modifiers = {}) {
  // filter and serialize arrays
  if (Array.isArray(value)) {
    value = value.filter(value => !isEmpty(value)).join(' ')
  }

  // objects
  if (isObject(value)) {
    // convert dates to iso
    if ('toISOString' in value) {
      value = value.toISOString()
    }

    // objects
    else {
      value = JSON.stringify(value).replace(/[{}"]/g, '').replace(/,/g, ' ')
    }
  }

  // convert booleans
  if (modifiers.bools === false && (value === true || value === false)) {
    value = value === true ? 1 : 0
  }

  return value
}

function bind (el, data, modifiers) {
  Object.keys(data).forEach(key => {
    // value
    const value = getValue(data[key], modifiers)

    // skip undefined
    if (modifiers.empty === false && isEmpty(value)) {
      return
    }

    // set value
    el.setAttribute(`data-${key}`, value)
  })
}

function unbind (el, data) {
  Object.keys(data).forEach(key => {
    el.removeAttribute(`data-${key}`)
  })
}

const options = {
  name: 'data',
  empty: false,
  bools: false,
}

export default function (Vue, config = {}) {
  Object.assign(options, config)
  Vue.directive(options.name, function (el, { value, oldValue, modifiers }) {
    if (oldValue) {
      unbind(el, oldValue)
    }
    bind(el, value, Object.assign(options, modifiers))
  })
}
