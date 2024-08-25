// routes/Card.js
const router = require("express").Router();
const Card = require("../models/Card");

// Add Card Item
router.post("/add", (req, res) => {
    const { itemNamec, categoryc, pricec } = req.body;

    // Validate that required fields are provided
    if (!itemNamec || !categoryc || !pricec) {
        return res.status(400).send({ status: "Error with adding card item", error: "Missing required fields" });
    }

    const newCard = new Card({
        itemNamec,
        categoryc,
        pricec,
    });

    newCard.save()
        .then(() => res.status(200).json("Card Item Added"))
        .catch((err) => res.status(500).send({ status: "Error with adding card item", error: err.message }));
});

// Get All Card Items
router.get("/", (req, res) => {
    Card.find()
        .then((cardItems) => res.status(200).json(cardItems))
        .catch((err) => res.status(500).send({ status: "Error with fetching card items", error: err.message }));
});

// Update Card Item
router.put("/update/:id", async (req, res) => {
    const itemId = req.params.id;
    const { itemNamec, categoryc, pricec } = req.body;

    // Validate that required fields are provided
    if (!itemNamec || !categoryc || !pricec) {
        return res.status(400).send({ status: "Error with updating card item", error: "Missing required fields" });
    }

    const updateCardItem = {
        itemNamec,
        categoryc,
        pricec,
    };

    try {
        const updatedItem = await Card.findByIdAndUpdate(itemId, updateCardItem, { new: true });
        if (!updatedItem) {
            return res.status(404).send({ status: "Error with updating card item", error: "Card item not found" });
        }
        res.status(200).send({ status: "Card item updated", updatedItem });
    } catch (err) {
        res.status(500).send({ status: "Error with updating card item", error: err.message });
    }
});

// Delete Card Item
router.delete("/delete/:id", async (req, res) => {
    const itemId = req.params.id;

    try {
        const deletedItem = await Card.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).send({ status: "Error with deleting card item", error: "Card item not found" });
        }
        res.status(200).send({ status: "Card item deleted" });
    } catch (err) {
        res.status(500).send({ status: "Error with deleting card item", error: err.message });
    }
});

// Get One Card Item by ID
router.get("/get/:id", async (req, res) => {
    const itemId = req.params.id;

    try {
        const cardItem = await Card.findById(itemId);
        if (!cardItem) {
            return res.status(404).send({ status: "Error with fetching card item", error: "Card item not found" });
        }
        res.status(200).send({ status: "Card item fetched", cardItem });
    } catch (err) {
        res.status(500).send({ status: "Error with fetching card item", error: err.message });
    }
});

module.exports = router;
