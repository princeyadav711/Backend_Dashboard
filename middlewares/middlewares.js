// const express = require('express')


const filters =(req,res,next)=>{
    if(!req.query.age){
        res.send('provide your age')
    }else if(
        req.query.age<18
    )
    { res.send('you are not eligible')}
        else{
            next()
            }

}


module.exports=filters


//http://localhost:3335/?age=19

//using middleewares provide condition to log the page so to excess ?then provide variable like ?age=19

// login page for employess
//  login page a
