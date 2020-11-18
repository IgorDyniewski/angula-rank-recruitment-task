const { Octokit } = require('@octokit/rest')

export default async function handler(req, res) {
    // Getting user name and repo name
    const {
        query: { userName, repoName },
    } = req

    if (!userName || !repoName) return res.json({ res: false, err: 'MISSING_DATA' })

    // We should have all necessary data to make an request

    // Init github api
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    })

    const repoData = await octokit.request(`GET /repos/${userName}/${repoName}`, {
        owner: userName,
        repo: repoName,
    })

    // Checking if request is successful
    if (repoData.status !== 200) return res.json({ res: false, err: 'WRONG_DATA' })

    // Sending user data
    res.json({ res: true, repoData: repoData.data })
}
