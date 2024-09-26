import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import ModalEnterQuantity from './ModalEnterQuantity';
import Dropdown from 'react-bootstrap/Dropdown';
import { deleteProduct } from './redux/slices/productsSlice';
import { useEffect, useState } from 'react';
import ModalProduct from './ModalProduct';
import { formatter } from '../App';
import Placeholder from 'react-bootstrap/Placeholder';

function Products() {
    const dispatch = useDispatch()
    const productsList = useSelector(state => state.products);
    const [product, setProduct] = useState({})
    const [productEdit, setProductEdit] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [showModalProduct, setShowModalProduct] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    const handleAddProductToCart = (product) => {
        setProduct(product)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleCloseModalProduct = () => {
        setShowModalProduct(false)
    }

    const handleUpdateProduct = (product, type) => {
        setProductEdit(product)
        setShowModalProduct(true)
    }


    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    {productsList && productsList.length > 0 && productsList.map(product => (
                        <div className='col col-3 mb-4' key={product.id}>
                            {!isLoading ?
                                <>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >{product.name}</Card.Title>
                                            <Card.Text
                                                style={{
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 10,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >{product.description}</Card.Text>
                                            <div className='d-flex justify-content-between'>
                                                <span>Giá: {formatter.format(product.price)}</span>
                                                <span>
                                                    {product.quantity === 0 ? 'Đã bán hết' : `Số lượng: ${product.quantity}`}
                                                </span>
                                            </div>
                                        </Card.Body>
                                        <Card.Body className='d-flex justify-content-between'>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                    Tuỳ chọn
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        onClick={() => dispatch(deleteProduct(product.id))}>
                                                        Xoá
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        onClick={() => handleUpdateProduct(product, 'UPDATE')}
                                                    >Sửa</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Button
                                                onClick={() => handleAddProductToCart(product)}
                                                variant='success'>Thêm vào giỏ hàng</Button>
                                        </Card.Body>
                                    </Card>
                                </> :
                                <>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Placeholder as={Card.Title} animation="glow">
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                                <Placeholder xs={6} /> <Placeholder xs={8} />
                                            </Placeholder>
                                            <div className='d-flex justify-content-between'>
                                                <Placeholder.Button variant="secondary" xs={5} />
                                                <Placeholder.Button variant="success" xs={6} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <ModalEnterQuantity
                show={showModal}
                handleClose={handleCloseModal}
                data={product}
            />

            <ModalProduct
                show={showModalProduct}
                handleClose={handleCloseModalProduct}
                data={productEdit}
                type='UPDATE'
            />
        </>
    );
}

export default Products;