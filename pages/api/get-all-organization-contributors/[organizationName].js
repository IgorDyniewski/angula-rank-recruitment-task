const { Octokit } = require('@octokit/rest')

// Lib
const fakeData = require('../../../lib/fakeData.json')

export default async function handler(req, res) {
    // Getting org name
    const {
        query: { organizationName },
    } = req

    if (!organizationName) return res.json({ res: false, err: 'MISSING_DATA' }) // Checking if ogr name id defined

    // Mocking API when in dev mode to overcome GitHub API limits
    if (process.env.MODE === 'DEV') {
        console.log('Development mode, using fake data...')
        res.json(fakeData)
        return
    } else {
        console.log('Running in production mode')
    }

    // Init github api
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    })

    let isOrgValid = true
    let orgRepositories = await octokit.repos
        .listForOrg({
            org: organizationName,
        })
        .catch((err) => {
            console.log(err)
            res.json({ res: false, err: 'WRONG_ORG' })
            isOrgValid = false
            return
        })
    if (!isOrgValid) return

    const orgRepositoriesNames = orgRepositories.data.map((repo) => repo.name) // We have all repo's names for org

    console.log('Got all repositories: ', orgRepositoriesNames.length)

    // Getting all contributors for each repo
    const allContributorsSeparated = await Promise.all(
        orgRepositoriesNames.map((repoName) => _getAllContributorsForRepo(organizationName, repoName))
    )

    // Getting unique contributors
    let allContributors = []
    allContributorsSeparated.forEach((contributorGroup) => {
        contributorGroup.forEach((user) => {
            const indexOfUser = allContributors.map((contributor) => contributor.id).indexOf(user.id)
            if (indexOfUser === -1) allContributors.push(user)
            else return
        })
    })

    console.log('Got all unique contributors: ', allContributors.length)

    // Leaving only necessary user data
    allContributors = allContributors.map((user) => ({
        login: user.login,
        contributions: user.contributions,
    }))

    // Getting details of each user
    let contributorsWithDetailsPromises = []
    for (let i = 0; i < allContributors.length; i++) {
        contributorsWithDetailsPromises.push(
            _getUserDetails(allContributors[i].login, { contributions: allContributors[i].contributions })
        )
    }

    const contributorsWithDetails = await Promise.all(contributorsWithDetailsPromises)

    console.log('Got details of each user: ', contributorsWithDetails.length)

    // Sending user data
    res.json({ res: true, allContributors: contributorsWithDetails })
}

// Get all contributors for repository
const _getAllContributorsForRepo = async (repoOwner, remoName) => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    })
    let contributors = []
    let page = 0
    let lastPageCount = 100

    while (lastPageCount === 100) {
        const { data: data } = await octokit.repos.listContributors({
            owner: repoOwner,
            repo: remoName,
            per_page: 100,
            page: page,
        })
        lastPageCount = data.length
        page++
        contributors = contributors.concat(data)
    }

    return contributors
}

// Getting user's details
export const _getUserDetails = async (login, additionalData) => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    })

    const userDetails = await octokit.request(`GET /users/${login}`, {
        username: login,
    })

    return { ...userDetails.data, ...additionalData }
}
