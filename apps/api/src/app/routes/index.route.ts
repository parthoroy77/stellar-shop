import { Router } from "express";
import AddressRoutes from "../modules/address/address.routes";
import AuthRoutes from "../modules/auth/auth.routes";
import BrandRoutes from "../modules/brand.routes";
import CategoryRoutes from "../modules/category/category.routes";
import SellerRoutes from "../modules/seller/seller.routes";

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
  {
    path: "/addresses",
    route: AddressRoutes,
  },
  {
    path: "/sellers",
    route: SellerRoutes,
  },
  {
    path: "/brands",
    route: BrandRoutes,
  },
];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});

export default router;
