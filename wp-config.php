<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'first_own_template' );

/** Database username */
define( 'DB_USER', 'first_own_template' );

/** Database password */
define( 'DB_PASSWORD', 'davidcroc12#$' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'M~I~6ra9(EE@a|P *Dl9jsQ}xlIcX%P3Gn%/I]*r]@#yHGEl)n!eJ#<M%4VD]sYj' );
define( 'SECURE_AUTH_KEY',  'q*es%$; M6&b&C+l)!6PY;@O`TieNI^SAGcD>Es;UuY+pFZm==@_SiQUcpuv(EEc' );
define( 'LOGGED_IN_KEY',    'tq0S~^IxMVJgqn5O;sy*$U>X[!gW*a6~/g[O@S9l|>ufyD4Jna:;g R*d%DW@!:q' );
define( 'NONCE_KEY',        '3y;NfiobK$FThGM8O3blo5Qt*}J/q`!a|o8I1OH{JcB%4Gu3Ce,69DW=ZvR.mhp1' );
define( 'AUTH_SALT',        '*p]hpdnU, rvh_7{H3n(T>MY5oQJt<(8 6Of)NUjU5+hwC j~v9;]McIm=6-wW&N' );
define( 'SECURE_AUTH_SALT', 'ezUPU#;lptqtQ6Aqh)G-5y*g6V[xf6>{U]-DfhN~sp[} hqw(SFcbxV9cq$^Te]L' );
define( 'LOGGED_IN_SALT',   'O@T+8Q Kl.r0K nt&zk kZJn1( ,e&.?jxwR>%z)5S~Se_vBx#lp6e<FQw%/Gcu9' );
define( 'NONCE_SALT',       'E_Wqa, QD9K?90eP~{2eD)&>,.CH>?7b0{6yo(>-GPh?M:^?Q;+Omc{;g=03/|BT' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
