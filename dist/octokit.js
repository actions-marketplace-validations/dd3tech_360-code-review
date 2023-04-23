var Octokit = require("@octokit/rest").Octokit;
var GITHUB_TOKEN = "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";
var octokit = new Octokit({
    auth: GITHUB_TOKEN
});
module.exports = {
    octokit: octokit
};
