import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteOrderProduct } from './redux/slices/orderedProductSlice';
import { formatter } from '../App';

function ModalOrderedProduct(props) {
    const orderedProduct = useSelector(state => state.orderedProduct)
    const dispatch = useDispatch()

    const handleDeleteOrderProduct = (id) => {
        dispatch(deleteOrderProduct(id))
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Sản phẩm đã mua</Modal.Title>
                </Modal.Header>
                <Modal.Body className='px-5'>
                    {orderedProduct && orderedProduct.length > 0 && orderedProduct.map((product, index) => (
                        <Alert variant='light' className='row' key={index}>
                            <span className='col-5'>{product.name} - {product.id}</span>
                            <span className='col-2'>Giá: {formatter.format(product.price)}</span>
                            <span className='col-2'>Số lượng: {product.quantity}</span>
                            <span className='col-2'>
                                Tổng tiền: {formatter.format(product.quantity * product.price)}
                            </span>
                            <Button
                                onClick={() => handleDeleteOrderProduct(product.id)}
                            className='col-1' variant='danger'>Xoá</Button>
                        </Alert>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalOrderedProduct;