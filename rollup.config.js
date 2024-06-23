import terser from '@rollup/plugin-terser';
import dotenv from 'rollup-plugin-dotenv';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'output/bundle.js',
            format: 'cjs',
            strict: false,
        },
        {
            file: 'output/bundle.min.js',
            format: 'cjs',
            strict: false,
            plugins: [terser()]
        },
    ],
    plugins: [
        dotenv(),
        typescript(),
    ],
};
