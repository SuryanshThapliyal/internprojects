import express from 'express'
import mysql from 'mysql2'
import joi from 'joi'

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysqlkiidkapass",
    database: "mydb"
});

const userSchema = joi.object({
    name: joi.string().min(2).max(100).required(),
    address: joi.string().min(5).max(200).required(),
    latitude: joi.number().min(-90).max(90).required(),
    longitude: joi.number().min(-180).max(180).required()
});

export const addSchool = (req, res) =>{
const { name, address, latitude, longitude } = req.body;

const sql = "INSERT INTO SCHOOL (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if(err){
        return res.status(500).json({message: "Database error", error: err});
    }
    res.status(201).json({message:"User added", userId: result.insertId });
});
};


export const listSchool = (req, res) => {
    const {lat, lon} = req.query;
    const a = () => (6371 * Math.acos(Math.sin(lat) * Math.sin(latitude) + Math.cos(lat) * Math.cos(latitude) * Math.cos(longitude - lon)));
    const sql1 = `SELECT name, address, latitude, longitude,a() AS distance FROM SCHOOL ORDER BY distance ASC`;
    db.query(sql1, [lat, lon], (err, results) => {
        if(err){
            return res.status(500).json({message: "Database error", error: err});
        }
        res.status(200).json({message:"School list", schools: results });
    });
};
