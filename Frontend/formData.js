function getCurrentData(event) {
    event.preventDefault()
    const nameTag = document.getElementById('name')
    const emailTag = document.getElementById('email')
    const passwordTag = document.getElementById('password')
    let errorDiv = document.getElementById('errorDiv')

    let name = nameTag.value
    let email = emailTag.value
    let password = passwordTag.value


    let formData = {
        name,
        email,
        password
    }

    async function fetchData() {
        const resData = await (await (fetch('http://localhost:8080/data', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        }))).json()
        let resInfo = resData.message
        if (resInfo == "Token Sent") {
            location.replace('http://localhost:8080/quiz')
        } else {
            errorDiv.textContent = resData.message
        }
    }

    fetchData()
}



function fetchLoginData(event) {
    event.preventDefault()

    const loginEmail = document.getElementById('loginEmail')

    const loginPassword = document.getElementById('loginPassword')

    let errorDiv = document.getElementById('errorDiv')

    let email = loginEmail.value
    let password = loginPassword.value

    let LoginData = {
        email,
        password
    }

    async function fetchData() {
        const resData = await (await (fetch('http://localhost:8080/loginUser', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(LoginData)
        }))).json()
        let resInfo = resData.message
        if (resInfo == 'Token Sent') {
            location.replace('http://localhost:8080/quiz')
        }
        else {
            errorDiv.textContent = resData.message
        }
    }

    fetchData()
}