const mongoose=require('mongoose')


const projectSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true},

        image:{
            type:String,
            required:true
        },

        Description:{
            type:String,
            required:true
        },
        Language:{
            type:String,
            required:true
        },
        Github:{
            type:String,
            required:true,
            unique:true
        },
        Demo:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        }


})

const project=mongoose.model('project',projectSchema)

module.exports=project