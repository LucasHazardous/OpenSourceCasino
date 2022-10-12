git --work-tree dist add --all
git --work-tree dist commit -m gp-deployment

git push origin HEAD:gh-pages --force

git checkout -f main
git branch -D gh-pages