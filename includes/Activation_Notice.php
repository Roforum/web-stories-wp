<?php
/**
 * Class Activation_Notice.
 *
 * @package   Google\Web_Stories
 * @copyright 2020 Google LLC
 * @license   https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/google/web-stories-wp
 */

/**
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

namespace Google\Web_Stories;

use Google\Web_Stories\Traits\Assets;

/**
 * Class Activation_Notice.
 */
class Activation_Notice {
	/**
	 * Script handle.
	 *
	 * @var string
	 */
	const SCRIPT_HANDLE = 'web-stories-activation-notice';

	use Assets;

	/**
	 * Activation flag instance.
	 *
	 * @var Activation_Flag
	 */
	protected $activation_flag;

	/**
	 * Constructor.
	 *
	 * @param Activation_Flag $activation_flag Activation flag instance.
	 */
	public function __construct(
		Activation_Flag $activation_flag
	) {
		$this->activation_flag = $activation_flag;
	}

	/**
	 * Initializes the plugin activation notice.
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
		add_action( 'admin_notices', [ $this, 'render_notice' ] );
		add_action( 'network_admin_notices', [ $this, 'render_notice' ] );
	}

	/**
	 * Enqueues assets for the plugin activation notice.
	 *
	 * @param string $hook_suffix The current admin page.
	 * @return void
	 */
	public function enqueue_assets( $hook_suffix ) {
		if ( 'plugins.php' !== $hook_suffix || ! $this->activation_flag->get_activation_flag( is_network_admin() ) ) {
			return;
		}

		/**
		 * Prevent the default WordPress "Plugin Activated" notice from rendering.
		 *
		 * @link https://github.com/WordPress/WordPress/blob/e1996633228749cdc2d92bc04cc535d45367bfa4/wp-admin/plugins.php#L569-L570
		 */
		unset( $_GET['activate'] ); // phpcs:ignore WordPress.Security.NonceVerification, WordPress.VIP.SuperGlobalInputUsage

		wp_enqueue_style(
			'roboto',
			'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
			[],
			WEBSTORIES_VERSION
		);

		$this->enqueue_script( self::SCRIPT_HANDLE );

		wp_localize_script(
			self::SCRIPT_HANDLE,
			'webStoriesActivationSettings',
			$this->get_script_settings()
		);
	}

	/**
	 * Returns script settings as an array.
	 *
	 * @return array Script settings.
	 */
	protected function get_script_settings() {
		return [
			'id'     => 'web-stories-plugin-activation-notice',
			'config' => [
				'isRTL' => is_rtl(),
			],
		];
	}

	/**
	 * Renders the plugin activation notice.
	 *
	 * @return void
	 */
	public function render_notice() {
		global $hook_suffix;

		if ( empty( $hook_suffix ) ) {
			return;
		}

		if ( 'plugins.php' !== $hook_suffix ) {
			return;
		}

		$network_wide = is_network_admin();
		$flag         = $this->activation_flag->get_activation_flag( $network_wide );

		if ( ! $flag ) {
			return;
		}

		// Unset the flag so that the notice only shows once.
		// phpcs:ignore Squiz.Commenting.InlineComment.InvalidEndChar
		// $this->activation_flag->delete_activation_flag( $network_wide );

		?>
		<div id="web-stories-plugin-activation-notice" class="notice notice-success is-dismissible">
		</div>
		<?php
	}
}
