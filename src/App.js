import Header from "./components/Header";
import Products from "./components/Products";

export const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function App() {
    return (
        <div>
            <Header />
            <Products />
        </div>
    );
}

export default App;
