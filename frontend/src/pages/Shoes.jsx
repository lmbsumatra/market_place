import React, { useEffect, useState } from 'react';
 import axios from 'axios';
import { Link } from 'react-router-dom';
const Shoes = () => {

    const [shoes, setShoes] = useState([])

    useEffect(() => {
        const fetchAllShoes = async() => {
            try {
                const res = await axios.get("http://localhost:8800/shoes");
                setShoes(res.data)
            }
            catch(err) {
                console.log(err)
            }
        }
        fetchAllShoes()
    }, [])
    return (
        <div> 
            <h1>Marketplace</h1>
            <div className = "shoes">
                {shoes.map((shoe) => (
                    <div className="shoe" key={shoe.shoe_id}>
                        {shoe.shoe_img && <img src={shoe.shoe_img} alt=""/> }
                        <h2> {shoe.shoe_name}</h2>
                        <p> {shoe.shoe_desc} </p>
                        <span>{shoe.shoe_price}</span>
                    </div>
                ))}
            </div>
        <button>
            <Link to = "/add"> Add New</Link>
        </button>
        </div>
    )
}

export default Shoes;