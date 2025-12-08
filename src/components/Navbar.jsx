import React, { useEffect, useState } from 'react'
import { IoLogoFreebsdDevil } from "react-icons/io";
import { FaBasketShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/BasketSlice';
import { number } from 'yup';
import { useLocation } from 'react-router-dom';
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

function Navbar() {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const goToSignIn = () => {
        setTimeout(() => {
            navigate('/signin');
            toast.success("signout succesfull");
        }, 1500);
    }

    const goToHome = () => {
        navigate("/");
    }
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isDetailsPage = location.pathname.startsWith('/details/');

    const { drawer, BasketProducts } = useSelector((store) => store.basket);


    const badgeCount = BasketProducts?.reduce((total, product) => total + product.count, 0);

    const [theme, setTheme] = useState("false");
    console.log(theme);
    const chanceTheme = () => {
        const body = document.querySelector("body");
        const navbar = document.querySelector(".navbar");

        setTheme(!theme);
        if (theme) { //Dark
            body.style.backgroundColor = "black";
            body.style.color = "#fff";
            navbar.style.color = "black";

        }
        else { //Light
            body.style.backgroundColor = "#fff";
            body.style.color = "black";

        }
    }


    return (
        <div>
            <nav className='navbar'>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <IoLogoFreebsdDevil id='devilLogo' style={{ marginRight: "20px", marginLeft: "20px" }} />
                    <h2 id='navbartitle'  onClick={goToHome}>Website</h2>
                    {
                        theme ? <IoMoonOutline size={30} style={{ margin: "17px" }} onClick={chanceTheme} /> : <MdOutlineWbSunny size={30} style={{ margin: "17px" }} onClick={chanceTheme} />

                    }
                </div>
                {
                    (isHomePage || isDetailsPage) && (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <input className='navbarinput' type="text" placeholder='search' style={{ border: "none", borderRadius: "10px", outline: "none" }} />
                            <h2>
                                <Badge badgeContent={badgeCount} color='error' >
                                    <FaBasketShopping  className='basketAvatar' onClick={() => dispatch(setDrawer())} />
                                </Badge>
                            </h2>
                            <h3 onClick={goToSignIn} style={{ marginRight: "50px", marginLeft: "30px", cursor: "pointer" }} className='navbar-signout'>SignOut</h3>
                        </div>

                    )
                }
            </nav>
        </div>
    )
}

export default Navbar