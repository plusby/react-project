module.exports = {
    presets: [ // 预设
        [
            '@babel/preset-env', // 最新标准的Es集合
            {
              targets: '> 2% in CN and not ie <= 8 and not dead',
            },
        ],
        '@babel/preset-react', // 使用react集合
        '@babel/preset-typescript', // 用于处理TypeScript
    ], 
    
};