const baseUrl = 'https://ppshort.herokuapp.com'

// TODO implement url validation
const isValidURL = (url) => /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
  url
)

const mapErrorKeysToDisplay = (key) => {
  switch (key) {
  case 'VALIDATION_ERROR':
    return 'A URL é inválida'

  case 'INVALID_SHORT_URL':
    return 'O link encurtado fornecido é inválido ou não existe'

  default:
    console.log('Unknown error key:', key)
    return 'Um erro desconhecido ocorreu'
  }
}

const showInputErrors = (errors = [], time = 2000) => {
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
    showInputErrors(['A URL é inválida'])
  } else {
    const { short } = await createShortURL(url)
    const completeUrl = `${baseUrl}/${short}`
    // Showing Short-URL
    const copyUrlContainer = document.getElementById('copy-url-input')
    copyUrlContainer.value = completeUrl
  }
}

const handleStatsClick = async () => {
  const input = document.getElementById('stats-url-input')
  const urlOrCode = input.value
  const code = urlOrCode.split(baseUrl + '/').pop()

  const data = await getShortURLInfo(`${baseUrl}/${code}`)
  console.log(data)
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
    const displayMsg = mapErrorKeysToDisplay(data.key)
    showInputErrors([displayMsg])
    return
  }

  return data
}

const getShortURLInfo = async (url) => {
  const errorElem = document.getElementById('stats-errors')
  const shortCode = url.split(baseUrl + '/').pop()
  const response = await fetch(`${baseUrl}/url/info?short=${shortCode}`)
  const { data } = await response.json()
  const info = data[0]

  if (!response.ok) {
    const displayMsg = mapErrorKeysToDisplay(data.key)
    errorElem.innerHTML = `<p>${displayMsg}*</p>`
    return
  }

  if (!info) {
    errorElem.innerHTML = '<p>O link ou código não foi encontrado*</p>'
    return
  }

  return {
    clicks: info.clicks,
    creationDate: new Date(info.createdAt),
  }
}

document.getElementById('url-input-button').onclick = handleSubmitClick
document.getElementById('stats-button').onclick = handleStatsClick
document.getElementById('copy-button').onclick = handleCopyClick
