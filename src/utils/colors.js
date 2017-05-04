const colors = require('colors')

colors.setTheme({
    silly: ['rainbow', 'bgWhite'],
    input: ['cyan', 'underline'],
    verbose: 'cyan',
    prompt: 'grey',
    info: ['green', 'bgWhite'],
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
})
/**
 *  控制台输出颜色设置，使用方法
 *  'string'.silly
 */

module.exports = colors

//  把 colors 的配置重新设置了一下

/*
    text colors
        black
        red
        green
        yellow
        blue
        magenta
        cyan
        white
        gray
        grey
    background colors
        bgBlack
        bgRed
        bgGreen
        bgYellow
        bgBlue
        bgMagenta
        bgCyan
        bgWhite
    styles
        reset
        bold
        dim
        italic
        underline
        inverse
        hidden
        strikethrough
    extras
        rainbow
        zebra
        america
        trap
        random
 */