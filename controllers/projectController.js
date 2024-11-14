const project=require('../Modals/projectModel')


exports.addProject=async(req,res)=>{

    try{

      const image=req.file.filename

        const {Title,Description,Language,Github,Demo}=req.body
        const userId=req.payload
        if(!Title || !Description ||  !image || !Language || !Github || !Demo){
            res.status(406).json("Invalid Input")
    }
    else{
        const existingProject =await project.findOne({userId,Github})
        if(existingProject){
            res.status(406).json("Project already exists")
    }
    else{
      const newProject =new project({
        Title,Description,image,Language,Github,Demo,userId
      })
      await newProject.save()
      res.status(200).json(newProject)
    }
    }
    }
    catch(err){
        res.status(400).json(err)
    }
}


exports.getProjects=async(req,res)=>{
try{
  const userId=req.payload
  const projectlist=await project.find({userId})
  res.status(200).json(projectlist)
}
catch{
  console.log(err)
  res.status(400).json(err)
}
}

exports.deleteProject=async(req,res)=>{
  try{
    const {pid}=req.params
    const pro=await project.findByIdAndDelete(pid)
    res.status(200).json(pro)
  }
  catch{
    res.status(400).json(err)
  }
}


exports.updateProject=async(req,res)=>{
  try{
    const {pid}=req.params
    const userId=req.payload
    if(req.file){
      var image=req.file.filename
      var {Title,Description,Language,Github,Demo}=req.body
    }
    else{
      var {Title,Description,Language,Github,Demo,image}=req.body
    }
    const updatepro=await project.findByIdAndUpdate(pid,{Title,Description,Language,Github,Demo,image})
    res.status(200).json(updatepro)
  }
  catch{
    res.status(400).json(err)

  }
}


exports.allProject=async(req,res)=>{
  try{
    const result=await project.find() 
    res.status(200).json(result)
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)

  }

}


exports.searchProjects=async(req,res)=>{
  try{
    const keyword=req.query.search
    const result=await project.find({Language:{$regex:keyword,$options:'i'}})
    console.log(result)
    res.status(200).json(result)
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)

  }

}