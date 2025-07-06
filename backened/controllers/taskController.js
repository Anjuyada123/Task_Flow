import Task from "../models/taskModel";

//Create a new task

export const createTask=async(req,res)=>{
    try{
        const{title,description,priority,dueDate,completed}=req.body;
        const task=new Task({
             title,
             description,
             priority,
             dueDate,
             completed:completed==='Yes' || completed ===true,
             owner:req.user.id
        });
        const saved=await task.save();
        res.status(201).json({success:true,task:saved});
    }
    catch(err){
        res.status(400).json({success:false,message:err.message});
    }
};

//get all task for logged- in user
export const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 });
      res.json({ success: true, tasks });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  // get single task by id must belong to that user
  export const getTaskById = async (req, res) => {
    try {
      const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
  
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
  
      res.json({ success: true, task });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  //update a task
export const updateTask = async (req, res) => {
    try {
      const data = { ...req.body };
      if (data.completed !== undefined) {
        data.completed = data.completed === 'Yes' || data.completed === true;
      }
  
      const updated = await Task.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.id },  // Ensure only the user's task is updated
        data,
        { new: true, runValidators: true }           // Return updated doc & validate schema
      );
  
      if (!updated) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
  
      res.json({ success: true, task: updated });
  
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  //delete a task
export const deleteTask = async (req, res) => {
    try {
      const deleted = await Task.findOneAndDelete({
        _id: req.params.id,
        owner: req.user.id  // Make sure only the owner can delete their task
      });
  
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
  
      res.json({ success: true, message: "Task deleted successfully" });
  
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  