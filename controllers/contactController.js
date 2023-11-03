const asyncHandler = require('express-async-handler');
const Contacts = require('../models/contactModel');
//@desc Get all cont(acts
//@routes get /api/c(ontacts
//@acess private
const getContacts = asyncHandler(async(req, res) =>{
    const contact = await Contacts.find({user_id:req.user.id});
    res.status(200).json(contact);
});
//@desc  create contact
//@routes post /api/contacts
//@acess private
const createContact = asyncHandler(async(req, res) =>{
    //console.log(req.body);
    const {username,email,phone,password} = req.body;
    if(!username || !email || !phone ||!password){
        res.status(400);
        throw new Error("All feilds are require!");
    }
    const contact = await Contacts.create({
        username,
        email,
        phone,
        password,
        user_id : req.user.id,
    });
    res.status(201).json(contact);
});
//@desc  get contact by id
//@routes get /api/contacts/:id
//@acess private
const getContactById = asyncHandler(async(req, res) =>{
    const id = req.params.id;
    const contact = await Contacts.findById(id);
    //console.log(contact);
     if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }
    res.status(201).json(contact);
});
//@desc Get update contacts
//@routes put /api/contacts/:id
//@acess private
const updateContact = asyncHandler(async(req, res) =>{
    const id = req.params.id;
    const contact = await Contacts.findById(id);
    //console.log(contact);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found!");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to update!");

    }
    const updateContact = await Contacts.findByIdAndUpdate(id,req.body,{new:true});
    res.status(201).json(updateContact);
});
//@desc Get delete contacts
//@routes delete /api/contacts/:id
//@acess private
const deleteContact = asyncHandler(async(req, res) =>{
    const id = req.params.id;
    const contact = await Contacts.findById(id);
    //console.log(contact);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to delete!");
    }
    //console.log(contact);
    await Contacts.deleteOne({_id:id});
    res.status(200).json(contact);
}); 

module.exports = {
    getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact,
}