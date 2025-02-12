const list = document.querySelector('#list')
const filter = document.querySelector('#filter')
let USERS = []

filter.addEventListener('input', (event) => {
    const value = event.target.value.toLowerCase() // получили input
    const filteredUsers = USERS.filter((user) => 
        user.name.toLowerCase().includes(value))
    render(filteredUsers)
})

async function start() {
    list.innerHTML = 'Loading...'
    try {
        const fet = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await fet.json()
        setTimeout(() => {
            USERS = data
            render(data)
        }, 2000);
    } catch (error) {
        error.message
    }
}   

function render(users = []) {
    if(users.length === 0) {
        list.innerHTML = 'No matched USERS'
    } else {
        const html = users.map(toHTML).join('')
        list.innerHTML = html
    }
}

function toHTML(obj) {
    return `
        <li class="list-group-item">${obj.name}</li>
    `
}

start()