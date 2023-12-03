import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Update = () => {
    const [shoe, setShoe] = useState({
        shoe_name:"",
        shoe_desc:"",
        shoe_img:"",
        shoe_pric  :null,
    })

    const navigate = useNavigate();
    const location = useLocation();
    const shoeID = location.pathname.split("/")[2]

    const handleChange = (e) => {
        setShoe((prev) => ({...prev, [e.target.name]: e.target.value}))
    };
    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:8800/shoes/${shoeID}`, shoe);
            navigate("/")
        }   
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="form">
            <h1>Update Item</h1>
            <input type="text" placeholder="name" name="shoe_name" onChange={handleChange} />
            <input type="text" placeholder="desc" name="shoe_desc" onChange={handleChange} />
            <input type="text" placeholder="img"  name="shoe_img" onChange={handleChange} />
            <input type="number" placeholder="price" name="shoe_price" onChange={handleChange} />

            <button onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update;