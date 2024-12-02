import { deleteProduct } from "../../services/ServicesProduct";

function DeleteProduct(props) {
  const { item, onReload } = props;
  const handleClick = async () => {
    const check = window.confirm("Ban co chan muon xoa khong");
    if (check) {
      const result = await deleteProduct(item.id);
      if (result) {
        window.alert("Xoa thanh cong");
        onReload();
      }
    }

  }
  return (
    <>
      <button onClick={handleClick}>
        Xoa
      </button>
    </>
  )
}

export default DeleteProduct;