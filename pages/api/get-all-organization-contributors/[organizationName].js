const { Octokit } = require('@octokit/rest')

export default async function handler(req, res) {
    // Getting org name
    const {
        query: { organizationName },
    } = req

    if (!organizationName) return res.json({ res: false }) // Checking if ogr name id defined

    // Init github api
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    })

    const { data: orgRepositories } = await octokit.repos.listForOrg({
        org: organizationName,
    })
    const orgRepositoriesNames = orgRepositories.map((repo) => repo.name) // We have all repo's names for org

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
            else allContributors[indexOfUser].contributions += user.contributions
        })
    })

    // Leaving only necessary user data
    allContributors = allContributors.map((user) => ({
        id: user.id,
        login: user.login,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        contributions: user.contributions,
    }))

    // Sending user data
    res.json({ res: true, allContributors: allContributors })
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
