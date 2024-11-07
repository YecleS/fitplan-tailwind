import React,{ useContext, useState, useEffect, useRef } from 'react';
import logoPng from '../assets/logo.png';
import '../styles/Header.css';
import { ButtonSolidTemplate, ButtonTransparentTemplate } from '../uicomponents/ButtonTemplate';
import HeaderLinksTemplate from '../uicomponents/HeaderLinksTemplate';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/UtilContext';

const Header = () => {
    //Consuming context
    const { user, clearUser } = useContext(UserContext);
    //State for hamburger menu toggling
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
    const [showDropdownProfile, setShowDropdownProfile] = useState(false);
    //Navigate hooks for navigation upon clicking
    const navigate = useNavigate();
    //Reference for toggling of hamburgermenu and profile dropdown
    const hamburgerRef = useRef(null);
    const hamburgerIconRef = useRef(null);
    const profileDropdownRef = useRef(null);
    //For Scrolling monitoring
    const [scrolled, isScrolled] = useState(false); 


    useEffect(() => {
        const handleClick = (e) => {
            if(hamburgerRef.current && hamburgerIconRef.current && !hamburgerRef.current.contains(e.target) && !hamburgerIconRef.current.contains(e.target)){
                setShowHamburgerMenu(false);
            }

            if(profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)){
                setShowDropdownProfile(false);
            }           
        }

        const monitorScrolling = () => {
            const scrollY = window.scrollY;
            if(scrollY > 10){
                isScrolled(true);
            }else {
                isScrolled(false);
            }
        }

        document.addEventListener('click', handleClick);
        window.addEventListener('scroll', monitorScrolling);

        return () => {
            document.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', monitorScrolling);
        };
    },[]);


    const logout = () => {
        const isConfirm = window.confirm('Are you sure you want to Log out ?');

        if(isConfirm) {
            clearUser();
            setShowDropdownProfile(false);
        }
        
    }

  return (
    <nav className={`header w-full p-2 ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
        <div className='header__content-wrapper flex items-center justify-between'>

            <div className='header__logo-wrapper flex items-center justify-center gap-2'>
                <img src={logoPng} className='header__logo w-8 lg:w-10'/>
                <p className='header__logo-text text-base text-white font-bold lg:text-lg'>Fit<span style={{color: 'var(--red-color)'}} >Plan</span></p>
            </div>

            <div className='header__nav-controls'>
                <div className={`header__nav-links-wrapper ${showHamburgerMenu ? 'header__nav-links-wrapper-active':''}`} ref={hamburgerRef}>
                    <HeaderLinksTemplate to='/' linkLabel='Home' customLinkClass='mt-[5rem] md:mt-[0rem]' onClick={() => {
                        setShowHamburgerMenu(false);
                        setShowDropdownProfile(false);
                        }}
                    />
                    <HeaderLinksTemplate to='/catalog' linkLabel='Catalog' onClick={() => {
                        setShowHamburgerMenu(false);
                        setShowDropdownProfile(false);
                        }} 
                    />

                    <HeaderLinksTemplate to='/routine' linkLabel='My Routine' onClick={() => {
                        setShowHamburgerMenu(false);
                        setShowDropdownProfile(false);
                        }} 
                    />
                    
                    {!user.username &&
                        <>
                            <ButtonSolidTemplate solidButtonCustomClass='text-white hover:text-white hover:bg-[transparent] hover:border-solid hover:border-[1px] hover:border-[var(--red-color)]' buttonLabel='Login' onClick={() => {
                                setShowHamburgerMenu(false);
                                navigate('/login');
                                }}
                            />

                            <ButtonTransparentTemplate transparentButtonClass='text-white bg-[transparent] hover:text-white hover:bg-[var(--red-color)] hover:border-solid hover:border-[1px] hover:border-[transparent]' buttonLabel='Sign Up' onClick={() => {
                                setShowHamburgerMenu(false);
                                navigate('/signup');
                                }}
                            />
                        </>
                    }
                    
                </div>

                { user.username && 
                    <div className='header__profile-controls-wrapper flex align-center justify-center gap-2 cursor-pointer relative md:ml-[1rem]' ref={profileDropdownRef}>
                        <i className="fa-solid fa-circle-user text-white text-2xl" onClick={()=> setShowDropdownProfile(!showDropdownProfile)}></i>
                        <i className="fa-solid fa-caret-down text-white text-xl"  onClick={()=> setShowDropdownProfile(!showDropdownProfile)}></i>

                        { showDropdownProfile && 
                            <div className='header__profile-dropdown absolute z-[1] flex flex-col items-center justify-center top-[2.5rem] right-0  bg-white p-[1rem] shadow-[0_0_3px_rgba(0,0,0,0.8)] rounded-[5px]'>
                                <p className='header__account-name text-base font-semibold mb-[1rem] capitalize'>{user.username}</p>
                                <ButtonTransparentTemplate buttonLabel='Logout' onClick={logout} transparentButtonClass='text-black bg-[transparent] hover:text-white hover:bg-[var(--red-color)] hover:border-solid hover:border-[1px] hover:border-[transparent]' />
                            </div>
                        }
                    </div>
                }
                <i className="header__hamburger-icon fa-solid fa-bars text-white text-2xl ml-5 cursor-pointer md:hidden" ref={hamburgerIconRef} onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}></i>
            </div>
            

        </div>
      

    </nav>
  )
}

export default Header
