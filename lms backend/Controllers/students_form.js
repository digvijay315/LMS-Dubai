const students_modal = require("../Modal/students_register");


// const students_register = async (req, res) => {
//     try {
//         const {email_id, 
//         username,
//         first_name,
//         last_name,
//         country,
//         time_zone,
//         create_password,
//         confirm_password,
//         role} = req.body;

//         const students_data = new students_modal({email_id, 
//             username,
//             first_name,
//             last_name,
//             country,
//             time_zone,
//             create_password,
//             confirm_password,
//             role});

//         const resp = await students_data.save();

//         res.status(200).send({message: "Hello data is save", student: resp})
//     } catch (error) {
//         console.log(error);
        
//     }
// }

const students_register = async (req, res) => {
    try {
        const studentData = {
            ...req.body,
            status: 'pending' // Add status field
        };

        const students_data = new students_modal(studentData);
        const resp = await students_data.save();

        res.status(200).send({
            message: "Registration request submitted. Awaiting admin approval.",
            student: resp
        });
    } catch (error) {
        res.status(500).send({ message: "Registration failed", error: error.message });
    }
}

const remove_data = async (req, res) => {
    try {
        const _id = req.params._id;
        const resp = await students_modal.findByIdAndDelete(_id);
        res.status(200).send({message2: "data deleted", student: resp})
    } catch (error) {
        console.log(error);
        
    }
}

const get_data_student = async (req, res) => {
    try {
       const resp = await students_modal.find();
       res.status(200).send({message3: "data get success", student: resp});
    } catch (error) {
        console.log(error);
    }
}

const get_data_studentbyemail = async (req, res) => {
    try {
        const{email_id,password}=req.body
        
       const user = await students_modal.findOne({email_id});
       if(!user)
       {
        res.send({message:"email id not registered"})
        return
       }
       else if(user.confirm_password===password)
        {
         res.status(200).send({message: "login success", student: user});
    
        }
        else
        {
            res.send("password not match")
        }
       
    } catch (error) {
        console.log(error);
    }
}

// const student_login = async (req, res) => {
//     try {
//         const{email_id,password}=req.body
//        const user = await students_modal.findOne({email_id:email_id});
//        if(!user)
//        {
//         res.status(404).send({message:"email id not registered"})
//         return
//        }
//        if(user.confirm_password===password)
//         {
//          res.status(200).send({message: "login success", student: user});
    
//         }
//         else
//         {
//             res.status(400).send("password not match")
//         }
       
//     } catch (error) {
//         console.log(error);
//     }
// }

const student_login = async (req, res) => {
    try {
 
        
        const { email_id, password } = req.body;
        const user = await students_modal.findOne({ email_id: email_id });
  
        
        
        if (!user) {
            return res.status(404).send({ message: "Email ID not registered" });
        }
        
        // Check if user is approved
        if (user.status !== 'approved') {
            return res.status(403).send({ 
                message: "Your registration is pending approval. Please wait for admin confirmation." 
            });
        }
        
        if (user.confirm_password === password) {
            res.status(200).send({ 
                message: "Login success", 
                student: user 
            });
        } else {
            res.status(400).send({ message: "Password does not match" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server error" });
    }
};

module.exports = {students_register, remove_data, get_data_student,get_data_studentbyemail, student_login};