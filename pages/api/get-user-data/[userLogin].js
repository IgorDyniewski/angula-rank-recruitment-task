const { Octokit } = require('@octokit/rest')

export default async function handler(req, res) {
    // Getting user login
    const {
        query: { userLogin },
    } = req

    if (!userLogin) return res.json({ res: false, err: 'MISSING_DATA' }) // Checking if user login is defined

    // Init github api
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    })

    // Getting user data
    let isUserValid = true
    let user = await octokit
        .request(`GET /users/${userLogin}`, {
            username: userLogin,
        })
        .catch((err) => {
            console.log(err)
            res.json({ res: false, err: 'WRONG_USER' })
            isUserValid = false
            return
        })
    if (!isUserValid) return

    // We should have user data
    let userData = { profileData: user.data }

    // Getting user's public repos
    const repos = await _getAllUserRepositories(userLogin)

    // We should have user's repos
    userData.repos = repos

    // Sending reponse
    res.json({ res: true, userData: userData })
}

// Getting user repos
const _getAllUserRepositories = async (userLogin) => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    })
    let repos = []
    let page = 0
    let lastPageCount = 100

    while (lastPageCount === 100) {
        const { data: data } = await octokit.request(`GET /users/${userLogin}/repos`, {
            username: userLogin,
            per_page: 100,
            page: page,
        })
        lastPageCount = data.length
        page++
        repos = repos.concat(data)
    }

    console.log(repos.length)

    return repos
}
