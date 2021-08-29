import ts from 'rollup-plugin-typescript2';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import path from 'path'

export default {
    input: "src/index.ts",
    output:{
        format:'iife', //  立即执行
        file:path.resolve('./dist/bundle.js'),// 出口文件
        sourcemap: true, // 根据源码参生映射文件
    },
    plugins:[
        nodeResolve({
            extensions:['.js', '.ts']
        }),
        ts({
            tsconfig: path.resolve('./tsconfig.json')
        }),
        serve({
            openPage:'/public/index.html',
            contentBase:'',
            port:8080
        })
    ]
}