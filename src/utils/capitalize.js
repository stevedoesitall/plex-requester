const capitalize = (title) => {
    const splitTitle = title.split(" ")
    let titleFinal = ''
    splitTitle.forEach(word => {
      titleFinal += word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase() + " "
    })
    return titleFinal.trim()
  }

export default capitalize