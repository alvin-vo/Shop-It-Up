import "./HomePage.css";
import ProductsGrid from '../../Products/Presentation/ProductsGrid';
import Navbar from '../../NavBar/Presentation/Navbar'
import LoginPage from "../../LoginPage/presentation/LoginPage";

const HomePage = () => {
    return (
        <div>
            <LoginPage/>
            <Navbar/>
                <ProductsGrid/>
        </div>


    );
}

export default HomePage;