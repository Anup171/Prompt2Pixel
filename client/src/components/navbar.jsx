import React from 'react';
import styled from 'styled-components';
import Button from './buttons';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { ExploreRounded } from '@mui/icons-material';
import {useNavigate,useLocation} from 'react-router-dom';
const Container=styled.div`
    flex:1;
    background:${({theme})=>theme.navbar};
    color:${({theme})=>theme.text_primary};
    font-weight:bold;
    font-size:30px;
    padding:14px 50px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-shadow:0 0 10px rgb(0, 0, 0.1);
    @media only screen and (max-width:600px){
    padding: 10px 12px;
}
`;
const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split("/");

    return (
        <Container>
            Prompt2Pixel

            {
                path[1] === "post" ? (
                    <Button
                        onClick={() => navigate("/")}
                        text="Explore Image"
                        leftIcon={
                            <ExploreRounded style={{ fontSize: "25px" }} />
                        }
                    />
                ) : (
                    <Button
                        onClick={() => navigate("/post")}
                        text="Generate New Image"
                        leftIcon={
                            <AddPhotoAlternateRoundedIcon style={{ fontSize: "25px" }} />
                        }
                    />
                )
            }

        </Container>
    );
}

export default NavBar;