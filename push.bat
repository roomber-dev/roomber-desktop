@echo off

set /p COMMIT_MESSAGE=Enter the commit message: 

git add -A
git commit -m "%COMMIT_MESSAGE%"
git push