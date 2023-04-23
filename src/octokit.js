const { Octokit } = require('@octokit/rest')

const GITHUB_TOKEN = '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'
const octokit = new Octokit({ auth: GITHUB_TOKEN })

module.exports = {
	octokit
}
