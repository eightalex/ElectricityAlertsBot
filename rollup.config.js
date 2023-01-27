import dotenv from 'rollup-plugin-dotenv';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'output',
        format: 'cjs',
        strict: false,
    },
    plugins: [
        dotenv.default(),
        typescript(),
    ],
};
