import { Router } from "express";
import AuthRoutes from "../modules/auth/auth.routes";
import CategoryRoutes from "../modules/category/category.routes";

const router = Router();

type TRouteModule = {
  path: string;
  route: Router;
};

const routerModules: TRouteModule[] = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});

export default router;
