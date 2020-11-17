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
    const repos = await _getUserRepositories(userLogin, 1)

    // We should have user's repos
    userData.repos = repos

    // Sending reponse
    res.json({ res: true, userData: userData })
}

// Getting user repos
export const _getUserRepositories = async (userLogin, page) => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    })

    // Getting repos for given page and user
    const { data: data } = await octokit.request(`GET /users/${userLogin}/repos`, {
        username: userLogin,
        per_page: 20,
        page: page,
    })

    return data
}
