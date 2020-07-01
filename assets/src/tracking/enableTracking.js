/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal dependencies
 */
import { DATA_LAYER } from './constants';
import { config, gtag } from './shared';

/**
 * Loads the Analytics tracking script.
 *
 * @return {Promise<void>} Promise.
 */
function loadTrackingScript() {
  const SCRIPT_IDENTIFIER = 'data-web-stories-tracking';

  if (document.querySelector(`script[${SCRIPT_IDENTIFIER}]`)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute(SCRIPT_IDENTIFIER, '');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.trackingId}&l=${DATA_LAYER}`;
    script.addEventListener('load', resolve);
    script.addEventListener('error', reject);
    document.head.appendChild(script);

    gtag('js', new Date());
    // TODO: provide custom pageview-related parameters?
    // See https://developers.google.com/analytics/devguides/collection/gtagjs/pages
    gtag('config', config.trackingId);

    // eslint-disable-next-line no-console
    console.log('Tracking Page View', config.trackingId);

    // TODO: Remove to make testable.
    resolve();
  });
}

async function enableTracking() {
  // eslint-disable-next-line no-console
  console.log('Enable Tracking', config);

  if (!config.trackingAllowed) {
    return Promise.resolve();
  }

  config.trackingEnabled = true;

  //eslint-disable-next-line no-return-await
  return await loadTrackingScript();
}

export default enableTracking;