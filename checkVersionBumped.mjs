import typedRegExp from '@suin/typed-regexp';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import semver from 'semver';

async function getFileFromHistory(rev, path) {
    const current$ = fs.readFile(path, { encoding: 'utf8' });

    const prev$ = new Promise((resolve, reject) => {
        exec(`git show ${rev}:${path}`, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });

    return Promise.all([current$, prev$]);
}

async function checkConditionForFiles(rev, path, transformer, condition) {
    const [current, previous] = await getFileFromHistory(rev, path);

    const [currentTransformed, previousTransformed] = [current, previous].map(input => transformer(input));

    return [path, condition(currentTransformed, previousTransformed), currentTransformed, previousTransformed];
}

const checkVersion = (current, previous) => ({ version: semver.gt(current.version, previous.version) });
const checkVersionCode = (current, previous) => ({ versionCode: current.versionCode > previous.versionCode });
const checkAll = (current, previous) => ({
    ...checkVersion(current, previous),
    ...checkVersionCode(current, previous)
});

async function run() {
    const packageJson$ = checkConditionForFiles(
        'refs/heads/master',
        'package.json',
        input => ({ version: JSON.parse(input).version }),
        checkVersion
    );
    const appJson$ = checkConditionForFiles(
        'refs/heads/master',
        'app.json',
        input => {
            const json = JSON.parse(input);
            return { version: json.expo.version, versionCode: json.expo.android.versionCode };
        },
        checkAll
    );
    const buildGradle$ = checkConditionForFiles(
        'refs/heads/master',
        'android/app/build.gradle',
        input => {
            const { versionCode } = typedRegExp('^s+versionCode (?<versionCode>d+)$', 'm').exec(input).groups;
            const { versionName } = typedRegExp('^s+versionName "(?<versionName>.+)"$', 'm').exec(input).groups;
            return { version: versionName, versionCode: parseInt(versionCode, 10) };
        },
        checkAll
    );

    const results = await Promise.all([packageJson$, appJson$, buildGradle$]);

    let failed = false;
    results.forEach(([path, comp, newVersions, oldVersions]) => {
        Object.keys(comp).forEach(key => {
            if (!comp[key]) {
                console.error(
                    `${path} ${key} field incorrectly bumped. Was: ${newVersions[key]}, is: ${oldVersions[key]}`
                );
                failed = true;
            }
        });
    });

    const versions = results.filter(([, comp]) => 'version' in comp).map(([name, , { version }]) => [name, version]);
    const versionsMismatch = versions.some(([name, version]) => version !== versions[0][1]);
    if (versionsMismatch) {
        console.error(`Version mismatch! Found:`);
        versions.forEach(([name, version]) => {
            console.error(`    ${version} in ${name}`);
        });
        failed = true;
    }

    const versionCodes = results
        .filter(([, comp]) => 'versionCode' in comp)
        .map(([name, , { versionCode }]) => [name, versionCode]);
    const versionCodesMismatch = versionCodes.some(([name, versionCode]) => versionCode !== versionCodes[0][1]);
    if (versionCodesMismatch) {
        console.error(`Version Code mismatch! Found:`);
        versionCodes.forEach(([name, versionCode]) => {
            console.error(`    ${versionCode} in ${name}`);
        });
        failed = true;
    }

    process.exit(failed ? 1 : 0);
}

run();
