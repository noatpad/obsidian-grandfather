import os from 'os';
import copy from 'rollup-plugin-copy';
import rollup from './rollup.config';

const TEST_VAULT = `${os.homedir()}/Documents/Obsidian/Test/.obsidian/plugins/grandfather`;

export default {
  ...rollup,
  plugins: [
    ...rollup.plugins,
    copy({ targets: [{ src: ['dist/main.js', 'manifest.json'], dest: TEST_VAULT }] })
  ]
};
