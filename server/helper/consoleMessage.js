const chalk = require('chalk')

const warningMessage = chalk.keyword('orange');
const errorMessage = chalk.bold.redBright;
const sucessMessage = chalk.bold.greenBright;

module.exports = {
    warningMessage ,
    errorMessage ,
    sucessMessage
}