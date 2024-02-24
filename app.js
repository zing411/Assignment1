const express = require('express');
const path = require('path');

// init app
const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// list Student
const students = [
    {
        id: '1621',
        name: 'Luke',
        department: 'Career Centre',
        courses: ['Geography'],
        completedCourses: ['Art'],
        semester: 'Fall 2023',
        grade1: '91', 
        grade2: '88',
        grade3: '79'
    },
    {
        id: '5126',
        name: 'Nick',
        department: 'AccessAbility Services',
        courses: ['Computer Science'],
        completedCourses: ['Science'],
        semester: 'Spring 2024',
        grade1: '78', 
        grade2: '42',
        grade3: '78'
    },
    {
        id: '1614',
        name: 'Lee',
        department: 'Career Centre',
        courses: ['Accounting'],
        completedCourses: ['English'],
        semester: 'Spring 2024',
        grade1: '85', 
        grade2: '77',
        grade3: '78'
    }
];
// list ongoing Course
const ongoingCourses = [
    { name: 'Geography', seats: 10},
    { name: 'Accounting', seats: 12},
    { name: 'Computer Science', seats: 5},
    { name: 'Social Studies', seats: 0},
    { name: 'Business', seats: 0}
];

// home route
app.get('/', function(req, res){
    res.render('index');
});

app.get('/student', function(req, res){
    res.render('Student', { students }); 
});


app.get('/ongoingCourse', function(req, res){
    res.render('OnGoingCourse', { ongoingCourses })
});

app.get('/ongoingform', function (req, res){
    res.render('OngoingForm', { ongoingCourses })
})

app.get('/completedform', function (req, res){
    res.render('CompletedForm')
})

app.post('/submit', function(req, res){
    const {id, Name, Department, Enrolled, completedCourses} = req.body;

    if (Enrolled) {
        console.log('Enrolled Courses Form Submitted.');
        console.log('Student ID:', id);
        console.log('Name:', Name);
        console.log('Department:', Department);
        console.log('Enrolled Courses:', Enrolled);
    } else {
        console.log('Completed Courses Form Submitted:');
        console.log('Student ID:', id);
        console.log('Name:', Name);
        console.log('Department:', Department);
        console.log('Completed Courses:', completedCourses); 
    }
    res.redirect('/')
});

app.get('/studentDetails/:id', function(req, res){
    const studentId = req.params.id;
    const student = students.find(student => student.id === studentId);
    if (!student) {
        res.status(404).send('Student not found');
        return;
    }
    
    const averageGrade = average(student.grade1, student.grade2, student.grade3);
    res.render('studentDetail', { student, average: averageGrade });
});


function average(grade1, grade2, grade3) {
    return (parseFloat(grade1) + parseFloat(grade2) + parseFloat(grade3)) / 3;
}

// start server
app.listen(5000, function(){
    console.log('Server started on port 5000');
});
