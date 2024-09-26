import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from './redux/slices/productsSlice';

function ModalProduct(props) {
    const dispatch = useDispatch()

    const defaultProduct = {
        id: null,
        name: '',
        description: '',
        price: null,
        quantity: null
    }
    const [product, setProduct] = useState(defaultProduct)

    useEffect(() => {
        props.type === 'UPDATE' && setProduct(props.data)        
    }, [props.show])

    const handleActionsProduct = () => {
        const { name, description, price, quantity } = product

        if (!name || !description || !price || !quantity) {
            return
        }

        if (props.type === 'CREATE') {
            product.id = uuidv4()
            dispatch(addProduct(product))
        } else {
            dispatch(updateProduct(product))
        }
        setProduct(defaultProduct)
        props.handleClose()
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.type === 'CREATE' ? 'Thêm sản phẩm' : 'Chỉnh sửa sản phẩm'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='row'>
                        <Form.Group className="mb-3 col-12">
                            <Form.Label>
                               Tên sản phẩm
                            </Form.Label>
                            <Form.Control
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                value={product.name || ''}
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 col-12">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                value={product.description || ''}
                                type="text"
                                as="textarea" rows={3} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 col-6">
                            <Form.Label>Giá sản phẩm</Form.Label>
                            <Form.Control
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                value={product.price || ''}
                                type="number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 col-6">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control
                                onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                                value={product.quantity || ''}
                                type="number"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Huỷ
                    </Button>
                    <Button variant="primary" onClick={() => handleActionsProduct()}>
                        {props.type === 'CREATE' ? 'Thêm' : 'Cập nhật'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalProduct;