export function generatePrice(product) {
    if (product.discount_type) {
        return product.price - product.discount_price
    }

    return product.price
}

export function generatePriceFromCart(cart) {
    if (cart.discount_percentage) {
        return Math.ceil(cart.unit_price - (cart.discount_percentage / 100) * cart.unit_price)
    }

    return cart.unit_price
}

export function generatePricePromotion(product, qty) {
    if (product.promotions.length > 0) {
        const quantity = qty;
        let promoValue = 0;
        for (let i = 0; i < product.promotions.length; i++) {
            const percentagePromo = parseInt(product.promotions[i].percentage);
            if (quantity >= product.promotions[i].qty_min && quantity <= product.promotions[i].qty_max) {
                promoValue = product.promotions[i].percentage;
            }
        }
        return promoValue;
    }

    return 0;
}
