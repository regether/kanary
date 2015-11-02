#!/usr/bin/env node

var argv = process.argv.slice(2);


var methods = {
  create: function(controller, action){
    
  }
};

if(argv.length == 0){
  return help();
}else{
  var command = argv[0];
  executeCommand(command);
}

function help(){
  console.log(' Kanary v1.0.0');
  console.log();
  console.log(' Usage: ');
  console.log('   help');
  console.log('   create');
  console.log('   create');
  return;
}

function executeCommand(method){
  methods[ method ].apply(this, argv.slice(1));
}
