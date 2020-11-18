const { Octokit } = require('@octokit/rest')

// Lib
const { _getUserDetails } = require('../../../get-all-organization-contributors/[organizationName]')

export default async function handler(req, res) {
    // Getting user login ang page
    const {
        query: { userLogin, repoName, page },
    } = req

    // Checking if data is correct
    if (!userLogin || !repoName || !page) return res.json({ res: false, err: 'MISSING_DATA' }) // Checking if user login is defined

    // Init github api
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    })

    // Getting user data
    const contributorsReq = await octokit.request(`GET /repos/${userLogin}/${repoName}/contributors`, {
        owner: userLogin,
        repo: repoName,
        page: page,
        per_page: 20,
    })

    if (contributorsReq.status !== 200) return res.json({ res: false, err: 'WRONG_DATA' })

    // Getting details of each user
    let contributorsWithDetailsPromises = []
    for (let i = 0; i < contributorsReq.data.length; i++) {
        contributorsWithDetailsPromises.push(
            _getUserDetails(contributorsReq.data[i].login, { contributions: contributorsReq.data[i].contributions })
        )
    }

    const contributorsWithDetails = await Promise.all(contributorsWithDetailsPromises)

    res.json({ res: true, contributors: contributorsWithDetails })
}
