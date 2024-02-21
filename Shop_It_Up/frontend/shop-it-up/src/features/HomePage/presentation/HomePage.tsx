import "./HomePage.css";
import ProductsGrid from '../../Products/Presentation/ProductsGrid';
import Navbar from '../../NavBar/Presentation/Navbar'
import LoginPage from "../../LoginPage/presentation/LoginPage";
import ProductsCreate from "../../Products/Presentation/ProductsCreate";

const HomePage = () => {
    return (
        <div>
            <ProductsCreate/>
            <ProductsGrid />
        </div>


    );
}

export default HomePage;