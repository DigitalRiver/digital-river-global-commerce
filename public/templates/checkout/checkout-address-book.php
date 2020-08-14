<?php
$no_default = 'true';
?>
<div class="overflowContainer">

    <?php if ( count( $addresses ) > 0 ) : ?>

        <div class="container-fluid">

            <div class="row addresses">

                <?php foreach ( $addresses as $key => $address ): ?>

                    <?php
                        if ( $address['isDefault'] === 'true' ) {
                            $no_default = 'false';
                        }
                    ?>
                    <div class="col-12 col-lg-6 address-col">

                        <address class="address" 
                            data-is-default="<?php echo $address['isDefault'] ?>" 
                            data-first-name="<?php echo $address['firstName'] ?>" 
                            data-last-name="<?php echo $address['lastName']; ?>" 
                            data-company-name="<?php echo $address['companyName']; ?>" 
                            data-line-one="<?php echo $address['line1']; ?>" 
                            data-line-two="<?php echo $address['line2']; ?>" 
                            data-city="<?php echo $address['city']; ?>" 
                            data-state="<?php echo $address['countrySubdivision']; ?>" 
                            data-postal-code="<?php echo $address['postalCode']; ?>" 
                            data-country="<?php echo $address['country']; ?>" 
                            data-phone-number="<?php echo $address['phoneNumber']; ?>"
                        >

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
                                    
                                    <span class="postalCode"><?php echo $address['postalCode']; ?></span>,

                                    <span class="country"><?php echo $address['country']; ?></span>
                                
                                </div>
                                
                                <div class="phoneNumber"><?php echo $address['phoneNumber']; ?></div>
                            
                            </div>
                        
                        </address>
                    
                    </div>
                
                <?php endforeach; ?>
            
            </div>
        
        </div>
    
    <?php else: ?>
        
        <?php echo __( 'You have no saved addresses.', 'digital-river-global-commerce' ); ?>
    
    <?php endif; ?>

</div>
