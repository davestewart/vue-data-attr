function bind (el, data, modifiers) {
  Object.keys(data).forEach(key => {
    // value
    let value = data[key]

    // convert booleans
    if (modifiers.bools === false && (value === true || value === false)) {
      value = value === true ? 1 : 0
    }

    // skip undefined
    if (modifiers.empty === false && (typeof value === 'undefined' || value === '')) {
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
