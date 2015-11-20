#!/usr/bin/env bash

#
# cmd has
#
cmd_has(){
  type "$1" > /dev/null 2>&1
}

version(){
  echo "2.0.0"
}

#
# help
#
help(){
  echo "help $@"
}

init(){
  exit 0
}

#
# create project
#
create_project(){
  local project="$1"

  # make dir
  mkdir -p $project

  # come
  cd $project

  # git
  git init

  # npm
  npm init
  npm install kanary --save

  # result
  echo "create project $project"

}


install(){
  local pkg="$1"
  npm install $pkg --save
  echo $pkg
}

if cmd_has "$1"; then
  $@
else
  help $@
fi
