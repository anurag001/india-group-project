const router = require('express').Router();
const bcrypt = require('bcrypt')
const { getUserById, getUser, saveUser, updateUser } = require('../models/users');

router.get('/:id', async function (req, res) {
    try{
        const { id } = req.params;
        if(id){
            const userData = await getUserById(id);
            res.status(200).send(userData);
        }
    } catch(err) {
        res.status(404).send({message:'User not found'});
    }
});

router.post('/', async function (req, res, next) {
    try{
        const data = { ...req.body };
        if(data.email && data.username){
            const userData = await getUser({ $or: [{ username:data.username }, { email:data.email }] });
            if(userData.length>0){
                throw new Error("User already exists");
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salt);
            data.password = hash;
            await saveUser(data);
            res.status(200).send({message:"User created successfully"});
        }
    } catch(err) {
        res.status(404).send({message:err.message});
    }
});

router.put('/:id', async function (req, res, next) {
    try{
        const data = { ...req.body };
        const id = req.params.id;
        if(!id){
            throw new Error("User id is missing");
        }
        const userData = await getUserById(id);
        if(!userData){
            throw new Error("Userdata doesn't exist");
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        data.password = hash;
        data.id = id;
        await updateUser(data);
        res.status(200).send({message:"User updated successfully"});
    } catch(err) {
        res.status(404).send({message:err.message});
    }
});

module.exports = router;