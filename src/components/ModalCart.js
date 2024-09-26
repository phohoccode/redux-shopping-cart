import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, deleteProductToCart, updateProducToCart } from './redux/slices/cartSlice';
import { updateQuantityProduct } from './redux/slices/productsSlice';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { productPayment } from './redux/slices/orderedProductSlice';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import { formatter } from '../App';

function ModalCart(props) {
    const cart = useSelector(state => state.cart)
    const products = useSelector(state => state.products)
    const [totalPayment, setTotalPayment] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        setTotalPayment(() =>
            cart.reduce((acc, cur) => acc + Number(cur.price * cur.quantity), 0))
    }, [cart])

    const handleDeleteProductFromCart = (product) => {
        dispatch(deleteProductToCart(product))
    }

    const handleChangeQuantity = (product, type) => {
        dispatch(changeQuantity({
            ...product, type
        }))
    }

    const checkInventoryProduct = () => {
        let checkTooQuantity = false
        for (let i = 0; i < products.length; i++) {
            const isOverQuantity = cart.some(productCart =>
                products[i].id === productCart.id && products[i].quantity < productCart.quantity
            );

            if (isOverQuantity) {
                alert(`${products[i].name} chỉ còn ${products[i].quantity} sản phẩm!`);
                checkTooQuantity = true
                break;
            }
        }

        return checkTooQuantity
    }

    const handleProductPayment = () => {
        const isCheck = checkInventoryProduct()

        if (!isCheck) {
            const _cart = _.cloneDeep(cart)
            const data = _cart.filter(product => {
                if (product.quantity > 0) {
                    return { ...product, id: uuidv4() }
                }
            })

            if (data.length === 0) {
                alert('Số lượng sản phẩm phải lớn hơn 0!')
                return
            }

            dispatch(productPayment(data))
            dispatch(updateQuantityProduct(data))
            dispatch(updateProducToCart(data))
            props.handleClose()
            alert('Thanh toán sản phẩm thành công!')
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Giỏ hàng của bạn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cart.length > 0 ?
                        <>
                            <div className='row'>
                                <span className='col-5'>Tên sản phẩm</span>
                                <span className='col-2'>Đơn giá</span>
                                <span className='col-2'>Số lượng</span>
                                <span className='col-2'>Thành tiền</span>
                                <span className='col-1'>Thao tác</span>
                            </div>
                        </> :
                        <span className='text-center'>Chưa có sản phẩm nào!</span>
                    }

                    <div className='mt-3'>
                        {cart && cart.length > 0 && cart.map(product => (
                            <div className='mb-3 row' key={product.id}>
                                <span className='col-5'>{product.name}</span>
                                <span className='col-2'>{formatter.format(product.price)}</span>
                                <div className='col-2'>
                                    <ButtonGroup>
                                        <Button onClick={() => handleChangeQuantity(product, 'decrease')} variant='light'>-</Button>
                                        <Form.Control
                                            size="sm"
                                            type="number"
                                            value={product.quantity}
                                            onChange={() => handleChangeQuantity(product)}
                                        />
                                        <Button onClick={() => handleChangeQuantity(product, 'INCREASE')} variant='light'>+</Button>
                                    </ButtonGroup>
                                </div>
                                <span className='col-2'>
                                    {formatter.format(product.quantity * product.price)}
                                </span>
                                <button
                                    onClick={() =>
                                        handleDeleteProductFromCart(product)}
                                    className='col-1 btn btn-danger'>Xoá</button>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <span>Tổng thanh toán: {formatter.format(totalPayment)}</span>
                    </div>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleProductPayment()}>
                        Thanh toán
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCart;