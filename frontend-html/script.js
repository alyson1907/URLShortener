// TODO implement url validation
const isValidURL = (url) => false

const showErrors = (errors = [], time = 1500) => {
  const errorElem = document.getElementById('text-error')

  errorElem.innerText = 'A URL é inválida'
  errorElem.classList.add('show')
  setTimeout(() => errorElem.classList.remove('show'), 1500)
}

const handleSubmit = async () => {
  const url = document.getElementById('url-text-input').value
  const isValid = isValidURL(url)

  if (!isValid) {
    showErrors(['A URL é inválida'])
  } else {
    await createShortURL(url)
  }
}

const createShortURL = async (url) => {
  const response = await fetch('https://ppshort.herokuapp.com/shorten', {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({ url }),
    mode: 'cors',
  })
  const data = await response.json()

  if (!response.ok) {
    // TODO implement complete ErrorHandler
    console.log(data)
    // alert('Error while creating URL')
    return
  }

  return data
}

document.getElementById('url-input-button').onclick = handleSubmit
