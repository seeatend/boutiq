import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from 'react-native-google-analytics-bridge';
import CONFIG from '../../config';

// The tracker must be constructed, and you can have multiple:
const gaTracker = new GoogleAnalyticsTracker(CONFIG.GA);
gaTracker.setTrackUncaughtExceptions(true);
gaTracker.setAppName(CONFIG.APP_NAME);

GoogleAnalyticsSettings.setDispatchInterval(20);
// GoogleTagManager.openContainerWithId(CONFIG.GTM)
// .then(() => GoogleTagManager.stringForKey('pack'))
// .then((str) => console.log('Pack: ', str));

export const tracker = {
  feedName(i) {
    return i === 0 ? 'MyNetwork' : 'Discover';
  },
  setUserId({ id }) {
    gaTracker.setUser(id);
  },
  screenView({ page }) {
    gaTracker.trackScreenView(page);
  },
  event({ category, action, options } = { options: {} }) {
    gaTracker.trackEvent(category, action, options);
  },
  exception({ message, fatal } = { fatal: false }) {
    gaTracker.trackException(message, fatal);
  },
  socialInteraction({ network, action, targetUrl }) {
    gaTracker.trackSocialInteraction(network, action, targetUrl);
  }
};
