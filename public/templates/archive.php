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

<div class="main-content" id="main" role="main">

  <a id="floating-cart">

    <span class="dr-minicart-count qty">0</span>

  </a>

  <div id="sticky-mini-cart"></div>

  <div class="container">

    <div class="row">

      <div class="col-md-12">

        <?php if ( have_posts() ) : ?>
          <section class="page-header">
            <?php
              the_archive_title( '<h1 class="page-title">', '</h1>' );
              the_archive_description( '<div class="page-description">', '</div>' );
            ?>
          </section>
        <?php endif; ?>

      </div><!-- .col -->

    </div><!-- .row -->

    <div class="row">

      <?php if ( have_posts() ): ?>
        <?php while ( have_posts() ): ?>
          <div class="col-md-4">
            <?php the_post(); ?>
            <?php drgc_get_template_part( 'content', 'archive' );  ?>
          </div>
        <?php endwhile; ?>
        <div class="col-md-12">
          <?php drgc_the_posts_pagination( $wp_query ); ?>
        </div>
      <?php else: ?>
        <?php drgc_get_template_part( 'content', 'none' ); ?>
      <?php endif; ?>

    </div><!-- .row -->

  </div><!-- .container -->

</div>

<?php get_footer(); ?>
