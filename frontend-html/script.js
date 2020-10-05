// TODO implement url validation
const isValidURL = (url) => true

const handleSubmit = () => {
  const url = document.getElementById('url-text-input').value
  const isValid = isValidURL(url)

  if (!isValid) {
    const errorElem = document.getElementById('text-error')
    console.log('invalid!')
    errorElem.classList.remove('hidden')
    errorElem.classList.add('show')
  } else {
  }
}

document.getElementById('url-input-button').onclick = handleSubmit
