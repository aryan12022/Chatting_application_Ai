
import userModel from '../models/user.models.js'
import * as userService from '../services/user.service.js'
import {validationResult} from 'express-validator'

export const createUserController= async(req,res)=>{

    const errors =  validationResult(req);

    if(!errors.isEmpty()){

        return res.status(400).json({errors:errors.array()});

    }
    try{
             const user=await userService.createUser(req.body);

             const token=await user.generateJWT();

         res.status(201).send({ user, token });


    }catch(error){

        res.status(400).send(error.message);

    }
    
}

export const loginController=async(req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{     
        const {email,password}=req.body;
    

        
       const user = await userModel.findOne({ email }).select('+password');
if (!user || !(await user.isValidPassword(password))) {
  return res.status(401).json({ error: 'Invalid email or password' });
}
       const token=await user.generateJWT();


       res.status(200).json({user,token});


    }catch(err){
        res.status(400).send(err.message)
    }
}
export const profileController=async(req,res)=>{

        res.status(200).json({
            user:req.user,
        });
    }
