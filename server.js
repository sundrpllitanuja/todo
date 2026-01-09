const express = require ('express');
const mongoose = require ('mongoose');
const ToDo = require ('./model');
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://sundrpllitanuja231006_db_user:hBZo2hR4WaA9E6hB@cluster0.gbyauu1.mongodb.net/').then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));
app.post('/create_user', async (req, res) => {
    const {title} = req.body;
    const {description} = req.body;
    const {completed} = req.body;
    const {priority} = req.body;
    const {dueDate} = req.body;
    try{
        const newData = new ToDo({title, description, completed, priority, dueDate  });
        await newData.save();
        return res.json(await ToDo.find());

    }
    catch(err){
        console.log(err);
    }
})
app.get('/emp_Data', async (req, res) => {
    try{
        const allData = await ToDo.find();
        return res.json(allData);
    }
    catch(err){
        console.log(err);
    }
})
app.put('/update_Data/:id', async (req, res) => {
    const {completed} = req.body;
    try{
        await ToDo.findByIdAndUpdate(req.params.id, {completed},
            {new: true});
        return res.json (await ToDo.find());
    }
    catch(err){
        console.log(err.message);
    }
})
app.put('/update_all_Data/:id', async (req, res) => {
    const {title, description, completed, priority, dueDate } = req.body;
    try{
        await ToDo.findByIdAndUpdate(req.params.id, {title, description, completed, priority, dueDate},
            {new: true});
        return res.json (await ToDo.find());
    }
    catch(err){
        console.log(err.message);
}
})
app.delete('/delete_Data/:id', async (req, res) => {
    try{
        await ToDo.findByIdAndDelete(req.params.id);
        return res.json (await ToDo.find());
    }
    catch(err){
        console.log(err.message);
    }
})

app.listen(3000, () => console.log('Server is running on http://localhost:3000'))