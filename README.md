## Helpers for getting values of specific Progressive Web Metrics

The [pwmetrics](https://github.com/paulirish/pwmetrics) module exposes the ability to get use performance 
metrics out of Lighthouse. This includes the ability to perform multiple runs.

This module provides a simple API on top of pwmetrics for plucking out values of specific metrics.

## Install

```
$ npm install --save pwmetrics-helper
```

## Usage

### desiredMetric

The `desiredMetric` field takes one of the following metrics and will return just
that value from the median runs:

* 'First Contentful Paint'
* 'First Meaningful Paint'
* 'Perceptual Speed Index'
* 'First Visual Change'
* 'Visually Complete 100%'
* 'Time to Interactive'
* 'Visually Complete 85%'

#### Perform 3 runs (the default) and just return time-to-interactive:

```js
const getMetrics = require('pwmetrics-helper');

getMetrics('https://airhorner.com', {
    desiredMetric: 'Time to Interactive'
}).then(score => {
    // do something with the score
});
```

#### Perform 2 runs and just return first-contentful-paint

```js
const getMetrics = require('pwmetrics-helper');

getMetrics('https://airhorner.com', {
    desiredMetric: 'First Contentful Paint'
}).then(score => {
    // do something with the FCP
});
```

#### Perform 3 runs and return the entire JSON payload from pwmetrics

```js
const getMetrics = require('pwmetrics-helper');

getMetrics('https://airhorner.com').then(data => {
    // do something with the data
});
```

## runs

`runs` specifies the number of runs of Lighthouse to perform via `pwmetrics`
before a median score is returned

## License

Apache 2.0. Google Inc.