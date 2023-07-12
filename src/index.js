import Plugin from '@swup/plugin';

/**
 * Class representing the Swup Matomo Plugin.
 * @extends Plugin
 */
export default class SwupMatomoPlugin extends Plugin {
	name = 'SwupMatomoPlugin';

	requires = { swup: '>=4' };

	/**
	 * Add event handlers on mount
	 */
	mount() {
		this.swup.hooks.on('page:view', this.trackPageView);
	}

	/**
	 * Remove event handlers on unmount
	 */
	unmount() {
		this.swup.hooks.off('page:view', this.trackPageView);
	}

	/**
	 * Tracks a page view to matomo, if it is installed
	 */
	trackPageView = () => {
		// Guard clause to detect if matomo is available
		if (window._paq == null) {
			this.swup.log('[@swup/matomo-plugin] 🚨 Matomo is not loaded');
			return;
		}

		const title = document.title;
		const url = window.location.pathname + window.location.search;

		_paq.push(['setDocumentTitle', title]);
		_paq.push(['setCustomUrl', url]);
		_paq.push(['trackPageView']);

		this.swup.log(`[@swup/matomo-plugin] ✅ PageView tracked for '${url}'`);
	};
}
