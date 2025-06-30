const { Router } = require("express");
const stockRouter = require("./stock.route");

const router = Router();
const routes = [
  {
    path: "/stocks",
    route: stockRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
