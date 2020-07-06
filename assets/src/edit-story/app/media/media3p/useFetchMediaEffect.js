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
 * External dependencies
 */
import { useEffect } from 'react';

import { useMedia3pApiProvider } from '../../../components/library/panes/media/media3p/api';

export default function useFetchMediaEffect({
  provider,
  selectedProvider,
  pageToken,
  fetchMediaStart,
  fetchMediaSuccess,
  fetchMediaError,
}) {
  const { actions: { listMedia } } = useMedia3pApiProvider();
  useEffect(() => {
    async function fetch() {
      fetchMediaStart({ provider, pageToken });
      try {
        const { media, nextPageToken } = await listMedia({ provider, pageToken });
        fetchMediaSuccess({ provider, media, nextPageToken });
      } catch (ex) {
        fetchMediaError({ provider, pageToken });
      }
    }

    if (provider === selectedProvider) {
      fetch();
    }
  }, [
    // Fetch media is triggered by changes to these.
    selectedProvider,
    pageToken,
    // These attributes never change.
    provider,
    fetchMediaError,
    fetchMediaStart,
    fetchMediaSuccess,
  ]);
}
