const koa = require("koa");
const json = require("koa-json");
const koaRouter = require("koa-router");
const render = require("koa-ejs");
const bodyparser = require("koa-bodyparser");
const path = require("path");

const app = new koa();
const port = 5000;

app.use(json());
app.use(bodyparser());

const router = new koaRouter();
const wells = [
  "SE EUREKA UNIT",
  "CHRISTENSEN",
  "VELMA",
  "GRAY",
  "NORTH CARMEN RED FORK UNIT",
  "LESLIE",
  "MEANS 'C'",
  "LSB MCCRADY"
];

// set router middleware
app.use(router.routes()).use(router.allowedMethods());

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
});

router.get("/", async (ctx) => {
  await ctx.render("index", {
    title: "Underground Injection Control Wells ",
    wells: wells,
  });
});

router.get("/addwell", async (ctx) => {
  await ctx.render("add");
});

router.post("/addwell", addWell);

async function addWell(ctx) {
  const body = ctx.request.body;
  const well = body.well.toUpperCase();
  wells.push(well);
  ctx.redirect("/");
}

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
