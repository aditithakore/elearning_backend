const PROGRESS = require("../model/progress");
const USER = require("../model/user");

async function addprogress(req, res) {
  const { moduleName, completed, score, timeSpent } = req.body;
  const { id } = req.params; // Get the user ID from the URL parameters

  if (!id || !moduleName) {
    return res.status(400).json({ message: "id and moduleName are required" });
  }

  try {
    // Find the user by the custom auto-incremented id
    const user = await USER.findOne({ _id: id });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let progress = await PROGRESS.findOne({ userId: user._id });

    if (progress) {
      const moduleIndex = progress.modules.findIndex((m) => m.moduleName === moduleName);

      if (moduleIndex >= 0) {
        // Update existing module progress
        // progress.modules[moduleIndex] = {
        //   ...progress.modules[moduleIndex],
        progress.modules[moduleIndex].completed= completed !== undefined ? completed : progress.modules[moduleIndex].completed;
        progress.modules[moduleIndex].score= score !== undefined ? score : progress.modules[moduleIndex].score;
        progress.modules[moduleIndex].timeSpent= timeSpent !== undefined ? timeSpent : progress.modules[moduleIndex].timeSpent;
        // };
      } else {
        // Add new module progress
        progress.modules.push({ moduleName, completed, score, timeSpent });
      }

      // Calculate overall progress (simple average for example)
      progress.overallProgress = progress.modules.reduce((acc, module) => acc + (module.completed ? 1 : 0), 0) / progress.modules.length * 100;
      progress.lastUpdated = new Date();

      await progress.save();
    } else {
      // Create new progress document
      progress = new PROGRESS({
        userId: user._id,
        modules: [{ moduleName, completed, score, timeSpent }],
        overallProgress: completed ? 100 : 0,
        lastUpdated: new Date(),
      });

      await progress.save();
    }

    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ message: "error in adding progress", error: err.message });
  }
}

async function getprogress(req, res){
    const id = req.params.id;
    if(!id){
      return res.status(404).json({ message: "id required"});
    }
    try{
      const user= await USER.findOne({ _id: id });
      if(!user){
        return res.json({error:"user does not exist"});
      }
      const progress= await PROGRESS.findOne({userId:user._id});
      if(!progress){
        return res.json({error:"progess does not exist"});
        
      }
      console.log(progress);
      return res.status(200).json({ success: progress });
    }
    catch(err){
      console.error("Error in getprogress:", err);
      return res.status(500).json({ error: "Failed to get progress" });
    }

}

async function getprogressofonemodule(req,res){
  const id= req.params.id;
  const moduleName= req.params.moduleName;
  if(!id || !moduleName){
    return res.status(404).json({message: "Module name and id is required"});
  }
  try{
    const user= await USER.findOne({_id:id});
    if(!user){
      return res.json({error:"user does not exist"});
    }
    const progress= await PROGRESS.findOne({userId:user._id});
      if(!progress){
        return res.json({error:"progess does not exist"});
        
      }
      const moduleProgress = progress.modules.find(m => m.moduleName === moduleName);

    if (!moduleProgress) {
      return res.status(404).json({ error: "Module progress does not exist" });
    }

    return res.status(200).json({ success: moduleProgress });
  }catch(err){
    console.error("Error in getprogress:", err);
    return res.status(500).json({ error: "Failed to get progress" });
  }
}

module.exports = { addprogress,getprogress,getprogressofonemodule };
