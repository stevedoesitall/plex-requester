const addWarning = (type) => {
    if (type === 'title') {
      document.querySelector('#title-input').closest('input').classList.add('is-danger')
    } else if (type === 'year') {
      document.querySelector('#year-input').closest('input').classList.add('is-danger')
    } else if (type === 'name') {
      document.querySelector('#your-name-input').closest('input').classList.add('is-danger')
    } else if (type === 'email') {
      document.querySelector('#email-input').closest('input').classList.add('is-danger')
    } else {
      document.querySelector('#title-input').closest('input').classList.add('is-danger')
      document.querySelector('#year-input').closest('input').classList.add('is-danger')
    }
}

const removeWarning = (type) => {
    if (type === 'title') {
      document.querySelector('#title-input').closest('input').classList.remove('is-danger')
    } else if (type === 'year') {
      document.querySelector('#year-input').closest('input').classList.remove('is-danger')
    } else if (type === 'name') {
      document.querySelector('#your-name-input').closest('input').classList.remove('is-danger')
    } else if (type === 'email') {
      document.querySelector('#email-input').closest('input').classList.remove('is-danger')
    } else {
      document.querySelector('#title-input').closest('input').classList.remove('is-danger')
      document.querySelector('#year-input').closest('input').classList.remove('is-danger')
    }
}

export { addWarning, removeWarning }