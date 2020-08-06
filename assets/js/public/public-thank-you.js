import CheckoutUtils from './checkout-utils';

const ThankYouModule = (($) => {
})(jQuery);

jQuery(document).ready(($) => {
    if ($('.dr-thank-you-wrapper:visible').length) {
        if (drgc_params.order && drgc_params.order.order) {
          CheckoutUtils.updateSummaryPricing(drgc_params.order.order, drgc_params.isTaxInclusive === 'true');
        }

        $(document).on('click', '#print-button', function() {
            window.print();
        });

        const digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey);
        CheckoutUtils.applyLegalLinks(digitalriverjs);

        $(document).on('click', '#my-subs-btn', () => {
            window.location.href = drgc_params.mySubsUrl;
        });
    }
});

export default ThankYouModule;
