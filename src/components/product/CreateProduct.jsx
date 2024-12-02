import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { createProduct } from '../../services/ServicesProduct';
import { getCategories } from '../../services/ServicesCategory';

function CreateProduct(props) {
  const { onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
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
    const result = await createProduct(data);
    if (result) {
      alert("Tao thanh cong");
      closeModal();
      onReload();
    }
  }

  return (
    <>
      <div>
        <button onClick={openModal}>+ Them moi san pham</button>
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
                    <input type="text" name='title' required onChange={handleChange} />
                  </td>
                </tr>
                {dataCaterogy.length > 0 && (
                  <tr>
                    <td>Danh muc</td>
                    <td>
                      <select name='category' onChange={handleChange}>
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
                    <input type="text" name="price" required onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>Giam gia</td>
                  <td>
                    <input type="text" name="discountPercentage" required onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>So luong con lai</td>
                  <td>
                    <input type="text" name="stock" required onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>Duong dan anh</td>
                  <td>
                    <input type="text" name="thumbnail" required onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>Mo ta</td>
                  <td>
                    <textarea name="description" rows={4} onChange={handleChange} ></textarea>
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
      </div>
    </>
  )
}

export default CreateProduct;