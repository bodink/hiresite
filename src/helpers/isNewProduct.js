
export const isNewProduct = product => {
    if (!product) return false;

    const date_productCreatedAt = new Date(product.created_at);
    const today = new Date();
    const timeDiff = Math.abs(today.getTime() - date_productCreatedAt.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays <= 7) return true;
    else return false; 
}