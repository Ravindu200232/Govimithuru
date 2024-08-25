const router = require("express").Router();
let Order = require("../models/Order");

// Add Order
router.route("/add").post((req, res) => {
    const { orderId, customerName, product, quantitySold, totalPrice, saleDate, status } = req.body;

    const newOrder = new Order({
        orderId,
        customerName,
        product,
        quantitySold,
        totalPrice,
        saleDate: new Date(saleDate),  // Store only the date part
        status
    });

    newOrder.save()
        .then(() => res.json("Order Added"))
        .catch((err) => res.status(500).json({ message: err.message }));
});

// Get All Orders
router.route("/").get((req, res) => {
    Order.find()
        .then((orders) => res.json(orders))
        .catch((err) => res.status(500).json({ message: err.message }));
});

// Update Order
router.route("/update/:id").put(async (req, res) => {
    let orderId = req.params.id;
    const { customerName, product, quantitySold, totalPrice, saleDate, status } = req.body;

    const updateOrder = {
        customerName,
        product,
        quantitySold,
        totalPrice,
        saleDate: new Date(saleDate),  // Store only the date part
        status
    };

    await Order.findByIdAndUpdate(orderId, updateOrder)
        .then(() => res.status(200).send({ status: "Order updated" }))
        .catch((err) => res.status(500).send({ status: "Error with updating data", error: err.message }));
});

// Delete Order
router.route("/delete/:id").delete(async (req, res) => {
    let orderId = req.params.id;

    await Order.findByIdAndDelete(orderId)
        .then(() => res.status(200).send({ status: "Order deleted" }))
        .catch((err) => res.status(500).send({ status: "Error with deleting order", error: err.message }));
});

// Get One Order by ID
router.route("/get/:id").get(async (req, res) => {
    let orderId = req.params.id;

    await Order.findById(orderId)
        .then((order) => res.status(200).send({ status: "Order fetched", order }))
        .catch((err) => res.status(500).send({ status: "Error with getting order", error: err.message }));
});

module.exports = router;
