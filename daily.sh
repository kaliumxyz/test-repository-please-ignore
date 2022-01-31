#!/usr/bin/env bash

if [ ! -f $1 ]; then
    mkdir $1
    cd $1
    git init
    git config --local user.name "$2"
    git config --local user.email "$3"
    echo '# history' > readme.md
    echo '' >> readme.md
    echo 'I am a really good developer look at my git timeline like woah all green all the time forever' >> readme.md
    date="1990-01-01 00:00:00"
    export GIT_COMMITTER_DATE="$date"
    export GIT_AUTHOR_DATE="$date"
    git add .
    git commit -am "init"
    for i in $(seq 1 100000); do
        date=$(date -v 00H -v 00M -v 00S -v 01d -v 01m -v 1990y -v "+$i"d +%Y-%m-%d\ %H:%M:%S;);
        echo "$date" >> hist
        export GIT_COMMITTER_DATE="$date"
        export GIT_AUTHOR_DATE="$date"
        git add .
        git commit -am "$date"
    done
fi
