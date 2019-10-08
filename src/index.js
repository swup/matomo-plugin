import Plugin from '@swup/plugin';

export default class SwupMatomoPlugin extends Plugin {
	name = 'SwupMatomoPlugin';

	mount() {
		this.swup.on('contentReplaced', event => {
			if (typeof window._paq !== 'undefined') {
				let title = document.title;
				let url = window.location.pathname + window.location.search;

				_paq.push(['setDocumentTitle', title]);
				_paq.push(['setCustomUrl', url]);
				_paq.push(['trackPageView']);

				this.swup.log(`Matomo pageview (url '${url}').`);
			} else {
				console.warn('Matomo is not loaded.');
			}
		})
	}
}
