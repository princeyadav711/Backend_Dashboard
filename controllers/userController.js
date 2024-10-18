const userModel = require('../models/users_Schema')
const bodyParser = require('body-parser')
const express = require('express')
const jsonParser = bodyParser.json()
const mongoose = require('mongoose')



// const alldata = (req,res)=>{   // to get alldat through controller to routes file
//     userModel.find().then((data)=>{
//         res.json(data)
//         }).catch((err)=>{
//             console.log(err)
//             })
//         }

// const searchData = (req,res)=>{  // search api
//     userModel.findById(req.params.id)
//     .then((data)=>{
//         res.json(data)
//         }).catch((err)=>{
//             console.log(err)
//             })
// }

// const deletData = (req,res)=>{
//     userModel.deleteOne({_id : req.params.id})
//     .then(()=>{
//         res.json({'message':'data deleted'})
//         }).catch((err)=>{
//             console.log(err)
//             })
//     }

//     const addData = (req,res)=>{
//         const {name,age,power,hobbies} = req.body
//         const newuser = new userModel(
//             {  
//                 _id : new mongoose.Types.ObjectId,
//                 name,
//                 age,
//                 power,
//                 hobbies
//             });
//             newuser.save()
//             .then(()=>
//             res.json({'message':'data added'}))
//             .catch((err)=>{
//                 console.log(err)
//                 })
//         }

//         const updateData = (req,res)=>{
//             const {name,age,power,hobbies} = req.body;
//             userModel.updateOne({_id:req.params.id},{$set:{name,age,power,hobbies}}
//                 .then(()=>
//                     res.json({'message':'data updated'}))
//                 .catch((err)=>{
//                     console.log(err)
//                     })
                    
//             )}


// // Get all data

// const searchData = (req,res)=>{  // search api
//     userModel.findById(req.params.id)
//     .then((data)=>{
//         res.render('dashboard',{data:data});
//         }).catch((err)=>{
//             console.log(err)
//             })
// }

const searchData = (req, res) => {  // search api
    userModel.findById(req.query._id)
    .then((data) => {
        res.render('dashboard', { data: [data] });
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Failed to retrieve data');
    });
};




const allData = (req, res) => {
   userModel.find()
        .then(data => {
            res.render('dashboard', { data: data });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to retrieve data');
        });
};

// Add new data
const addData = (req, res) => {
    console.log("Add Data:", req.body);
    const { name, age, power, hobbies } = req.body;
    const newUser = new userModel({
        _id: new mongoose.Types.ObjectId(),
        name,
        age,
        power,
        hobbies
    });
    newUser.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to add data');
        });
};


// Update existing data
// const updateData = (req, res) => {
//     console.log("Update Data:", req.body); 
//     const { name, age, power, hobbies } = req.body;
//     userModel.findByIdAndUpdate(
//         req.params.id,
//         { name, age, power, hobbies },
//         { new: true }
//     )
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).send('Failed to update data');
//     });
// };
const loadUpdateForm = (req, res) => {
    const id = req.params.id;
    userModel.findById(id)
        .then(data => {
            res.render('update-data', { user: data });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to load update form');
        });
};

const updateData = (req, res) => {
    console.log("Update Data:", req.body); 
    const { name, age, power, hobbies } = req.body;
    userModel.findByIdAndUpdate(
        req.params.id,
        { name, age, power, hobbies },
        { new: true }
    )
    .then(() => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Failed to update data');
    });
};


// Delete data
const deleteData = (req, res) => {
    userModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to delete data');
        });
};
// const addData = (req, res) => {
//     console.log("Add Data:", req.body);  // Debugging statement
//     // Rest of the code
// };

// const updateData = (req, res) => {
//     console.log("Update Data:", req.body);  // Debugging statement
//     // Rest of the code
// };





module.exports = { allData, deleteData, addData, updateData, searchData,loadUpdateForm }



