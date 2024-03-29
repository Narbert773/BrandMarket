const express = require("express");
const { Basket, Good, Purchase, User } = require("../../db/models");

const apiOrdersRouter = express.Router();

apiOrdersRouter.get("/", async (req, res) => {
  try {
    const genders = await Good.findAll({
      include: [
        {
          as: "userPurchases",
          model: User,
          required: true,
          where: { id: res.locals.user ? res.locals.user?.id : null },
          attributes: ["id"],
          through: {
            model: Purchase,
          },
        },
      ],
    });
    return res.json(genders);
  } catch (error) {
    return res.status(500).json(error);
  }
});

apiOrdersRouter.post("/purchase", async (req, res) => {
  try {
    await Basket.destroy({ where: { userId: res.locals.user.id } });
    req.body.forEach(async (item) => {
      const good = await Good.findByPk(item.id);
      good.quantity -= item.quantity;
      good.save();
    });

    req.body.forEach(async (item) => {
      await Purchase.create({
        goodId: item.id,
        userId: res.locals.user.id,
        quantity: item.userBaskets[0].Baskets.quantity,
        orderPrice:
          item.userBaskets[0].Baskets.quantity *
          item.userBaskets[0].Baskets.price,
      });
    });

    return res.status(200);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = apiOrdersRouter;
