<div class="dr-checkout__el dr-checkout__email active">

    <div class="dr-accordion">

        <span class="dr-accordion__name">

            <?php echo isset( $steps_titles['email'] ) ? $steps_titles['email'] : ''; ?>

        </span>

        <?php if ($customerEmail == '') { ?>
            <span class="dr-accordion__edit"><?php echo __( 'Edit', 'digital-river-global-commerce' ); ?>></span>
        <?php } ?>

    </div>

    <form id="checkout-email-form" class="dr-panel-edit dr-panel-edit--email needs-validation" novalidate>

        <div class="form-group">

            <input type="email" name="email" value="<?php echo $customerEmail ?>" class="form-control dr-panel-edit__el" placeholder="<?php echo __( 'Please enter your email address', 'digital-river-global-commerce' ); ?>" required>

            <div class="invalid-feedback">

		        <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

            </div>

        </div>


        <button type="submit" class="dr-panel-edit__btn dr-btn" disabled="disabled">

            <?php echo __( 'Save and continue', 'digital-river-global-commerce' ); ?>

        </button>

    </form>

    <div class="dr-panel-result">


        <p id="dr-panel-email-result" class="dr-panel-result__text"></p>


    </div>

</div>
