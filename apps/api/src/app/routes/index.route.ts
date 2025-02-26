import { Router } from "express";
import AddressRoutes from "../modules/address/address.routes";
import AttributeRoutes from "../modules/attributes/attribute.routes";
import AuthRoutes from "../modules/auth/auth.routes";
import BrandRoutes from "../modules/brand/brand.routes";
import CartRoutes from "../modules/cart/cart.routes";
import CategoryRoutes from "../modules/category/category.routes";
import CheckoutRoutes from "../modules/checkout/checkout.routes";
import OrderRoutes from "../modules/order/order.routes";
import PaymentMethodRoutes from "../modules/payment-method/payment-method.routes";
import ProductReviewRoutes from "../modules/product-review/product-review.routes";
import ProductRoutes from "../modules/product/product.routes";
import SellerRoutes from "../modules/seller/seller.routes";
import ShippingRoutes from "../modules/shipping/shipping.routes";
import SubOrderRoutes from "../modules/sub-order/sub-order.routes";
import TagRoutes from "../modules/tag/tag.routes";
import UserRoutes from "../modules/user/user.routes";
import WishlistRoutes from "../modules/wishlist/wishlist.routes";

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
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/carts",
    route: CartRoutes,
  },
  {
    path: "/wishlists",
    route: WishlistRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/checkout",
    route: CheckoutRoutes,
  },
  {
    path: "/payment-methods",
    route: PaymentMethodRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/sub-orders",
    route: SubOrderRoutes,
  },
  {
    path: "/product-reviews",
    route: ProductReviewRoutes,
  },
];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});

export default router;
