const students_modal = require('../Modal/students_register');
const register_modal = require('../Modal/employee_register');

const approveWaitlistedUser = async (req, res) => {
    try {
        const { userId, userType } = req.body;

        if (userType === 'student') {
            const user = await students_modal.findByIdAndUpdate(
                userId, 
                { status: 'approved' }, 
                { new: true }
            );
            
            if (!user) {
                return res.status(404).send({ message: "Student not found" });
            }
            
            // Optional: You could move the student to a different collection if needed
            res.status(200).send({ message: "Student approved", student: user });
        } else if (userType === 'employee') {
            const user = await register_modal.findByIdAndUpdate(
                userId, 
                { status: 'approved' }, 
                { new: true }
            );
            
            if (!user) {
                return res.status(404).send({ message: "Employee not found" });
            }
            
            res.status(200).send({ message: "Employee approved", employee: user });
        } else {
            res.status(400).send({ message: "Invalid user type" });
        }
    } catch (error) {
        res.status(500).send({ message: "Approval process failed", error: error.message });
    }
};

const getWaitlistedUsers = async (req, res) => {
    try {
        const students = await students_modal.find({ status: 'pending' });
        const employees = await register_modal.find({ status: 'pending' });

        res.status(200).send({
            students: students,
            employees: employees
        });
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch waitlisted users", error: error.message });
    }
};

module.exports = { approveWaitlistedUser, getWaitlistedUsers };
