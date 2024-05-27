
var express = require("express");
const addStudentCallback = require("./router_callbacks/student_callbacks/addStudentCb");
const { allStudentsCallback } = require("./router_callbacks/student_callbacks/allStudentsCb");
const { getStudentCallback } = require("./router_callbacks/student_callbacks/getStudentCb");
const { assignMentorToStudentCallback } = require("./router_callbacks/student_callbacks/assignMentorToStudentCb");
const { changeMentorCallback } = require("./router_callbacks/student_callbacks/changeMentorCb");
const { removeStudentCallback } = require("./router_callbacks/student_callbacks/removeStudentCb");
var router = express.Router();

//get all students
router.get('/allStudents',allStudentsCallback);
//get one student by id
router.get('/:studentId',getStudentCallback);

//add studentd
router.post('/addStudent',addStudentCallback);
//assign a mentor to a student
router.post('/assignMentorToStudent/:studentId',assignMentorToStudentCallback);

//update old mentor with new mentor
router.put('/changeMentor/:oldMentorId/:newMentorId',changeMentorCallback);

//remove the student
router.delete('/removeStudent/:studentId',removeStudentCallback);

module.exports=router