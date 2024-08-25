const router = require("express").Router();
const User = require("../models/User");  // Ensure the correct import

// Add User
router.route("/add").post((req, res) => {
    const { name, email, phone } = req.body;

    const newUser = new User({
        name,
        email,
        phone,
    });

    newUser.save()
        .then(() => res.json("User Added"))
        .catch((err) => res.status(500).send({ status: "Error with adding user", error: err.message }));
});

// Get All Users
router.route("/").get((req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).send({ status: "Error with getting users", error: err.message }));
});

// Update User
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, email, phone } = req.body;

    const updateUser = {
        name,
        email,
        phone,
    };

    await User.findByIdAndUpdate(userId, updateUser)
        .then(() => res.status(200).send({ status: "User updated" }))
        .catch((err) => res.status(500).send({ status: "Error with updating user", error: err.message }));
});

// Delete User
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await User.findByIdAndDelete(userId)
        .then(() => res.status(200).send({ status: "User deleted" }))
        .catch((err) => res.status(500).send({ status: "Error with deleting user", error: err.message }));
});

// Get One User by ID
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    await User.findById(userId)
        .then((user) => res.status(200).send({ status: "User fetched", user }))
        .catch((err) => res.status(500).send({ status: "Error with getting user", error: err.message }));
});

module.exports = router;
