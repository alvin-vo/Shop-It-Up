import "./HomePage.css";
import ProductsGrid from '../../Products/Presentation/ProductsGrid';
import Navbar from '../../NavBar/Presentation/Navbar'

const HomePage = () => {
    return (
        <div>
            <Navbar/>
                <ProductsGrid/>
        </div>


    );
}

export default HomePage;