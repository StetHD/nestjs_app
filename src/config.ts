import {Logger} from '@nestjs/common';
import {join as joinPath} from 'path';
import {existsSync} from 'fs';

const logger: Logger = new Logger('Config');

export class Config {

    constructor(properties) {

        this.addAll(properties);
    }

    public get(key: string): any {
        return this[key];
    }

    public addAll(properties): any {
        properties = objectToArray(properties);
        for (const property in properties) {
            if (properties.hasOwnProperty(property)) {
                this[property] = properties[property];
            }
        }

        this.postProcess();
    }

    public postProcess(): any {
        const variables = {...this, ...process.env};
        for (const property in this) {
            if (this.hasOwnProperty(property)) {
                const value = this[property];
                this[property] = this.processTemplate(value, variables);
            }
        }
    }

    private processTemplate(template, variables): any {
        if (typeof template === 'string') {
            return template.replace(
                new RegExp('\\${[^{]+}', 'g'),
                name => variables[name.substring(2, name.length - 1)]
            );
        }
        return template;
    }
}

console.log(__dirname);

const jsonConfigPath = joinPath(__dirname, 'config', 'application.json');
const envJsonConfigPath = joinPath(__dirname, 'config', `application-${process.env.ENV}.json`);

const jsonConfig = require(jsonConfigPath);

logger.log(`process.env.ENV value: ${process.env.ENV}`);
logger.log('Allowed values are: dev, prod');
logger.log(
    'if you run with with another ENV value, remember to add your application-{process.env.ENV}.json file',
);

if (!existsSync(envJsonConfigPath)) {
    logger.error(
        'An application-{process.env.ENV}.json file with your process.env.ENV value does not exist under config folder!',
    );
}

const envJsonConfig = require(envJsonConfigPath);

const config = new Config({
    ...objectToArray(jsonConfig),
    ...objectToArray(envJsonConfig),
    ipAddress: ipAddress(),
});

export {config};

function objectToArray(source, currentKey?, target?): any {
    target = target || {};
    for (const property in source) {
        if (source.hasOwnProperty(property)) {
            const newKey = currentKey ? `${currentKey}.${property}` : property;
            const newVal = source[property];

            if (typeof newVal === 'object') {
                objectToArray(newVal, newKey, target);
            } else {
                target[newKey] = newVal;
            }
        }
    }
    return target;
}

function ipAddress(): any {
    const interfaces = require('os').networkInterfaces();

    for (const device in interfaces) {
        if (interfaces.hasOwnProperty(device)) {
            const iFace = interfaces[device];
            for (const alias of iFace) {
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }

    return null;
}
