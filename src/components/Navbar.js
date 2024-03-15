import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"
import logo_light from '../assets/logo.png';
import search_icon_light from '../assets/search-w.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  { title: 'Home', path: '/' },
  { title: 'Electronics', path: '/electronics' },
  { title: 'Books', path: '/books' },
  { title: 'Music', path: '/music' },
  { title: 'Clothing', path: '/clothing' },
  { title: 'Games', path: '/games' },
  { title: 'Furniture', path: '/furniture' },
  { title: 'Travel', path: '/travel' },
  { title: 'Botanical', path: '/botanical' },
  { title: 'Category Name', path: '/categoryname' },
];

export default function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [searchContainerWidth, setSearchContainerWidth] = useState(300); // Initial width of search container

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
    updateSearchContainerWidth();
  };

  const getMaxItems = useCallback(() => {
    if (windowWidth < 600) {
      // console.log("<600 invoked");
      return 1;
    } else if (windowWidth >= 600 && windowWidth < 700) {
      // console.log(">=600 and <700 invoked");
      return 2; 
    } else if (windowWidth >= 700 && windowWidth < 800) {
      // console.log(">=700 and <800 invoked");
      return 3;
    }else if (windowWidth >= 800 && windowWidth < 900) {
      // console.log(">=800 and <900 invoked");
      return 4;
    }else if (windowWidth >= 900 && windowWidth < 1000) {
      // console.log(">=900 and <1000 invoked");
      return 5;
    }else if (windowWidth >= 1000 && windowWidth < 1150) {
      // console.log(">1000 and <1100 invoked");
      return 6;
    }else {
      // console.log(">992 invoked");
      return 7; 
    }
  }, [windowWidth]);

  const updateMenu = useCallback(() => {
    const maxItems = getMaxItems();
    setDisplayedItems(menuItems.slice(0, maxItems));
    setHiddenItems(menuItems.slice(maxItems));
  }, [getMaxItems]);

  const updateSearchContainerWidth = () => {
    // Calculate the total width occupied by other elements (logo, main menu, etc.) in percentage
    const occupiedWidthPercentage = (document.querySelector('.logo').offsetWidth + document.querySelector('.main-menu').offsetWidth) / window.innerWidth * 100;
    // Calculate the available width for the search container in percentage
    const availableWidthPercentage = 100 - occupiedWidthPercentage; // Total width is 100%
    // Set a minimum width for the search container to ensure it remains visible
    const minWidthPercentage = 20; // Set your desired minimum width here
    // Calculate the width of the search container in percentage
    const widthPercentage = Math.max(minWidthPercentage, availableWidthPercentage);
    setSearchContainerWidth(`${widthPercentage}%`);
  };

  
  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    updateMenu();
    updateSearchContainerWidth();
  }, [windowWidth, updateMenu]);

  return (
    <div className="navbar">
      <div className="img">
          <img src={logo_light} alt="" className='logo' />
      </div>
      <nav>
        {/* <img src={logo_light} alt="" className='logo' /> */}
        <ul className="main-menu">
          {displayedItems.map((item) => (
            <li key={item.title} className='visible'> <NavLink to={item.path}> {item.title.toUpperCase()} </NavLink> </li>
          ))}
          {hiddenItems.length > 0 && (
            <li id="more" className="more" onMouseEnter={() => setShowMore(true)} onMouseLeave={() => setShowMore(false)}>
              <span>MORE</span>
              <FontAwesomeIcon icon={faAngleDown} />
              {showMore && (
                <ul id='sub-menu' className="sub-menu">
                  {hiddenItems.map((item) => (
                    <li key={item.title}>
                      <NavLink to={item.path}>{item.title.toUpperCase()}</NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
        </ul>
      </nav>
      <div className="search-container" style={{ width: `${searchContainerWidth}px` }}>
          <div className="search-box">
            <img src={search_icon_light} alt="" className='search-icon'/>
            <input type="text" placeholder='Search something' className='search-input'/>
          </div>
          <div className="underline"></div>
        </div>
    </div>
  );
}
