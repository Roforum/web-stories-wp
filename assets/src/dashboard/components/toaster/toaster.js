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
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { AlertSeveritiesPropType } from '../../types';
import { Alert } from '../';

function Toaster({ allowEarlyDismiss, activeToasts, onRemoveToastClick }) {
  return (
    <Alert.Wrapper>
      {activeToasts.map((activeToast, index) => (
        <Alert.Container
          allowDismiss={allowEarlyDismiss}
          key={`alert_${index}`}
          message={activeToast.message}
          severity={activeToast.severity}
          handleDismissClick={() => onRemoveToastClick(index)}
        />
      ))}
    </Alert.Wrapper>
  );
}

Toaster.propTypes = {
  allowEarlyDismiss: PropTypes.bool,
  activeToasts: PropTypes.arrayOf(
    PropTypes.shape({
      // move to types
      message: PropTypes.string.isRequired,
      severity: AlertSeveritiesPropType,
      errorId: PropTypes.number.isRequired,
    })
  ),
  onRemoveToastClick: PropTypes.func,
};
export default Toaster;
