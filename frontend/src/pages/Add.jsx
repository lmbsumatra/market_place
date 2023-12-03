import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [shoe, setShoe] = useState({
        shoe_name:"",
        shoe_desc:"",
        shoe_img:"",
        shoe_pric  :null,
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setShoe((prev) => ({...prev, [e.target.name]: e.target.value}))
    };
    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/shoes", shoe);
            navigate("/")
        }   
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="form">
            <h1>Add New Item</h1>
            <input type="text" placeholder="name" name="shoe_name" onChange={handleChange} />
            <input type="text" placeholder="desc" name="shoe_desc" onChange={handleChange} />
            <input type="text" placeholder="img"  name="shoe_img" onChange={handleChange} />
            <input type="number" placeholder="price" name="shoe_price" onChange={handleChange} />

            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add;