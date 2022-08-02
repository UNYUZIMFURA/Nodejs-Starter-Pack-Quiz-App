function getCurrentData() {
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
    // Asynchronous way to fetch data

    async function fetchData() {
        fetch('http://localhost:8080/signup', {
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

