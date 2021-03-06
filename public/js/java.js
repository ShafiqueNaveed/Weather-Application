const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const location = search.value
        if(!location){
            console.log('Enter a location')
        }else{
            messageOne.textContent = "Loading Message"
            messageTwo.textContent = ""
            
            fetch("/weather?address=" + location).then(
                (response) => {
                response.json().then((data) => {
                    if (data.error) {
                    return messageOne.textContent = data.error
                }
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                })
                }
            )
        }
        
    })
