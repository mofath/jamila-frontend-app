import "./PriceTag.css";

interface PriceTagProps {
  price: {
    price: number | string;
    priceAfterDiscount?: number | string;
  };
}

const PriceTag: React.FC<PriceTagProps> = ({ price }) => {
  const originalPrice = Number(price.price);
  const discountedPrice =
    price.priceAfterDiscount !== undefined
      ? Number(price.priceAfterDiscount)
      : undefined;

  const hasDiscount =
    typeof discountedPrice === "number" && discountedPrice < originalPrice;

  return (
    <div className="price-tag">
      {hasDiscount ? (
        <>
          <span className="price-tag__original-price heading-4">
            ${originalPrice}
          </span>
          <span className="price-tag__actual-price heading-4">
            ${discountedPrice!}
          </span>
        </>
      ) : (
        <span className="price-tag__actual-price heading-4">
          ${originalPrice}
        </span>
      )}
    </div>
  );
};

export default PriceTag;
