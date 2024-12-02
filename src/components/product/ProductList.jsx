import { useState, useEffect } from "react";
import { get } from "../../utils";
import ProductItem from "./ProductItem";
import "./style.scss"
function ProductList(props) {
  const { reload } = props;
  const [data, setData] = useState([]);
  const [editReload, setEditReload] = useState(false);
  const handleEditReload = () => {
    setEditReload(!editReload);
  }
  useEffect(() => {
    const fetchApi = async () => {
      const result = await get("products");
      if(result) {
        setData(result.products);
      }
    }
    fetchApi();
  }, [reload, editReload]);

  return (
    <>
      <div className="product__list">
        {data.length > 0 && (
          data.map(item => (
            <ProductItem key={item.id} item={item} onReload={handleEditReload}/>
          ))
        )}
      </div>
    </>
  )
}

export default ProductList;