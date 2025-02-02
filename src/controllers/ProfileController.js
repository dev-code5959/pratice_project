const jwt = require('jsonwebtoken');

const ProfileModel = require('../models/ProfileModel');


exports.CreateProfile = (req,res)=>{
    let reqBody = req.body;
    ProfileModel.create(reqBody)
        .then(data=>{
            res.status(201).json({message:'user created success',data:data});
        }).catch(error=>{
            res.status(400).json({message:'error',data:error});
    })
}


//user login
exports.UserLogin = (req,res)=>{
    let UserName = req.body['UserName'];
    let Password = req.body['Password'];

    ProfileModel.find({UserName:UserName,Password: Password})
        .then(data=>{
            if(data.length>0){
                //create auth login
                let payload = {
                    exp: Math.floor(Date.now() / 1000*(24*60*60)),
                    data:data[0]
                }
                let token = jwt.sign(payload,'key12345')


                res.status(201).json({message:'user login success',token:token,data:data});
            } else{
                res.status(401).json({status:' unauthorized '});
            }

        })
        .catch(error=>{
        res.status(401).json({status:' unauthorized '});
    })
}

//select profile
exports.SelectProfile = (req,res)=>{
    let UserName =req.headers['username'];

    ProfileModel.find({UserName:UserName})
        .then(data=>{
            res.status(200).json({message:'user select success',data:data});
        }).catch(error=>{
            res.status(400).json({status:' fail ',error:error});
    })

}
