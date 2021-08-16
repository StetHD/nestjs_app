import {cp as copy } from 'shelljs';
import {existsSync, mkdirSync} from 'fs';
import {join as joinPath} from 'path';

const out = joinPath(__dirname, '..', 'dist');
createFolderIfNotExist(out);

createFolderIfNotExist(joinPath(out, 'config'));

copy('-R', 'src/config/*.json', 'dist/config');

let clientDist = joinPath(__dirname, '..', '..', 'target', 'classes', 'static');

if (!existsSync(clientDist)) {
    clientDist = joinPath(__dirname, '..', '..', 'build', 'resources', 'main', 'static');
}

if (existsSync(clientDist)) {
    copy('-R', clientDist, out);
}

function createFolderIfNotExist(outDir: string): void {
    if (!existsSync(outDir)) {
        mkdirSync(outDir);
    }
}
