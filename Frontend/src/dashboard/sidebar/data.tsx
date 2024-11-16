import {
  Blocks,
  DiamondPlus,
  FilePlus,
  House,
  LayoutList,
  ShoppingCart,
  TableProperties,
  UserPlus,
  Users,
} from "lucide-react";

export const data = [
  {
    title: "Home",
    icon: <House />,
    link: "/",
    allowedRoles: ["admin", "employee1", "employee2"],
  },
  {
    title: "All Employees",
    icon: <Users />,
    link: "/admin/allEmployees",
    allowedRoles: ["employee1", "employee2","admin"],
  },
  {
    title: "Product List",
    icon: <LayoutList />,
    link: "/admin/allProducts",
    allowedRoles: ["employee1", "employee2","admin"],
  },
  {
    title: "Parts List",
    icon: <TableProperties />,
    link: "/admin/allParts",
    allowedRoles: ["employee1", "employee2","admin"],
  },
  {
    title: "All Orders",
    icon: <ShoppingCart />,
    link: "/admin/allOrders",
    allowedRoles: ["admin"],
  },
  {
    title: "Emp ID & Pass Generate",
    icon: <UserPlus />,
    link: "/admin/idPassGenerate",
    allowedRoles: ["admin"],
  },
  {
    title: "Create PO Form",
    icon: <FilePlus />,
    link: "/admin/createPOForm",
    allowedRoles: ["admin"],
  },
  {
    title: "Order Punch",
    icon: <DiamondPlus />,
    link: "/admin/orderPunch",
    allowedRoles: ["employee1", "employee2", "admin"],
  },
  // {
  //   title: "View Orders",
  //   icon: <Rows4 />,
  //   link: "/admin/viewOrders",
  //   allowedRoles: ["employee1", "employee2","admin"],
  // },
  {
    title: "Add Items",
    icon: <Blocks />,
    link: "/admin/addItems",
    allowedRoles: ["employee1", "employee2","admin"],
  },

  // {
  //   title: "PO Generate",
  //   icon: <DocIcon />,
  //   link: "/admin/documentation",
  //   allowedRoles: ["employee1", "employee2", "admin"],
  // },
];
