<?php
/**
 * Provide a publidr-facing view for the plugin
 *
 * This file is used to markup the publidr-facing aspects of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/public/partials
 */
?>

<?php foreach ( $customer_address as $key => $address ): ?>

    <div class="col-12 col-lg-6 address-col">
        <address class="address" <?php if ($address['isDefault'] === 'true') echo 'data-primary="' . __( 'Primary', 'digital-river-global-commerce' ) . '"';?>>
            <div class="address-nickname">
                <span class="nickname"><?php echo $address['nickName']; ?></span>
            </div>

            <div class="address-name">
                <span class="firstName"><?php echo $address['firstName'] ?></span>
                <span class="lastName"><?php echo $address['lastName']; ?></span>
            </div>

            <div class="address-company">
                <span class="companyName"><?php echo $address['companyName']; ?></span>
            </div>

            <div class="address-location">
                <div class="line1"><?php echo $address['line1']; ?></div>
                <div class="line2"><?php echo $address['line2']; ?></div>
                <div>
                    <span class="city'"><?php echo $address['city']; ?></span>,
                    <span class="countrySubdivision"><?php echo $address['countrySubdivision']; ?></span>
                    <span class="postalCode"><?php echo $address['postalCode']; ?></span>
                </div>
                <div class="phoneNumber"><?php echo $address['phoneNumber']; ?></div>
            </div>
            <div class="address-edit" style="display:none;">
                
                <form class="dr-panel-edit">

                    <input type="hidden" name="id" value="<?php echo $address['id'] ?>">

                    <div class="required-text">
                        <?php echo __( 'Fields marked with * are mandatory', 'digital-river-global-commerce' ); ?>
                    </div>

                    <div class="form-group dr-panel-edit__el">

                        <div class="float-container float-container--nickname">

                            <label for="nickname-<?php echo $key ?>" class="float-label">

                                <?php echo __( 'Nickname *', 'digital-river-global-commerce' ); ?>

                            </label>

                            <input id="nickname-<?php echo $key ?>" type="text" value="<?php echo $address['nickName'] ?>" name="nickname" class="form-control float-field float-field--nickname" required>

                            <div class="invalid-feedback">

                                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

                            </div>

                        </div>

                    </div>

                    <div class="form-group dr-panel-edit__el">

                        <div class="float-container float-container--first-name">

                            <label for="first-name-<?php echo $key ?>" class="float-label">

                                <?php echo __( 'First Name *', 'digital-river-global-commerce' ); ?>

                            </label>

                            <input id="first-name-<?php echo $key ?>" type="text" value="<?php echo $address['firstName'] ?>" name="firstName" class="form-control float-field float-field--first-name" required>

                            <div class="invalid-feedback">

                                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

                            </div>

                        </div>

                    </div>

                    <div class="form-group dr-panel-edit__el">

                        <div class="float-container float-container--last-name">

                            <label for="last-name-<?php echo $key ?>" class="float-label">

                                <?php echo __( 'Last Name *', 'digital-river-global-commerce' ); ?>

                            </label>

                            <input id="last-name-<?php echo $key ?>" type="text" value="<?php echo $address['lastName'] ?>" name="lastName" class="form-control float-field float-field--last-name" required>

                            <div class="invalid-feedback">

                                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

                            </div>

                        </div>

                    </div>

                    <div class="form-group dr-panel-edit__el">

                        <div class="float-container float-container--company">

                            <label for="company-<?php echo $key ?>" class="float-label">

                                <?php echo __( 'Company Name', 'digital-river-global-commerce' ); ?>

                            </label>

                            <input id="company-<?php echo $key ?>" type="text" value="<?php echo $address['companyName'] ?>" name="companyName" class="form-control float-field float-field--company">

                            <div class="invalid-feedback">

                                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

                            </div>

                        </div>

                    </div>

                    <div class="form-group dr-panel-edit__el">

                        <div class="float-container float-container--address1">

                            <label for="address1-<?php echo $key ?>" class="float-label">

                                <?php echo __( 'Address line 1 *', 'digital-river-global-commerce' ); ?>

                            </label>

                            <input id="address1-<?php echo $key ?>" type="text" value="<?php echo $address['line1'] ?>" name="line1" class="form-control float-field float-field--address1" required>

                            <div class="invalid-feedback">

                                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

                            </div>

                        </div>

                    </div>

                    <div class="form-group dr-panel-edit__el">

                        <div class="float-container float-container--address2">

                            <label for="address2-<?php echo $key ?>" class="float-label">

                                <?php echo __( 'Address line 2', 'digital-river-global-commerce' ); ?>

                            </label>

                            <input id="address2-<?php echo $key ?>" type="text" name="line2" value="<?php echo $address['line2'] ?>" class="form-control float-field float-field--address2">
                        
                        </div>

                    </div>

                    <div class="form-group dr-panel-edit__el">

                        <div class="float-container float-container--city">

                            <label for="city-<?php echo $key ?>" class="float-label">

                                <?php echo __( 'City *', 'digital-river-global-commerce' ); ?>
                                
                            </label>

                            <input id="city-<?php echo $key ?>" type="text" name="city" value="<?php echo $address['city'] ?>" class="form-control float-field float-field--city" required>

                            <div class="invalid-feedback">

                                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

                            </div>
                        
                        </div>
                        
                    </div>

                    <div class="form-group dr-panel-edit__el">

                        <select class="form-control custom-select" name="country" id="country-<?php echo $key ?>">
                            <option value="">
                                <?php echo __( 'Select Country *', 'digital-river-global-commerce' ); ?>
                            </option>

                            <?php foreach ( $locales['locales'] as $locale => $currency ): ?>
                                <?php
                                    $country = drgc_code_to_counry($locale);
                                    $abrvCountyName = drgc_code_to_counry($locale, true);

                                    $output = "<option ";
                                    $output .= ($address['country'] === $abrvCountyName ? 'selected ' : '');
                                    $output .= "value=\"{$abrvCountyName}\">{$country}</option>";
                                    echo $output;
                                ?>
                            <?php endforeach; ?>
                        </select>

                        <div class="invalid-feedback">

                            <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

                        </div>

                    </div>


                    <div class="form-group dr-panel-edit__el">

                        <div class="float-container float-container--state active">
                            <label for="state-<?php echo $key ?>" class="float-label">

                                <?php echo __( 'State *', 'digital-river-global-commerce' ); ?>
                                
                            </label>

                            <select class="form-control custom-select" name="countrySubdivision" id="state-<?php echo $key ?>">

                                <option value="">
                                    <?php echo __( 'Select State *', 'digital-river-global-commerce' ); ?>
                                </option>

                                <option value="NA">
                                    <?php echo __( 'Not Applicable', 'digital-river-global-commerce' ); ?>
                                </option>

                                <?php foreach ($usa_states as $key2 => $state): ?>
                                    <?php 
                                        $option = "<option ";
                                        $option .= $address['countrySubdivision'] === $key2 ? 'selected ' : '';
                                        $option .= "value=\"{$key2}\">{$state}</option>";
                                        echo $option;
                                    ?>
                                <?php endforeach; ?>

                            </select>

                            <div class="invalid-feedback">

                                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

                            </div>

                        </div>

                    </div>

                    <div class="form-group dr-panel-edit__el">

                        <div class="float-container float-container--zip">

                            <label for="zip-<?php echo $key ?>" class="float-label">

                                <?php echo __( 'Zipcode *', 'digital-river-global-commerce' ); ?>

                            </label>

                            <input id="zip-<?php echo $key ?>" type="text" name="postalCode" value="<?php echo $address['postalCode'] ?>" class="form-control float-field float-field--zip" required>

                            <div class="invalid-feedback">

                                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

                            </div>

                        </div>
                        
                    </div>

                    <div class="form-group dr-panel-edit__el">

                        <div class="float-container float-container--phone">

                            <label for="phone-<?php echo $key ?>" class="float-label">

                                <?php echo __( 'Phone', 'digital-river-global-commerce' ); ?>

                            </label>
                            
                            <input id="phone-<?php echo $key ?>" type="text" name="phoneNumber" value="<?php echo $address['phoneNumber'] ?>" class="form-control float-field float-field--phone">
                        
                        </div>

                    </div>
                    
                    <div class="invalid-feedback dr-err-field" style="display: none"></div>

                    <div class="row address-buttons">
                    
                        <div class="col-sm-6">
                        
                            <input type="submit" class="dr-btn dr-btn-green address-save-btn" value="<?php echo __( 'Save', 'digital-river-global-commerce' );?>">

                        </div>
                        
                        <div class="col-sm-6">

                            <button type="button" class="dr-btn dr-btn-gray address-cancel-btn"><?php echo __( 'Cancel', 'digital-river-global-commerce' );?></button>
                        
                        </div>
                    
                    </div>

                </form>
                
            </div>
            <button class="address-edit-btn" role="img" aria-label="Edit Address" title="Edit Address"></button>
            <?php if ($address['isDefault'] !== 'true'): ?>
                <button class="address-delete-btn" role="img" aria-label="Delete Address" title="Delete Address" data-nickname="<?php echo $address['nickName']; ?>" data-id="<?php echo $address['id']; ?>"></button>
            <?php endif; ?>
        </address>

    </div>

<?php endforeach; ?>

<div class="col-12 col-lg-6 address-col">
    <div class="address address-add-new">
        <button class="address-add-btn" role="img" aria-label="Add New Address" title="Add New Address"></button>
        <div class="address-add-text"><span><?php echo __( 'Add New Address', 'digital-river-global-commerce' ); ?></span></div>
        <div class="address-edit" style="display:none;">
            <div class="address-add-title"><span><?php echo __( 'Add New Address', 'digital-river-global-commerce' ); ?></span></div>
            <form class="dr-panel-edit" id="dr-new-address-form">
                <div class="required-text">
                    <?php echo __( 'Fields marked with * are mandatory', 'digital-river-global-commerce' ); ?>
                </div>
                <div class="form-group dr-panel-edit__el">
                    <div class="float-container float-container--nickname">
                        <label for="nickname" class="float-label">
                            <?php echo __( 'Nickname *', 'digital-river-global-commerce' ); ?>
                        </label>
                        <input id="nickname" type="text" value="" name="nickname" class="form-control float-field float-field--nickname" required />
                        <div class="invalid-feedback">
                            <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>
                        </div>
                    </div>
                </div>
                <div class="form-group dr-panel-edit__el">
                    <div class="float-container float-container--first-name">
                        <label for="first-name" class="float-label">
                            <?php echo __( 'First Name *', 'digital-river-global-commerce' ); ?>
                        </label>
                        <input id="first-name" type="text" value="" name="firstName" class="form-control float-field float-field--first-name" required />
                        <div class="invalid-feedback">
                            <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>
                        </div>
                    </div>
                </div>
                <div class="form-group dr-panel-edit__el">
                    <div class="float-container float-container--last-name">
                        <label for="last-name" class="float-label">
                            <?php echo __( 'Last Name *', 'digital-river-global-commerce' ); ?>
                        </label>
                        <input id="last-name" type="text" value="" name="lastName" class="form-control float-field float-field--last-name" required />
                        <div class="invalid-feedback">
                            <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>
                        </div>
                    </div>
                </div>

                <div class="form-group dr-panel-edit__el">
                    <div class="float-container float-container--company">
                        <label for="company" class="float-label">
                            <?php echo __( 'Company Name', 'digital-river-global-commerce' ); ?>
                        </label>
                        <input id="company" type="text" value="" name="companyName" class="form-control float-field float-field--company" />
                        <div class="invalid-feedback">
                            <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>
                        </div>
                    </div>
                </div>
                <div class="form-group dr-panel-edit__el">
                    <div class="float-container float-container--address1">
                        <label for="address1" class="float-label">
                            <?php echo __( 'Address line 1 *', 'digital-river-global-commerce' ); ?>
                        </label>
                        <input id="address1" type="text" value="" name="line1" class="form-control float-field float-field--address1" required />
                        <div class="invalid-feedback">
                            <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>
                        </div>
                    </div>
                </div>
                <div class="form-group dr-panel-edit__el">
                    <div class="float-container float-container--address2">
                        <label for="address2" class="float-label">
                            <?php echo __( 'Address line 2', 'digital-river-global-commerce' ); ?>
                        </label>
                        <input id="address2" type="text" name="line2" value="" class="form-control float-field float-field--address2" />
                    </div>
                </div>

                <div class="form-group dr-panel-edit__el">
                    <div class="float-container float-container--city">
                        <label for="city" class="float-label">
                            <?php echo __( 'City *', 'digital-river-global-commerce' ); ?>
                        </label>
                        <input id="city" type="text" name="city" value="" class="form-control float-field float-field--city" required />
                        <div class="invalid-feedback">
                            <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>
                        </div>
                    </div>
                </div>
                <div class="form-group dr-panel-edit__el">
                    <select class="form-control custom-select" name="country" id="country">
                        <option value="">
                            <?php echo __( 'Select Country *', 'digital-river-global-commerce' ); ?>
                        </option>
                        <?php foreach ( $locales['locales'] as $locale => $currency ): ?>
                            <?php
                                $country = drgc_code_to_counry($locale);
                                $abrvCountyName = drgc_code_to_counry($locale, true);

                                $output = "<option ";
                                $output .= "value=\"{$abrvCountyName}\">{$country}</option>";
                                echo $output;
                            ?>
                        <?php endforeach; ?>
                    </select>
                    <div class="invalid-feedback">
                        <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>
                    </div>
                </div>
                <div class="form-group dr-panel-edit__el">
                    <div class="float-container float-container--state active">
                        <label for="state" class="float-label">
                            <?php echo __( 'State *', 'digital-river-global-commerce' ); ?>
                        </label>
                        <select class="form-control custom-select" name="countrySubdivision" id="state">
                            <option value="">
                                <?php echo __( 'Select State *', 'digital-river-global-commerce' ); ?>
                            </option>
                            <option value="NA">
                                <?php echo __( 'Not Applicable', 'digital-river-global-commerce' ); ?>
                            </option>
                            <?php foreach ($usa_states as $key2 => $state): ?>
                                <?php 
                                    $option = "<option ";
                                    $option .= "value=\"{$key2}\">{$state}</option>";
                                    echo $option;
                                ?>
                            <?php endforeach; ?>
                        </select>
                        <div class="invalid-feedback">
                            <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>
                        </div>
                    </div>
                </div>
                <div class="form-group dr-panel-edit__el">
                    <div class="float-container float-container--zip">
                        <label for="zip" class="float-label">
                            <?php echo __( 'Zipcode *', 'digital-river-global-commerce' ); ?>
                        </label>
                        <input id="zip" type="text" name="postalCode" value="" class="form-control float-field float-field--zip" required />
                        <div class="invalid-feedback">
                            <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>
                        </div>
                    </div>
                </div>
                <div class="form-group dr-panel-edit__el">
                    <div class="float-container float-container--phone">
                        <label for="phone" class="float-label">
                            <?php echo __( 'Phone', 'digital-river-global-commerce' ); ?>
                        </label>
                        <input id="phone" type="text" name="phoneNumber" value="" class="form-control float-field float-field--phone" />
                    </div>
                </div>
                <div class="invalid-feedback dr-err-field" style="display: none"></div>
                <div class="row address-buttons">
                    <div class="col-sm-6">
                        <input type="submit" class="dr-btn dr-btn-green address-save-btn" value="<?php echo __( 'Add', 'digital-river-global-commerce' );?>" />
                    </div>
                    <div class="col-sm-6">
                        <button type="button" class="dr-btn dr-btn-gray address-cancel-btn"><?php echo __( 'Cancel', 'digital-river-global-commerce' );?></button>
                    </div>
                </div>
            </form>        
        </div>
    </div>
</div>

<div id="dr-deleteAddressConfirm" class="dr-modal" tabindex="-1" role="dialog">
  <div class="dr-modal-dialog dr-modal-dialog-centered">
    <div class="dr-modal-content">
      <div class="dr-modal-body">
        <p><?php echo __( 'Are you sure you want to delete <strong>nickname</strong> from your address book?', 'digital-river-global-commerce' ); ?></p>
      </div>
      <div class="dr-modal-footer">
        <button type="button" class="dr-btn dr-btn-blue dr-delete-confirm" data-dismiss="dr-modal"><?php echo __( 'Delete', 'digital-river-global-commerce' ); ?></button>
        <button type="button" class="dr-btn dr-btn-black dr-delete-cancel" data-dismiss="dr-modal"><?php echo __( 'Cancel', 'digital-river-global-commerce' ); ?></button>
      </div>
    </div>
  </div>
</div>
