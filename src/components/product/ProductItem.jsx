import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
import "./style.scss"

function ProductItem(props) {
  const { item, onReload } = props;
  return (
    <>
      <div className="product__item">
        <div className="product__image">
          <img src={item.thumbnail} alt={item.title} />
        </div>
        <div className="product__content">
          <div className="product__title">
            {item.title}
          </div>
          <div className="product__price">
            {item.price}$
          </div>
          <div className="product__discountPercentage">
            {item.discountPercentage}%
          </div>
          <EditProduct item={item} onReload={onReload} />
          <DeleteProduct item={item} onReload={onReload} />
        </div>
      </div>
    </>
  )
}

export default ProductItem;