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
    let areReposRequestValid = true
    let repos = await octokit
        .request(`GET /users/${userLogin}/repos`, {
            username: userLogin,
        })
        .catch((err) => {
            console.log(err)
            res.json({ res: false, err: 'WRONG_USER' })
            areReposRequestValid = false
            return
        })
    if (!areReposRequestValid) return

    // We should have user's repos

    userData.repos = repos.data

    // Sending reponse
    res.json({ res: true, userData: userData })
}
