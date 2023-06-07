<?php
/**
 * Displays the site header.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

// $wrapper_classes  = 'site-header';
// $wrapper_classes .= has_custom_logo() ? ' has-logo' : '';
// $wrapper_classes .= ( true === get_theme_mod( 'display_title_and_tagline', true ) ) ? ' has-title-and-tagline' : '';
// $wrapper_classes .= has_nav_menu( 'primary' ) ? ' has-menu' : '';
?>

<div id="preloader">
  <div class="loader"></div>
</div>
<header class="header-area">
  <div class="top-header-area">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="top-header-content">
            <a href="#">
              <i class="fa fa-phone" aria-hidden="true"></i>
              <span>Call Us: 001-1234-88888</span>
            </a>
            <a href="#">
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <span>Email: <span class="__cf_email__" data-cfemail="452c2b232a6b262a292a292c27052228242c296b262a28">[email&#160;protected]</span>
              </span>
            </a>
          </div>
        </div>
        <div class="col-6">
          <div class="top-header-content">
            <a href="#">
              <i class="fa fa-lock" aria-hidden="true"></i>
              <span>Login / Register</span>
            </a>
            <div class="dropdown">
              <a class="btn pr-0 dropdown-toggle" href="#" role="button" id="langdropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="
									<?php echo get_parent_theme_file_uri( '/assets/img/core-img/eng.png' ); ?>" alt="" class="" />English </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="langdropdown">
                <a class="dropdown-item" href="#">- Latvian</a>
                <a class="dropdown-item" href="#">- Hindi</a>
                <a class="dropdown-item" href="#">- Bangla</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="main-header-area">
    <div class="classy-nav-container breakpoint-off">
      <div class="container">
        <nav class="classy-navbar justify-content-between" id="hamiNav">
          <a class="nav-brand" href="index.html">
            <img src="
								<?php echo get_parent_theme_file_uri( '/assets/img/core-img/logo.png' ); ?>" alt="" class="" />
          </a>
          <div class="classy-navbar-toggler">
            <span class="navbarToggler">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div class="classy-menu">
            <div class="classycloseIcon">
              <div class="cross-wrap">
                <span class="top"></span>
                <span class="bottom"></span>
              </div>
            </div>
            <div class="classynav">
              <ul id="nav">
                <li class="active">
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="hosting.html">Hosting</a>
                </li>
                <li>
                  <a href="#">Pages</a>
                  <ul class="dropdown">
                    <li>
                      <a href="index.html">- Home</a>
                    </li>
                    <li>
                      <a href="hosting.html">- Hosting</a>
                    </li>
                    <li>
                      <a href="about.html">- About</a>
                    </li>
                    <li>
                      <a href="blog.html">- Blog</a>
                    </li>
                    <li>
                      <a href="single-blog.html">- Blog Details</a>
                    </li>
                    <li>
                      <a href="404.html">- 404</a>
                    </li>
                    <li>
                      <a href="coming-soon.html">- Coming Soon</a>
                    </li>
                    <li>
                      <a href="#">- Dropdown</a>
                      <ul class="dropdown">
                        <li>
                          <a href="#">- Dropdown Item</a>
                        </li>
                        <li>
                          <a href="#">- Dropdown Item</a>
                        </li>
                        <li>
                          <a href="#">- Dropdown Item</a>
                        </li>
                        <li>
                          <a href="#">- Dropdown Item</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="about.html">About</a>
                </li>
                <li>
                  <a href="blog.html">Blog</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
              <div class="live-chat-btn ml-5 mt-4 mt-lg-0 ml-md-4">
                <a href="#" class="btn hami-btn live--chat--btn">
                  <i class="fa fa-comments" aria-hidden="true"></i> Live Chat </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</header>
