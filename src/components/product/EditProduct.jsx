import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getCategories } from '../../services/ServicesCategory';
import { editProduct } from '../../services/ServicesProduct';
function EditProduct(props) {
  const { item, onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(item);
  const [dataCaterogy, setDataCategory] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCategories();
      if (result) {
        setDataCategory(result);
      }
    }
    fetchApi();
  }, []);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await editProduct(item.id, data);
    if(result) {
      alert("Cap nhat thanh cong");
      closeModal();
      onReload();
    }
  }

  return (
    <>
      <button onClick={openModal}>Chinh sua</button>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  Tieu de
                </td>
                <td>
                  <input type="text" name='title' value={data.title} required onChange={handleChange} />
                </td>
              </tr>
              {dataCaterogy.length > 0 && (
                <tr>
                  <td>Danh muc</td>
                  <td>
                    <select name='category' onChange={handleChange} value={data.category}>
                      {dataCaterogy.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              )}
              <tr>
                <td>Gia</td>
                <td>
                  <input type="text" name="price" required onChange={handleChange} value={data.price} />
                </td>
              </tr>
              <tr>
                <td>Giam gia</td>
                <td>
                  <input type="text" name="discountPercentage" required onChange={handleChange} value={data.discountPercentage} />
                </td>
              </tr>
              <tr>
                <td>So luong con lai</td>
                <td>
                  <input type="text" name="stock" required onChange={handleChange} value={data.stock} />
                </td>
              </tr>
              <tr>
                <td>Duong dan anh</td>
                <td>
                  <input type="text" name="thumbnail" required onChange={handleChange} value={data.thumbnail} />
                </td>
              </tr>
              <tr>
                <td>Mo ta</td>
                <td>
                  <textarea name="description" rows={4} onChange={handleChange} value={data.description}></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="submit" value="Tao moi" />
                </td>
                <td>
                  <button onClick={closeModal}>Huy</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  )
}

export default EditProduct;