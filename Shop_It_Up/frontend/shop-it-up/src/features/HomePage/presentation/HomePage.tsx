import "./HomePage.css";
import ProductsGrid from '../../Products/Presentation/ProductsGrid';
import NavBar from "../../NavBar/Presentation/nav_bar";
import LoginPage from "../../LoginPage/presentation/LoginPage";
import ProductsCreate from '../../Products/Presentation/ProductsCreate'

import { useState } from 'react';


const HomePage = () => {
    const [query, setQuery] = useState("");
    const [filtPrice1, setFiltPrice1] = useState(0);
    const [filtPrice2, setFiltPrice2] = useState(0);

    const handleFilterButtonClick = (val1:number, val2:number) => {
        setFiltPrice1(val1);
        setFiltPrice2(val2);
        console.log("val1:",filtPrice1);
        console.log("val2", filtPrice2)
    }

    return (
        <div>
            {/* <LoginPage/> */}
            <NavBar onQuery={setQuery} handleFilterButtonClick={handleFilterButtonClick}/>
            <ProductsGrid query={query} filtPrice1={filtPrice1} filtPrice2={filtPrice2}/>

        </div>

                

    );
}

export default HomePage;