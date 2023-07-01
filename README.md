# Swup Matomo Plugin

A [swup](https://swup.js.org) plugin for integrating [Matomo](https://matomo.org/) analytics.

- Trigger pageview events after each page change
- This event is not triggered on intial load, so the first page view must be triggered elsewhere
- However, the page view event is by default triggered in [Javascripts tracking snippet](https://developer.matomo.org/guides/tracking-javascript-guide) used for embedding Matomo.

Simplified code run by this plugin on the `pageView` hook:

```js
_paq.push(['setDocumentTitle', document.title]);
_paq.push(['setCustomUrl', window.location.pathname + window.location.search]);
_paq.push(['trackPageView']);
```

## Installation

Install the plugin from npm and import it into your bundle.

```bash
npm install @swup/matomo-plugin
```

```js
import SwupMatomoPlugin from '@swup/matomo-plugin';
```

Or include the minified production file from a CDN:

```html
<script src="https://unpkg.com/@swup/matomo-plugin@2"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupMatomoPlugin()]
});
```
