import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"market_place"
})



app.use(express.json())
app.use(cors());


app.get("/", (req, res) => {
    res.json("This is the backend.")
})

app.get("/shoes", (req, res) => {
    const q = "SELECT * FROM `shoes`";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.post("/shoes", (req, res) => {
    const q = "INSERT INTO `shoes` (`shoe_name`, `shoe_desc`, `shoe_img`, `shoe_price`) VALUES(?)";
    // const values = [
    //     "004",
    //     "Socks",
    //     "Item 4 Description",
    //     "item_4.png"
    // ];
    const values = [
        req.body.shoe_name,
        req.body.shoe_desc,
        req.body.shoe_img,
        req.body.shoe_price
    ];
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Successful insertion.")
    });
})

app.delete("/shoes/:shoe_id", (req, res) => {
    const shoeID = req.params.shoe_id;
    const q = "DELETE FROM shoes WHERE shoe_id = ?";
    console.log(shoeID)
    db.query(q, [shoeID], (err, data) => {
        if (err) return res.json(err)
        return res.json("Successfully deleted");
    
    })
})

app.put("/shoes/:shoe_id", (req, res) => {
    const shoeID = req.params.shoe_id;
    const q = "UPDATE shoes SET `shoe_name` =?, `shoe_desc`=?, `shoe_img`=?, `shoe_price`=? WHERE shoe_id=?";
    const values = [
        req.body.shoe_name,
        req.body.shoe_desc,
        req.body.shoe_img,
        req.body.shoe_price
    ];
    db.query(q, [...values, shoeID], (err, data) => {
        if (err) return res.json(err)
        return res.json("Item updated");
    
    })
})

app.listen(8800, () => {
    console.log('Connected to backend')
})