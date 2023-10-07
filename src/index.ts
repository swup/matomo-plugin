import Plugin from '@swup/plugin';

declare global {
	interface Window {
		_paq?: {
			push?: (payload: any[]) => void;
		}
	}
}

export default class SwupMatomoPlugin extends Plugin {
	name = 'SwupMatomoPlugin';

	requires = { swup: '>=4' };

	mount() {
		this.on('page:view', this.trackPageView);
	}

	/** Tracks a page view to matomo, if it is installed */
	trackPageView() {
		// Abort if matomo is not available
		if (typeof window._paq?.push !== 'function') {
			this.swup.log('[@swup/matomo-plugin] 🚨 Matomo is not loaded');
			return;
		}

		const title = document.title;
		const url = window.location.pathname + window.location.search;

		window._paq.push(['setDocumentTitle', title]);
		window._paq.push(['setCustomUrl', url]);
		window._paq.push(['trackPageView']);

		this.swup.log(`[@swup/matomo-plugin] ✅ Visit tracked for '${url}'`);
	}
}
