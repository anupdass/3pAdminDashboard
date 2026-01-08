import ClientAndPo from "../pages/purchaseTable/ClientAndPo";
import Dashboard from "../pages/Dashboard";
import Users from '../pages/Users'
import PurchaseOrderForm from "../pages/purchaseTable/PurchaseOrderForm";

/* 🔑 Node IDs */
export const NODES = [
    {
        id: 1,
        name: "Summary",
        path: "/",
        element: Dashboard,
        icon: "LayoutDashboard",
        children: [],
    },
    {
        id: 2,
        name: "Client & PO",
        icon: "LayoutDashboard",
        children: [
            {
                id: 2.1,
                name: "Create",
                path: "/createpurchase",
                element: PurchaseOrderForm,
            },
            {
                id: 2.2,
                name: "List",
                path: "/Client-po",
                element: ClientAndPo,
            },

        ],
    },
    {
        id: 3,
        name: "Issue PO & Expenditure",
        icon: "LayoutDashboard",
        path: "/issue",
    },
    {
        id: 4,
        name: "SE",
        icon: "LayoutDashboard",
        path: "/se",
    },
    {
        id: 5,
        name: "Salary & Conveyance",
        icon: "LayoutDashboard",
        path: "/salary",
    },
    {
        id: 6,
        name: "Expenditure & Received Amount",
        icon: "LayoutDashboard",
        path: "/rexpenditure",
    },
    {
        id: 7,
        name: "Local Purchase",
        icon: "LayoutDashboard",
        path: "/local-purchase",
    },
    {
        id: 8,
        name: "Conveyance",
        icon: "LayoutDashboard",
        path: "/conveyance",
        // children: [
        //     {
        //         id: 2.1,
        //         name: "Posts",
        //         path: "/posts",
        //         element: AllPosts,
        //     },
        // ],
    },
    {
        id: 9,
        name: "Configurations",
        icon: "Settings",
        children: [
            {
                id: 9,
                name: "User List",
                path: "/Dashboard",
                element: Users,
            },
        ],
    },


];
