const inputValue = document.querySelector("#search")
const searchBtn = document.querySelector(".searchButton")
const nameContainer = document.querySelector(".main__profile-name")
const unContainer = document.querySelector(".main__profile-username")
const reposContainer = document.querySelector(".main__profile-repos")
const urlContainer = document.querySelector(".main__profile-url")
const avatarContainer = document.querySelector(".avatar")

const fetcher = async (user) => {
    const api_call = await fetch(`https://api.github.com/users/${user}`)
    const data = await api_call.json()
    return {data}
}

const showData = () => {
    fetcher(inputValue.value).then((res) => {
        console.log(res)
        avatarContainer.src = `${res.data.avatar_url}`
        nameContainer.innerHTML = `<span class="main__profile-value">Nome: ${res.data.name}</span>`
        unContainer.innerHTML = `<span class="main__profile-value">Login: ${res.data.login}</span>`
        reposContainer.innerHTML = `<span class="main__profile-value">Repositórios: ${res.data.public_repos}</span>`
        urlContainer.innerHTML = `<span class="main__profile-value">Url: ${res.data.html_url}</span>`
    })
}

document.addEventListener("keyup", (event) => {
    if (event.key == 'Enter')
        showData()
})
searchBtn.addEventListener("click", () => {
    showData()
})

//https://www.youtube.com/watch?v=sJspH620ZsU&t=1408s