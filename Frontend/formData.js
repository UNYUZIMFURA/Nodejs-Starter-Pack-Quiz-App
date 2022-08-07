function getCurrentData(event) {
    event.preventDefault()
    const nameTag = document.getElementById('name')
    const emailTag = document.getElementById('email')
    const passwordTag = document.getElementById('password')



    let name = nameTag.value
    let email = emailTag.value
    let password = passwordTag.value

    let formData = {
        name,
        email,
        password
    }

    console.log(formData)

    // Asynchronous way to fetch data

    async function fetchData() {
        let errorDiv = document.getElementById('errorDiv')
        await fetch('http://localhost:8080/data', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        })

        const dataFetched = fetch('http://localhost:8080/data', {
            method: 'POST'
        })
        .then(res => res.json())
        .then(data => console.log(data))

        console.log(dataFetched)
    errorDiv.textContent = dataFetched.message
    }

    // Call the fetch Data function after collecting form data

    fetchData()
}

function fetchLoginData(event) {
    event.preventDefault()

    const loginEmail = document.getElementById('loginEmail')

    const loginPassword = document.getElementById('loginPassword')

    let email = loginEmail.value
    let password = loginPassword.value

    let LoginData = {
        email,
        password
    }

    async function fetchData() {
        await fetch('http://localhost:8080/loginUser', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(LoginData),
        })
    }

    fetchData()
}

async function fetchLogin() {
    let errorDiv = document.getElementById('errorDiv')
    const data = await (await fetch('http://localhost:8080/loginUser', {
        method: 'POST'
    })).json()
    console.log(data)
    errorDiv.innerHTML = "wtf"
}
