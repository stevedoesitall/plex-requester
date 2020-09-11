// const types = ['year', 'title', 'email', 'your-name']

const addWarning = (types) => {
  let allTypes
  if (types) {
    allTypes = types
  } else {
    allTypes = ['year', 'title', 'email', 'name']
  }
  allTypes.forEach(type => {
    document.querySelector('#' + type + '-input').closest('input').classList.add('is-danger')
  })
}

const removeWarning = (types) => {
  let allTypes
  if (types) {
    allTypes = types
  } else {
    allTypes = ['year', 'title', 'email', 'name']
  }
  allTypes.forEach(type => {
    document.querySelector('#' + type + '-input').closest('input').classList.remove('is-danger')
  })
}

export { addWarning, removeWarning }