import "./HomePage.css";
import ProductsGrid from '../../Products/Presentation/ProductsGrid';
import NavBar from "../../NavBar/Presentation/nav_bar";
import LoginPage from "../../LoginPage/presentation/LoginPage";
import ProductsCreate from '../../Products/Presentation/ProductsCreate'

import { useState } from 'react';

// import SearchBar from "../../NavBar/Presentation/search_bar";

const HomePage = () => {
    const [query, setQuery] = useState("");
    return (
        <div>
            {/* <LoginPage/> */}
            <NavBar onQuery={setQuery}/>
            {/* <SearchBar/> */}
            { <ProductsGrid query={query}/>}

        </div>

    );
}

export default HomePage;