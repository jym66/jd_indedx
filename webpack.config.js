// 为了让IDE识别别名

const path = require('path')

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@/': path.resolve('src'),
        }
    }
}