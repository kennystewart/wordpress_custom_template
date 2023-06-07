﻿<?php
/*
Template Name: Lovely Hami Front-Page
*/
get_header();
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
<section class="welcome-area">
  <div class="welcome-pattern">
    <img src="
					<?php echo get_parent_theme_file_uri( '/assets/img/core-img/welcome-pattern.png' ); ?>" alt="" class="" />
  </div>
  <div class="welcome-slides owl-carousel">
    <div class="single-welcome-slide">
      <div class="welcome-content h-100">
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12 col-md-9 col-lg-7">
              <div class="welcome-text mb-50">
                <h2 data-animation="fadeInLeftBig" data-delay="200ms" data-duration="1s">The Best <br> Web Hosting </h2>
                <h3 data-animation="fadeInLeftBig" data-delay="400ms" data-duration="1s">Starting at <span>$7.99</span> $2.95/month* </h3>
                <p data-animation="fadeInLeftBig" data-delay="600ms" data-duration="1s">Everything you will EVER need to Host and Manage your Website!</p>
                <a href="#" class="btn hami-btn btn-2" data-animation="fadeInLeftBig" data-delay="800ms" data-duration="1s">Get Start Now!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="welcome-thumbnail">
        <img src="
									<?php echo get_parent_theme_file_uri( '/assets/img/bg-img/1.png' ); ?>" alt="" class="" />
      </div>
    </div>
    <div class="single-welcome-slide">
      <div class="welcome-content h-100">
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12 col-md-9 col-lg-7">
              <div class="welcome-text mb-50">
                <h2 data-animation="fadeInUpBig" data-delay="200ms" data-duration="1s">The Best <br> Web Hosting </h2>
                <h3 data-animation="fadeInUpBig" data-delay="400ms" data-duration="1s">Starting at <span>$7.99</span> $2.95/month* </h3>
                <p data-animation="fadeInUpBig" data-delay="600ms" data-duration="1s">Everything you will EVER need to Host and Manage your Website!</p>
                <a href="#" class="btn hami-btn btn-2" data-animation="fadeInUpBig" data-delay="800ms" data-duration="1s">Get Start Now!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="welcome-thumbnail">
        <img src="
											<?php echo get_parent_theme_file_uri( '/assets/img/bg-img/2.png' ); ?>" alt="" class="" />
      </div>
    </div>
  </div>
  <div class="clouds">
    <img src="
										<?php echo get_parent_theme_file_uri( '/assets/img/core-img/cloud-1.png' ); ?>" alt="" class="cloud-1" />
    <img src="
											<?php echo get_parent_theme_file_uri( '/assets/img/core-img/cloud-2.png' ); ?>" alt="" class="cloud-2" />
    <img src="
												<?php echo get_parent_theme_file_uri( '/assets/img/core-img/cloud-3.png' ); ?>" alt="" class="cloud-3" />
    <img src="
													<?php echo get_parent_theme_file_uri( '/assets/img/core-img/cloud-4.png' ); ?>" alt="" class="cloud-4" />
    <img src="
														<?php echo get_parent_theme_file_uri( '/assets/img/core-img/cloud-5.png' ); ?>" alt="" class="cloud-5" />
  </div>
</section>
<section class="find-domain-area section-padding-100-0">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12 col-md-4">
        <div class="domain-text mb-100">
          <h2>Find Your Perfect Domain Name</h2>
          <h6>Only $7 for the first year</h6>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="domain-search-form mb-100">
          <form action="#" method="post" class="form-inline">
            <input type="search" placeholder="Enter Your Domain Name Here">
            <select name="domain-extension" id="domainExtension">
              <option value=".com">.COM</option>
              <option value=".com">.NET</option>
              <option value=".com">.ORG</option>
              <option value=".com">.US</option>
              <option value=".com">.BIZ</option>
              <option value=".com">.CO</option>
            </select>
            <button type="submit">Search Domain</button>
          </form>
          <div class="domain-price-help mt-50 d-flex align-items-center justify-content-between">
            <p>.COM $5.75</p>
            <p>.NET $9.45</p>
            <p>.ORG $7.50</p>
            <p>.US $5.99</p>
            <p>.BIZ $9.99</p>
            <p>.CO $6.0</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="hami-features-area bg-gray section-padding-100">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="section-heading text-center">
          <h2>Overall Features</h2>
          <p>Our revolutionary Cloud solution is powerful, simple, and surprisingly affordable.</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="single-feature-area d-flex mb-50">
          <div class="feature-icon">
            <i class="icon_cloud-upload_alt"></i>
          </div>
          <div class="feature-text">
            <h5>Auto Updates</h5>
            <p>Don't be distracted by criticism. Remember the only taste of success some people.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="single-feature-area d-flex mb-50">
          <div class="feature-icon">
            <i class="icon_adjust-vert"></i>
          </div>
          <div class="feature-text">
            <h5>Optimized Software</h5>
            <p>Don't be distracted by criticism. Remember the only taste of success some people.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="single-feature-area d-flex mb-50">
          <div class="feature-icon">
            <i class="icon_archive_alt"></i>
          </div>
          <div class="feature-text">
            <h5>Daily Backups</h5>
            <p>Don't be distracted by criticism. Remember the only taste of success some people.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="single-feature-area d-flex mb-50">
          <div class="feature-icon">
            <i class="icon_globe-2"></i>
          </div>
          <div class="feature-text">
            <h5>Wide Networking</h5>
            <p>Don't be distracted by criticism. Remember the only taste of success some people.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="single-feature-area d-flex mb-50">
          <div class="feature-icon">
            <i class="icon_shield"></i>
          </div>
          <div class="feature-text">
            <h5>Protected</h5>
            <p>Don't be distracted by criticism. Remember the only taste of success some people.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="single-feature-area d-flex mb-50">
          <div class="feature-icon">
            <i class="icon_headphones"></i>
          </div>
          <div class="feature-text">
            <h5>Free Support</h5>
            <p>Don't be distracted by criticism. Remember the only taste of success some people.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="feature-pattern">
    <img src="
																<?php echo get_parent_theme_file_uri( '/assets/img/core-img/welcome-pattern.png' ); ?>" alt="" class="" />
  </div>
</section>
<section class="hami-price-plan-area mt-50">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="section-heading text-center">
          <h2>Choose Your Web Hosting Plan</h2>
          <p>You want custom hosting plan. No hidden charge.</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="single-price-plan mb-100">
          <div class="price-plan-title">
            <h4>Standard Hosting</h4>
            <p>On sale - Save 50%</p>
          </div>
          <div class="price-plan-value">
            <h2>
              <span>$</span>1.99
            </h2>
            <p>/per month</p>
          </div>
          <a href="#" class="btn hami-btn w-100 mb-30">Get Started</a>
          <div class="price-plan-desc">
            <p>
              <i class="icon_check"></i> Unlimited Number of Websites
            </p>
            <p>
              <i class="icon_check"></i> Unlimited Email Accounts
            </p>
            <p>
              <i class="icon_check"></i> Unlimited Bandwidth
            </p>
            <p>
              <i class="icon_check"></i> 2X Processing Power &amp; Memory
            </p>
          </div>
          <a href="#" class="btn view-all-btn">Click here to see all features</a>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="single-price-plan active mb-100">
          <div class="popular-tag">
            <i class="icon_star"></i> Best Plan <i class="icon_star"></i>
          </div>
          <div class="price-plan-title">
            <h4>Advanced Hosting</h4>
            <p>On sale - Save 70%</p>
          </div>
          <div class="price-plan-value">
            <h2>
              <span>$</span>3.99
            </h2>
            <p>/per month</p>
          </div>
          <a href="#" class="btn hami-btn w-100 mb-30">Get Started</a>
          <div class="price-plan-desc">
            <p>
              <i class="icon_check"></i> Unlimited Number of Websites
            </p>
            <p>
              <i class="icon_check"></i> Unlimited Email Accounts
            </p>
            <p>
              <i class="icon_check"></i> Unlimited Bandwidth
            </p>
            <p>
              <i class="icon_check"></i> 2X Processing Power &amp; Memory
            </p>
          </div>
          <a href="#" class="btn view-all-btn">Click here to see all features</a>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="single-price-plan mb-100">
          <div class="price-plan-title">
            <h4>Unlimited Hosting</h4>
            <p>On sale - Save 50%</p>
          </div>
          <div class="price-plan-value">
            <h2>
              <span>$</span>7.99
            </h2>
            <p>/per month</p>
          </div>
          <a href="#" class="btn hami-btn w-100 mb-30">Get Started</a>
          <div class="price-plan-desc">
            <p>
              <i class="icon_check"></i> Unlimited Number of Websites
            </p>
            <p>
              <i class="icon_check"></i> Unlimited Email Accounts
            </p>
            <p>
              <i class="icon_check"></i> Unlimited Bandwidth
            </p>
            <p>
              <i class="icon_check"></i> 2X Processing Power &amp; Memory
            </p>
          </div>
          <a href="#" class="btn view-all-btn">Click here to see all features</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="hami-call-to-action bg-gray section-padding-100-0">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12 col-md-6">
        <div class="cta-thumbnail mb-100">
          <img src="
																				<?php echo get_parent_theme_file_uri( '/assets/img/bg-img/2.png' ); ?>" alt="" class="" />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="cta--content mb-100">
          <h2>Up to 70% Discount with FREE Domain Name Registration Included!</h2>
          <div class="cta-desc mb-50">
            <h6>
              <i class="icon_check"></i> FREE Domain Name
            </h6>
            <h6>
              <i class="icon_check"></i> FREE Email Address
            </h6>
            <h6>
              <i class="icon_check"></i> Plenty of Disk Space
            </h6>
            <h6>
              <i class="icon_check"></i> FREE Website Builder
            </h6>
            <h6>
              <i class="icon_check"></i> FREE Marketing Tools
            </h6>
            <h6>
              <i class="icon_check"></i> 1-Click WordPress Install
            </h6>
          </div>
          <a href="#" class="btn hami-btn">Get Start Now!</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="hami-support-area bg-gray">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="support-text">
          <h2>Need help? Call our award-winning support team 24/7: +65 1234-6868</h2>
        </div>
      </div>
    </div>
  </div>
  <div class="support-pattern" style="background-image: url(
																	<?php echo get_parent_theme_file_uri( '/assets/img/core-img/support-pattern.png' ); ?>);">
  </div>
</section>
<section class="hami-cta-area">
  <div class="container">
    <div class="cta-text">
      <h2>Proudly Hosting Over <span class="counter">800,000</span> Websites Since 2000 </h2>
    </div>
  </div>
</section>
<footer class="footer-area section-padding-80-0">
  <div class="main-footer-area">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-6 col-sm-4 col-lg-2">
          <div class="single-footer-widget mb-80">
            <h5 class="widget-title">Products</h5>
            <ul class="footer-nav">
              <li>
                <a href="#">Shared hosting</a>
              </li>
              <li>
                <a href="#">WordPress hosting</a>
              </li>
              <li>
                <a href="#">Vps hosting</a>
              </li>
              <li>
                <a href="#">Dedicated hosting</a>
              </li>
              <li>
                <a href="#">Reseller hosting</a>
              </li>
              <li>
                <a href="#">Hosting features</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-6 col-sm-4 col-lg-2">
          <div class="single-footer-widget mb-80">
            <h5 class="widget-title">Programs</h5>
            <ul class="footer-nav">
              <li>
                <a href="#">WordPress</a>
              </li>
              <li>
                <a href="#">Affiliates</a>
              </li>
              <li>
                <a href="#">Marketing services</a>
              </li>
              <li>
                <a href="#">WordPress guide</a>
              </li>
              <li>
                <a href="#">Testimonials</a>
              </li>
              <li>
                <a href="#">Awards &amp; Reviews</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-6 col-sm-4 col-lg-2">
          <div class="single-footer-widget mb-80">
            <h5 class="widget-title">Products</h5>
            <ul class="footer-nav">
              <li>
                <a href="#">Shared hosting</a>
              </li>
              <li>
                <a href="#">WordPress hosting</a>
              </li>
              <li>
                <a href="#">Vps hosting</a>
              </li>
              <li>
                <a href="#">Dedicated hosting</a>
              </li>
              <li>
                <a href="#">Reseller hosting</a>
              </li>
              <li>
                <a href="#">Hosting features</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-6 col-sm-4 col-lg-2">
          <div class="single-footer-widget mb-80">
            <h5 class="widget-title">Company</h5>
            <ul class="footer-nav">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Terms of service</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-sm-8 col-lg-4">
          <div class="single-footer-widget mb-80">
            <h5 class="widget-title">Subscribe Newsletter</h5>
            <p>Subscribe to our email newsletter for useful tips and valuable resources.</p>
            <form action="index.html" class="nl-form">
              <input type="email" class="form-control" placeholder="Your Mail">
              <button type="submit">
                <i class="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </form>
            <div class="social-info">
              <a href="#" class="facebook">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="#" class="twitter">
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="#" class="google-plus">
                <i class="fa fa-google-plus" aria-hidden="true"></i>
              </a>
              <a href="#" class="instagram">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="#" class="youtube">
                <i class="fa fa-youtube" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-footer-area bg-gray">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12 col-md-6">
          <div class="copywrite-text">
            <p> Copyright &copy;2023 All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
            </p>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="payments-methods d-flex align-items-center">
            <p>Payments We Accept</p>
            <i class="fa fa-cc-visa" aria-hidden="true"></i>
            <i class="fa fa-cc-mastercard" aria-hidden="true"></i>
            <i class="fa fa-cc-discover" aria-hidden="true"></i>
            <i class="fa fa-cc-amex" aria-hidden="true"></i>
            <i class="fa fa-cc-paypal" aria-hidden="true"></i>
            <i class="fa fa-cc-stripe" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer> <?php get_footer(); ?>