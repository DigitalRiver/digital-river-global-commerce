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
 * @subpackage Digital_River_Global_Commerce/public/templates
 */
?>

<?php get_header(); ?>

<div class="main-content" id="main">

    <div class="container">

        <div class="row">

            <div class="col">
                <hr>
                <?php if ( have_posts() ) :
                    while ( have_posts() ) :
                        the_post();
                        drgc_get_template_part( 'content', 'single' );
                    endwhile;
                    else :
                        drgc_get_template_part( 'content', 'none' );
                    endif;
                ?>
            </div>

        </div>

    </div>

</div>

<?php get_footer(); ?>
