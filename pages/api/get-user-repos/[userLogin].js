const { _getUserRepositories } = require('../get-user-data/[userLogin].js')

export default async function handler(req, res) {
    // Getting user login ang page
    const {
        query: { userLogin, page },
    } = req

    // Checking if data is correct
    if (!userLogin || !page) return res.json({ res: false, err: 'MISSING_DATA' }) // Checking if user login is defined

    // Getting pages
    const repos = await _getUserRepositories(userLogin, page)

    // Sending pages
    res.json({ res: true, repos: repos })
}
