import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ModalCart from './ModalCart';
import ModalProduct from './ModalProduct';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ModalOrderedProduct from './ModalOrderedProduct';

function Header() {
    const cart = useSelector(state => state.cart)
    const orderedProduct = useSelector(state => state.orderedProduct)
    const [showModalProducts, setShowModalProducts] = useState(false)
    const [showModalCart, setShowModalCart] = useState(false)
    const [showModalOrder, setShowModalOrder] = useState(false)

    const handleCloseModalCart = () => {
        setShowModalCart(false)
    }

    const handleCloseModalProducts = () => {
        setShowModalProducts(false)
    }

    const handleCloseModalOrder = () => {
        setShowModalOrder(false)
    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Shopping Cart</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => setShowModalProducts(true)}>Thêm sản phẩm</Nav.Link>
                        <Nav.Link onClick={() => setShowModalCart(true)}>Giỏ hàng ({cart.length})</Nav.Link>
                        <Nav.Link onClick={() => setShowModalOrder(true)}>Sản phẩm đã mua ({orderedProduct.length})</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <ModalProduct
                show={showModalProducts}
                handleClose={handleCloseModalProducts}
                type='CREATE'
            />
            <ModalCart
                show={showModalCart}
                handleClose={handleCloseModalCart}
            />

            <ModalOrderedProduct
                show={showModalOrder}
                handleClose={handleCloseModalOrder}
            />
        </>
    );
}

export default Header;