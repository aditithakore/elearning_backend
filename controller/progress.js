const PROGRESS = require("../model/progress");
const USER = require("../model/user");
const GAME = require("../model/game");



// async function addProgres

async function addprogress(req, res) {
  
 let userId = req.params.id;
 let gameInfo = req.body;
 const game = await PROGRESS.create(
  {userRef:userId, gameName: gameInfo.gameName,score: gameInfo.score}
 );
 console.log(game, "game -------->");
 
 if (!game) {
  return res.json({"error": "Invalid game argument"});
 }
 return  res.json( {"success": "Successfully added score"});
}


async function getprogress(req, res){
    const id = req.params.id;
    const progress = await PROGRESS.find({userRef:id});
    if (!progress) {
      return res.json({"error": "Invalid game argument"});
     }
     return  res.json( {"data": progress});
    }


async function getprogressofonemodule(req, res) {
  try {
    const userId = req.params.id;
    const gameName = req.params.module;

    // Check if userId and gameName are provided
    if (!userId || !gameName) {
      return res.status(400).json({ error: "User ID and game name are required" });
    }

    // Find the document with the maximum score for the specified user and game
    const progress = await PROGRESS.findOne({ userRef: userId, gameName: gameName })
      .sort({ score: -1 })  // Sort by score in descending order
      .limit(1);  // Limit the result to the highest score only

    // If no progress is found, return a message
    if (!progress) {
      return res.status(404).json({ message: "No progress found for this user and game" });
    }

    // Return the highest score found
    return res.json({ maxScore: progress.score, data: progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return res.status(500).json({ error: "An error occurred while fetching progress" });
  }
}

module.exports = { addprogress,getprogress,getprogressofonemodule };
