<form class="change-password-form dr-panel-edit needs-validation" id="change-password-form" novalidate>

    <div class="required-text">
        <?php echo __( 'Fields marked with * are mandatory', 'digital-river-global-commerce' ); ?>
    </div>

    <div class="form-group dr-panel-edit__el">

        <div class="float-container float-container--pw-current">

            <label for="pw-current" class="float-label">

                <?php echo __( 'Current Password *', 'digital-river-global-commerce' ); ?>

            </label>

            <input id="pw-current" type="password" name="pw-current" class="form-control float-field float-field--pw-current" required>

            <div class="invalid-feedback">

                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

            </div>

        </div>

    </div>

    <div class="form-group dr-panel-edit__el">

        <div class="float-container float-container--pw-new">

            <label for="pw-new" class="float-label">

                <?php echo __( 'New Password *', 'digital-river-global-commerce' ); ?>

            </label>

            <input id="pw-new" type="password" name="pw-new" class="form-control float-field float-field--pw-new" required>

            <div class="invalid-feedback">

                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

            </div>

        </div>

    </div>

    <div class="form-group dr-panel-edit__el">

        <div class="float-container float-container--pw-confirm">

            <label for="pw-confirm" class="float-label">

                <?php echo __( 'Confirm New Password *', 'digital-river-global-commerce' ); ?>

            </label>

            <input id="pw-confirm" type="password"  name="pw-confirm" class="form-control float-field float-field--pw-confirm" required>

            <div class="invalid-feedback">

                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

            </div>

        </div>

    </div>

    
    <div class="dr-err-field"></div>

    <input type="submit" class="dr-btn dr-btn-green" value="<?php echo __( 'Change Password', 'digital-river-global-commerce' );?>">

</form>
