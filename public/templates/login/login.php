<?php
/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/public/templates/parts
 */

$checkout_URI = drgc_get_page_link( 'checkout' );
$check_subs = drgc_is_subs_added_to_cart( $cart );
?>

<div class="dr-login-wrapper dr-login" id="full-width-page-wrapper">
    <div class="dr-login-sections">

        <?php if ( $customer && 'Anonymous' !== $customer['id'] ) : ?>

            <section class="dr-login-sections__section section-returning logged-in">

                <?php echo __( 'Welcome ', 'digital-river-global-commerce' ) . $customer['username']; ?>

                <div>
                    <a class="btn dr-btn" href="<?php echo esc_url( drgc_get_page_link( 'cart' ) ); ?>"><?php echo __( 'Cart', 'digital-river-global-commerce' ); ?></a>
                    <a class="btn dr-btn" href="<?php echo esc_url( $checkout_URI ); ?>"><?php echo __( 'Checkout', 'digital-river-global-commerce' ); ?></a>
                    <a class="btn dr-btn" href="<?php echo esc_url( drgc_get_page_link( 'account' ) ); ?>"><?php echo __( 'My Account', 'digital-river-global-commerce' ); ?></a>
                </div>
                <a class="dr-btn dr-logout" href="#"><?php echo __( 'Logout', 'digital-river-global-commerce' ); ?></a>
            </section>

        <?php else : ?>

            <?php if ( ( $_GET['action'] ?? '' ) === 'rp' && isset( $_GET['key'] ) ) : ?>

                <section class="dr-login-sections__section reset-password">
                    <div>
                        <h2><?php echo __( 'New password', 'digital-river-global-commerce' ); ?></h2>
                        <p><?php echo __( 'Please enter secure password twice to continue', 'digital-river-global-commerce' ); ?></p>
                    </div>
                    <form class="dr-confirm-password-reset-form needs-validation" id="dr-confirm-password-reset-form" novalidate>
                        <div class="form-group">
                            <input class="form-control" name="password" type="password" placeholder="<?php _e( 'New Password', 'digital-river-global-commerce' ) ?>" required autocomplete="off">
                            <div class="invalid-feedback"><?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?></div>
                        </div>
                        <div class="form-group">
                            <input class="form-control" name="confirm-password" type="password" placeholder="<?php _e( 'Confirm New Password', 'digital-river-global-commerce' ) ?>" required autocomplete="off">
                            <div class="invalid-feedback"><?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?></div>
                        </div>
                        <button type="submit" class="dr-btn"><?php echo __( 'Reset Password', 'digital-river-global-commerce' ); ?></button>
                        <div class="dr-form-error-msg"></div>
                    </form>
                </section>

            <?php else : ?>

                <section class="dr-login-sections__section section-returning">
                    <div>
                        <h2><?php echo __( 'Returning Customer', 'digital-river-global-commerce' ); ?></h2>
                        <p><?php echo __( 'If you have an existing account, please sign in.', 'digital-river-global-commerce' ); ?></p>
                    </div>
                    <form id="dr_login_form" class="dr-login-form needs-validation" novalidate>

                        <?php do_action( 'drgc_login_form_start' ); ?>

                        <div class="form-group">
                            <input class="form-control" name="username" type="email" placeholder="<?php _e( 'Email Address', 'digital-river-global-commerce' ) ?>" required>
                            <div class="invalid-feedback"><?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?></div>
                        </div>
                        <div class="form-group">
                            <input class="form-control" name="password" type="password" placeholder="<?php _e( 'Password', 'digital-river-global-commerce' ) ?>" required autocomplete="off">
                            <div class="invalid-feedback"><?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?></div>
                        </div>

                        <?php do_action( 'drgc_login_form' ); ?>

                        <button type="submit" id="dr-auth-submit" class="dr-btn"><?php echo __( 'Login', 'digital-river-global-commerce' ); ?></button>
                        <div class="dr-form-error-msg"></div>

                        <?php do_action( 'drgc_login_form_end' ); ?>

                    </form>
                    <div>
                        <a class="forgotten-password" href="#" data-toggle="modal" data-target="#drResetPassword"><?php echo __( 'Forgot password?', 'digital-river-global-commerce' ); ?></a>
                    </div>
                </section>

            <?php endif; ?>

            <section class="dr-login-sections__section section-new">
                <div>
                    <h2><?php echo __( 'NEW CUSTOMER', 'digital-river-global-commerce' ); ?></h2>
                    <p><?php echo __( 'You can checkout as a guest or become a member for faster checkout and great offers.', 'digital-river-global-commerce' ); ?></p>
                </div>
                <form class="dr-signup-form needs-validation" id="dr-signup-form" novalidate>

                    <?php do_action( 'drgc_signup_form_start' ); ?>

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <input class="form-control" name="first_name" type="text" placeholder="<?php _e( 'First Name', 'digital-river-global-commerce' ) ?>" required>
                                <div class="invalid-feedback"><?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?></div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <input class="form-control" name="last_name" type="text" placeholder="<?php _e( 'Last Name', 'digital-river-global-commerce' ) ?>" required>
                                <div class="invalid-feedback"><?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input class="form-control" name="uemail" type="email" placeholder="<?php _e( 'Email Address', 'digital-river-global-commerce' ) ?>" required>
                        <div class="invalid-feedback"><?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?></div>
                    </div>
                    <div class="form-group">
                        <input class="form-control" name="upw" type="password" placeholder="<?php _e( 'Password', 'digital-river-global-commerce' ) ?>" required autocomplete="off">
                        <div class="invalid-feedback"><?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?></div>
                    </div>
                    <div class="form-group">
                        <input class="form-control" name="upw2" type="password" placeholder="<?php _e( 'Confirm Password', 'digital-river-global-commerce' ) ?>" required autocomplete="off">
                        <div class="invalid-feedback"><?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?></div>
                    </div>

                    <?php do_action( 'drgc_signup_form' ); ?>

                    <div>
                        <button type="submit" class="dr-btn dr-signup"><?php echo __( 'Sign Up', 'digital-river-global-commerce' ); ?></button>

                        <?php if ( ! $check_subs['has_subs'] ) : ?>

                            <a class="dr-btn" id="dr-guest-btn" href="#"><?php echo __( 'Continue As Guest', 'digital-river-global-commerce' ); ?></a>

                        <?php endif; ?>

                    </div>
                    <div class="dr-signin-form-error"></div>

                    <?php do_action( 'drgc_signup_form_end' ); ?>

                </form>
            </section>

	    <?php endif; ?>

    </div>
</div>
