/**
 * @license
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const PWMetrics = require('pwmetrics');
const keys = [
    'First Contentful Paint',
    'First Meaningful Paint',
    'Perceptual Speed Index',
    'First Visual Change',
    'Visually Complete 100%',
    'Time to Interactive',
    'Visually Complete 85%'];

function getMetric(data, keyName) {
    return data.median.timings[keys.indexOf(keyName)].value;
}

function getPWMetrics(url, flags) {
    if (!url) {
        console.error('Please provide a valid input URL');
    }

    if (!flags) {
        flags = {};
    }
    // Force JSON mode for PWMetrics to avoid visual output
    flags.json = true;

    // Default to 3 runs to get out the median values
    if (!flags.runs) {
        flags.runs = 3;
    }

    const pwm = new PWMetrics(url, flags);
    return Promise.resolve(pwm)
    .then(data => {
        let value = null;
        if (flags.desiredMetric) {
            value = getMetric(data, flags.desiredMetric);
        } else {
            value = JSON.stringify(data, null, 2) + '\n';
        }
        return value;
    })
    .catch(err => {
        console.error(err);
        return process.exit(1);
    });
};

module.exports = getPWMetrics;