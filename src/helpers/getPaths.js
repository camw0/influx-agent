'use strict';

const WIN_PATH = './';
const LINUX_PATH ='/etc/influx/';

function getSettingsPath () {
    return `${process.platform === 'win32' ? WIN_PATH : LINUX_PATH}config.yml`;
}

function getDataPath () {
    return `${process.platform === 'win32' ? WIN_PATH : LINUX_PATH}data.json`;
}

module.exports = { getSettingsPath, getDataPath };
