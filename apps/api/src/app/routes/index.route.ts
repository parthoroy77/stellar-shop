import { Router } from "express";
import AddressRoutes from "../modules/address/address.routes";
import AttributeRoutes from "../modules/attributes/attribute.routes";
import AuthRoutes from "../modules/auth/auth.routes";
import BrandRoutes from "../modules/brand/brand.routes";
import CategoryRoutes from "../modules/category/category.routes";
import SellerRoutes from "../modules/seller/seller.routes";
import ShippingRoutes from "../modules/shipping/shipping.routes";
import TagRoutes from "../modules/tag/tag.routes";

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
  {
    path: "/attributes",
    route: AttributeRoutes,
  },
  {
    path: "/tags",
    route: TagRoutes,
  },
  {
    path: "/shippings",
    route: ShippingRoutes,
  },
];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});

export default router;
