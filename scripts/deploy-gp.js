import {
    execa
} from 'execa';

const buildFolderName = "dist";
const tmpBranchName = "gh-pages";

(async () => {
    try {
        await execa("git", ["checkout", "--orphan", tmpBranchName]);

        console.log("Build");
        await execa("npm", ["run", "build"]);
        await execa("git", ["--work-tree", buildFolderName, "add", "--all"]);
        await execa("git", ["--work-tree", buildFolderName, "commit", "-m", "gp-deployment"]);

        console.log("Github Pages deployment");
        await execa("git", ["push", "origin", "HEAD:" + tmpBranchName, "--force"]);

        console.log("Clean up");
        await execa("git", ["checkout", "-f", "main"]);
        await execa("git", ["branch", "-D", tmpBranchName]);

        console.log("Finished");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
})();