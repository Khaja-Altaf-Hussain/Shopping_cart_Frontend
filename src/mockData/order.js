export const mockOrders=[
    {
        _id:"ord_1001",
        orderDate:"2026-01-01",
        totalAmount:150.75,
        status:"Delivered",
        items:[
            { productId:"prod_abc",name:"Wireless Mouse",quantity:1,price:25.50},
            { productId:"prod_def",name:"Mechanical Keyboard",quantity:1,price:125.25},
        ]
    },
    {
        _id:"ord_1002",
        orderDate:"2026-02-01",
        totalAmount:75.00,
        status:"Shipped",
        items:[
            { productId:"prod_ghi",name:"USB-C Hub",quantity:2,price:37.50},
        ]
    },
    {
        _id:"ord_1003",
        orderDate:"2026-03-01",
        totalAmount:210.00,
        status:"Delivered",
        items:[
            { productId:"prod_jkl",name:"27-inch Monitor",quantity:1,price:210.00},
        ]
    },
]