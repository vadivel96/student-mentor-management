const addMentorCallback = require("./router_callbacks/mentor_callbacks/addMentorCb");
const { allMentorsCallback } = require("./router_callbacks/mentor_callbacks/allMentorCb");

var express = require("express");
const { getMentorCallback } = require("./router_callbacks/mentor_callbacks/getMentorCb");
const { getMentorStudentsCallback } = require("./router_callbacks/mentor_callbacks/getMentorStudentsCallback");
var router = express.Router();

//get all mentor list
router.get('/allMentors',allMentorsCallback);
//get one mentor by id 
router.get('/:mentorId',getMentorCallback);
//get the student list mentored by him
router.get('/mentorStudents/:mentorId',getMentorStudentsCallback);

//add new mentor
router.post('/addMentor',addMentorCallback);


module.exports=router