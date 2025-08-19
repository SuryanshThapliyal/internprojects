import mysql from 'mysql2'
import { userschema, schoolSchema } from '../validators/Validator.js';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysqlkiidkapass",
    database: "mydb"
});



export const addSchool = (req, res) =>{
const { name, address, latitude, longitude } = req.body;
schoolSchema.validateAsync({ name, address, latitude, longitude }).then(() => {
    const sql = "INSERT INTO SCHOOL (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, address, latitude, longitude], (err, result) => {
        if(err){
            return res.status(500).json({message: "Database error", error: err});
        }
    res.status(201).json({message:"User added", userId: result.insertId });
});
}).catch(err => {
    res.status(400).json({message: "Validation error", error: err.details[0].message});
})
};




export const listSchool = (req, res) => {
    const {lat, lon} = req.query;
    userschema.validateAsync({ lat, lon }).then(() => {
    const sql1 = `SELECT name, address, latitude,longitude, (6371 * ACOS(
          COS(RADIANS(${lat})) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(${lon})) +
          SIN(RADIANS(${lat})) * SIN(RADIANS(latitude)))) AS distance FROM SCHOOL ORDER BY distance ASC`;
    db.query(sql1, [lat, lon], (err, results) => {
        if(err){
            return res.status(500).json({message: "Database error", error: err});
        }
        res.status(200).json({message:"School list", schools: results });
    });
}).catch(err => {
    res.status(400).json({message: "Validation error", error: err.details[0].message});
});
};
