#!/usr/bin/env node
const program = require('commander');
program
    .version(require('../package').version)
    .on('--help', printHelp)
    .usage('<command> [options]')
    .parse(process.argv)
//process模块用来与当前进程互动，可以通过全局变量process访问，不必使用require命令加载。它是一个EventEmitter对象的实例。
function printHelp (){
    console.log("gitchat help");
}
program
.command('new')
.description('新建一个项目')
.action(function(name,other){
    require('../lib/new.js').run(name,other)
});
program.parse(process.argv);

