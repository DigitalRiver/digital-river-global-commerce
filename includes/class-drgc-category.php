<?php
/**
 * Category class
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes/shortcodes
 */

class DRGC_Category {

	/**
	 * @var mixed
	 */
	public $term_id;

	/**
	 * string
	 */
	public $taxonomy = 'dr_product_category';

	/**
	 * Initialize the class
	 *
	 * @param mixed $term
	 */
	public function __construct( $term = 0, $parent_term_name = 0 ) {
		if ( is_numeric( $term ) && $term > 0 || is_string( $term ) ) {
			$this->term_id = $term;
		} elseif ( $term instanceof self ) {
			$this->term_id = $term->term_id;
		}
		$this->slug = is_string( $this->term_id ) ? sanitize_title( $this->term_id ) : $this->term_id;
		$this->parent_term_name = $parent_term_name;
	}

	/**
	 * Return all taxonomy terms
	 *
	 * @return array|int|WP_Error
	 */
	public function get_terms() {
		return get_terms( array(
			'taxonomy' => $this->taxonomy,
			'hide_empty' => false,
		) );
	}

	/**
	 * Return the current term
	 *
	 * @return array|false|WP_Term
	 */
	public function term_exist() {
		return get_term_by(
			is_numeric( $this->term_id ) ? 'id' : 'slug',
			$this->term_id,
			$this->taxonomy
		);
	}

	/**
	 * Return numeric term ID
	 *
	 * @return int $term_id
	 */
	public function get_numeric_term_id() {
		$term = get_term_by(
			is_numeric( $this->term_id ) ? 'id' : 'slug',
			$this->term_id,
			$this->taxonomy
		);
		return $term->term_id;
	}

	/**
	 * Insert the term or return it if exists
	 */
	public function save() {
		$term_exist = $this->term_exist();
		$parent_term_id = 0;

		if ( $this->parent_term_name ) {
			$parent_term = term_exists( $this->parent_term_name, $this->taxonomy );
			$parent_term_id = $parent_term['term_id'];
		}

		if ( ! $term_exist ) {
			$term = wp_insert_term(
				$this->term_id,
				$this->taxonomy,
				array(
					'slug' => $this->slug,
					'parent' => $parent_term_id
				)
			);

			if ( ! is_wp_error( $term ) ) {
				$this->term_id = $term['term_id'];
			}
		} else {
			$this->term_id = $term_exist->term_id;
		}
	}
}
