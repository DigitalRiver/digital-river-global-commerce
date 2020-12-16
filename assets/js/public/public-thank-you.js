import CheckoutUtils from './checkout-utils';

const ThankYouModule = (($) => {
})(jQuery);

jQuery(document).ready(($) => {
    if ($('.dr-thank-you-wrapper:visible').length) {
        const localizedText = drgc_params.translations;

        $(document).on('click', '#print-button', function() {
            window.print();
        });

        $(document).on('click', '#my-subs-btn', () => {
            window.location.href = drgc_params.mySubsUrl;
        });

        const digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey);
        CheckoutUtils.applyLegalLinks(digitalriverjs);

        if (drgc_params.order && drgc_params.order.order) {
            CheckoutUtils.updateSummaryPricing(drgc_params.order.order, drgc_params.isTaxInclusive === 'true');
        }

        if ($('#dr-order-vat-info').length && sessionStorage.getItem('drgcTaxRegs')) {
            const taxRegs = JSON.parse(sessionStorage.getItem('drgcTaxRegs'));
            const shopperType = (taxRegs.customerType === 'B') ? localizedText.business_shopper_type : localizedText.personal_shopper_type;
            const taxIds = taxRegs.taxRegistrations;
            let vatInfoHtml = '';

            taxIds.forEach((element) => {
                vatInfoHtml = `${vatInfoHtml}<p>${element.value}</p>`;
            });

            vatInfoHtml = `<p>${shopperType}</p>${vatInfoHtml}`;
            $('#dr-order-vat-info').append(vatInfoHtml);

            sessionStorage.removeItem('drgcTaxRegs');
        }

        if (sessionStorage.getItem('drgcTaxExempt')) sessionStorage.removeItem('drgcTaxExempt');
        if (sessionStorage.getItem('drgcPaymentSource')) sessionStorage.removeItem('drgcPaymentSource');
        if (sessionStorage.getItem('drgc_upsell_decline')) sessionStorage.removeItem('drgc_upsell_decline');
    }
});

export default ThankYouModule;
