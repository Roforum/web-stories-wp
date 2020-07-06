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
import { useReducer, useMemo } from 'react';

/**
 * Internal dependencies
 */
import localReducer from './local/reducer';
import media3pReducer from './media3p/reducer';
import * as localActionsToWrap from './local/actions';
import * as media3pActionsToWrap from './media3p/actions';
import * as types from './types';

function rootReducer(state = {}, { type, payload }) {
  return {
    local: localReducer(state.local, { type, payload }),
    media3p: media3pReducer(state.media3p, { type, payload }),
  };
}

const wrapWithDispatch = (actions, dispatch) =>
  Object.keys(actions).reduce(
    (collection, action) => ({
      ...collection,
      [action]: actions[action](dispatch),
    }),
    {}
  );

function useMediaReducer(
  reducer = rootReducer,
  actionsToWrap = localActionsToWrap
) {
  const initialValue = useMemo(
    () => reducer(undefined, { type: types.INITIAL_STATE }),
    [reducer]
  );
  const [state, dispatch] = useReducer(reducer, initialValue);

  const wrappedActions1 = useMemo(
    () => wrapWithDispatch(localActionsToWrap, dispatch),
    [localActionsToWrap]
  );
  const wrappedActions2 = useMemo(
    () => wrapWithDispatch(media3pActionsToWrap, dispatch),
    [media3pActionsToWrap]
  );

  return {
    state,
    actions: {
      local: wrappedActions1,
      media3p: wrappedActions2,
    },
  };
}

export default useMediaReducer;
