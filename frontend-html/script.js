const baseUrl = 'https://ppshort.herokuapp.com'

// TODO implement url validation
const isValidURL = (url) => false

const showErrors = (errors = [], time = 1500) => {
  const errorElem = document.getElementById('errors')
  errors.forEach((err) => (errorElem.innerHTML += `<p>${err}*<p>`))
  errorElem.classList.add('show')
  setTimeout(() => {
    errorElem.classList.remove('show')
    errorElem.innerHTML = ''
  }, time)
}

const copyToClipboard = (inputElem) => {
  inputElem.select()
  inputElem.setSelectionRange(0, 99999) // For mobile devices
  document.execCommand('copy')
}

const handleSubmitClick = async () => {
  const url = document.getElementById('url-text-input').value
  const isValid = isValidURL(url)

  if (!isValid) {
    showErrors(['A URL é inválida'])
  } else {
    const { short } = await createShortURL(url)
    const completeUrl = `${baseUrl}/${short}`
    // Showing Short-URL
    const copyUrlContainer = document.getElementById('copy-url-input')
    copyUrlContainer.value = completeUrl
  }
}

const handleCopyClick = () => {
  const elem = document.getElementById('copy-url-input')
  copyToClipboard(elem)
}

const createShortURL = async (url) => {
  const response = await fetch(baseUrl + '/shorten', {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({ url }),
    mode: 'cors',
  })
  const data = await response.json()

  if (!response.ok) {
    // TODO implement complete ErrorHandler
    // alert('Error while creating URL')
    return
  }
  console.log(data)
  return data
}

document.getElementById('url-input-button').onclick = handleSubmitClick
document.getElementById('copy-button').onclick = handleCopyClick
