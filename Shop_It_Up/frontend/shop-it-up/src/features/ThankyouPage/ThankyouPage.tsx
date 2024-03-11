// Import React and necessary components
import React from "react";
import NavBar from "../../features/NavBar/Presentation/nav_bar";
import "./ThankyouPage.css";
import { Flex, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ThankyouPage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="thankyou-page">
        {/* NavBar at the top of the page */}

        {/* Thank you message */}
        <div className="thankyou-message">
          <h1>Thank You for Your Order!</h1>
          <p>Your order has been received and is being processed!!!</p>
        </div>

        <Flex justifyContent="center">
          <Box width="480px">
            <iframe
              src="https://giphy.com/embed/1PMVNNKVIL8Ig"
              width="100%"
              height="360px"
              style={{ padding: '30px'}}
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </Box>
        </Flex>
      </div>
    </div>
  );
};

export default ThankyouPage;
