import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from "../../assets/frontend_assets/assets"

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Explore our menu</h1>
            <p className="explore-menu-text">
                Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
            </p>
            <div className="explore-menu-list">
                {
                    // Mapping the elements here to show the menu items . We are using the menu_list array from assets to show the menu items
                    menu_list.map((item, idx) => {
                        return (
                            <div key={idx} onClick={() => {
                                // Setting the category to the menu name when clicked. If the menu name is already selected, it will set it to all
                                setCategory((prev) => {
                                    // prev is the previous state of category . If the previous state is the same as the current menu name, set it to all, else set it to the current menu name
                                    return prev === item.menu_name ? "all" : item.menu_name
                                })
                            }} className="explore-menu-item">
                                <div className="explore-menu-img">
                                    {/* If the menu name is the same as the category, add the active class to the image . This will change the image to a different color */}
                                    {/* The active class is used to show the selected menu item */}
                                    <img className={item.menu_name === category ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
                                </div>
                                <div className="explore-menu-name">
                                    <p>{item.menu_name}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExploreMenu
