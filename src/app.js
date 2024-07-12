require('dotenv').config();
const express=require('express');
const path=require('path');
const hbs=require('hbs');
const app=express();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const Project=require('./models/projects');
const Skill=require('./models/skills');
const Certificate=require('./models/certificates');
const Experience = require('./models/experiences');
const helper=require('handlebars-helpers')();
require('./DB/conn');

const PORT=process.env.PORT;
const dynamicpath=path.join(__dirname,'../templates/views');
const partialpath=path.join(__dirname,'../templates/partials');
app.set("view engine","hbs");
app.set("views",dynamicpath);
hbs.registerPartials(partialpath);
hbs.registerHelper(helper);
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json()); 
const { hardcodedUser } = require('./DB/confi');
app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
const authenticateUser = (req, res, next) => {
   
    if (req.session.user) {
        next(); 
    } else {
        res.redirect('/login'); 
    }
};
app.get('/',(req,res)=>
{
    res.render('home');
});
app.get('/add',authenticateUser,(req,res)=>{
    res.render('add')
})
app.post('/add',async(req,res)=>{
    const type=req.body.type;
    try{
        let addeditem;
        switch(type)
        {
            case 'project':
            addeditem='project';
            res.render('addproject');
            break;
            case 'skill':
                addeditem='skill';
            res.render('addskill');
            break;
            case 'certificate':
                addeditem='skill';
            res.render('addcertificate');
            break;
            case 'experience':
                addeditem='skill';
            res.render('addexperience');
            break;
            
            default:
                res.status(500).send('Invalid type');
                return;
        }
    if(!addeditem) 
    {
        res.status(500).send('Invalid item');

    }
    }
    catch(err){
      console.log(err);
      res.status(400).send('Server Error');
    }
});

app.post('/addcertificate', async (req, res) => {
    const { icon, url, name, ppturl, pptname } = req.body;
    try {
        const newCertificate = new Certificate({
            icon,
            url,
            name,
            ppturl,
            pptname
        });
        await newCertificate.save();
        res.redirect('/'); // Redirect to the appropriate page after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
app.get('/delete',authenticateUser,(req,res)=>{
    res.render('delete')
})


app.post('/delete',async(req,res)=>{
    const type=req.body.type;
    const name=req.body.name;
    try{
        let deleteditem;
        switch(type)
        {
            case 'project':

                deleteditem=await Project.findOneAndDelete({name:name});
                break;
            case 'skill':
                deleteditem=await Skill.findOneAndDelete({name:name});
                break;
                case 'certificate':
                    deleteditem=await Certificate.findOneAndDelete({name:name});
                    break;
                    case 'experience':
                        deleteditem=await Experience.findOneAndDelete({company:name});
                        break;
            default:
                res.status(400).send('Invalid Type');
        }
        if(!deleteditem)
         {
        res.redirect('/');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Sever error")
    }
});
app.get('/addproject',(req,res)=>{
    res.render('addproject')
})
app.post('/addproject',async(req,res)=>
{
    const { icon, name, url, Techstack, description } = req.body;

    try {
        const project = new Project({
            icon,
            name,
            url,
            Techstack,
            description
        });

        await project.save();
        res.redirect('/'); // Redirect to homepage or another appropriate route after successful save
    } catch (error) {
        console.error(error);
    
        res.status(500).send('Failed to add project');
    }
});
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/home',(req,res)=>{
    res.render('home');
})
app.get('/education',(req,res)=>{
    res.render('education');
})
app.get('/experience', async (req,res)=>{
    try {
        // Fetch existing experiences from database (if needed)
        const experiences = await Experience.find();
        res.render('experience', { experiences });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})
app.post('/addexperience', async (req, res) => {
    const { position, company, duration, description } = req.body;
    try {
        const newExperience = new Experience({ position, company, duration, description });
        await newExperience.save();
        res.redirect('experience'); // Redirect to the addexperience page or wherever you want
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
app.get('/addskill',(req,res)=>{
    res.render('addskill');
})
app.post('/addskill',async(req,res)=>{
    const name=req.body.name;
    const category=req.body.category;
    const icon=req.body.icon;
    try{
        const skill=new Skill({
            name:name,
            category:category,
            icon:icon
        });
        await skill.save();
        res.redirect('/');
    }
   catch(eror){
      console.log("erro");
      res.send("error to add skill");
   };

});
app.get('/project', async(req,res)=>{
    try {
        const projects = await Project.find({});
        res.render('project', { projects });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch projects');
    }
})

app.get('/certificate',async(req,res)=>{
    try{
        const certificates=await Certificate.find({});
    
    res.render('certificate',{certificates});}
    catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
})
app.get('/skill',async(req,res)=>{
    try {
        const skills = await Skill.find({}); // Fetch all skills from the database
        
        // Group skills by category
        const groupedSkills = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {});

        res.render('skill', { groupedSkills });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})
app.get('/update',authenticateUser,(req,res)=>{
    res.render('update')
})


// Routes...

// Login route
app.get('/login', (req, res) => {
    res.render('login'); // Render login form
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simulate user authentication (check against hardcoded user)
    if (username === hardcodedUser.username && await bcrypt.compare(password, hardcodedUser.password)) {
        req.session.user = { username: hardcodedUser.username }; // Store user in session
        res.redirect('/'); // Redirect to homepage or another appropriate route
    } else {
        res.render('login', { error: 'Invalid username or password' });
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error logging out');
        } else {
            res.redirect('/login'); // Redirect to login page after logout
        }
    });
});


app.listen(PORT,()=>{
console.log("server is working")
})

