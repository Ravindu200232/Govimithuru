const router = require("express").Router();
const Deliver = require("../models/Deliver");  // Use const and correct import

// Add Deliver
router.route("/add").post((req, res) => {
    const { deliverID, orderID, deliverDate, address, status } = req.body;

    const newDeliver = new Deliver({
        deliverID,
        orderID,
        deliverDate: new Date(deliverDate),  // Store only the date part
        address,
        status,
    });

    newDeliver.save()
        .then(() => res.json("Deliver Added"))
        .catch((err) => res.status(500).json("Error: " + err));
});

// Get All Delivers
router.route("/").get((req, res) => {
    Deliver.find()
        .then((delivers) => res.json(delivers))
        .catch((err) => res.status(500).json("Error: " + err));
});

// Update Deliver
router.route("/update/:id").put(async (req, res) => {
    let deliverId = req.params.id;
    const { deliverID, orderID, deliverDate, address, status } = req.body;

    const updateDeliver = {
        deliverID,
        orderID,
        deliverDate: new Date(deliverDate),  // Store only the date part
        address,
        status,
    };

    await Deliver.findByIdAndUpdate(deliverId, updateDeliver)
        .then(() => res.status(200).send({ status: "Deliver updated" }))
        .catch((err) => res.status(500).send({ status: "Error with updating data", error: err.message }));
});

// Delete Deliver
router.route("/delete/:id").delete(async (req, res) => {
    let deliverId = req.params.id;

    await Deliver.findByIdAndDelete(deliverId)
        .then(() => res.status(200).send({ status: "Deliver deleted" }))
        .catch((err) => res.status(500).send({ status: "Error with deleting deliver", error: err.message }));
});

// Get One Deliver by ID
router.route("/get/:id").get(async (req, res) => {
    let deliverId = req.params.id;

    await Deliver.findById(deliverId)
        .then((deliver) => res.status(200).send({ status: "Deliver fetched", deliver }))
        .catch((err) => res.status(500).send({ status: "Error with getting deliver", error: err.message }));
});

module.exports = router;
