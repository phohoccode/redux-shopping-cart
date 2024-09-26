import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from './redux/slices/cartSlice';
import { updateQuantityProduct } from './redux/slices/productsSlice';

function ModalEnterQuantity(props) {
    const [quantityProduct, setQuantityProduct] = useState(null)
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        setProduct({
            id: props.data.id,
            name: props.data.name,
            description: props.data.description,
            price: props.data.price
        })
    }, [props.data])

    const confirmAddNewProductToCart = () => {
        if (quantityProduct <= 0 || quantityProduct > +props.data.quantity) {
            alert('Số lượng phải lớn hơn 0 hoặc nhỏ hơn số lượng tồn kho!')
            return
        }
        const data = { ...product, quantity: quantityProduct}

        dispatch(addProductToCart(data))
        setQuantityProduct(null)
        props.handleClose()
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nhập số lượng cần thêm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 col-12">
                            <Form.Control
                                value={quantityProduct || ''}
                                type="number"
                                onChange={(e) => setQuantityProduct(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Huỷ
                    </Button>
                    <Button variant="primary" onClick={() => confirmAddNewProductToCart()}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEnterQuantity;