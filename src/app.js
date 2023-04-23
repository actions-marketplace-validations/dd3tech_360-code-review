const { octokit } = require('./octokit')
const generateReviewComments = require('./generateReview')

module.exports = (app) => {
	app.log('Starting server...')
	app.on('pull_request', async event => {
		const { action, pull_request: pr } = event.payload
		if(action !== 'opened') return
	
		const { data: files } = await octokit.pulls.listFiles({
			owner: pr.base.repo.owner.login,
			repo: pr.base.repo.name,
			pull_number: pr.number
		})
	
		if(!files || !files.lenght) return
	
		const code = files.map((file) => file.contents).join('\n')
		const codeReview = await generateReviewComments(code)
	
		await octokit.pulls.createReview({
			owner: pr.base.repo.owner.login,
			repo: pr.base.repo.name,
			pull_number: pr.number,
			body: codeReview,
			event: 'COMMENT',
		})
	})
}
