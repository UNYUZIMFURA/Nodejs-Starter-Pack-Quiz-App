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
        await fetch('http://localhost:8080/data', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        })
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

