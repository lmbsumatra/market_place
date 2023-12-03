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

    const handleDelete = async(shoe_id) => {
        try {
            await axios.delete("http://localhost:8800/shoes/"  + shoe_id);
            window.location.reload()
        }
        catch(err) {
            console.log(err)
        }
    }


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
                        <button className='delete' onClick={()=>handleDelete(shoe.shoe_id)}>Delete</button>
                        <button className='update'><Link to={`/update/${shoe.shoe_id}`}>Update</Link></button>
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