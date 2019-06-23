// may be switch to calling a rest endpoint like
// https://api.github.com/search/repositories?q=angular&sort=stars&order=desc

const MOCKORDERITEM = {
    itemno: 1,
    itemcode: "20-001",
    description: "Printing Paper",
    quantity: 0,
    rate: 20,
    amount: 0
};

const MOCKORDER = {
    orderid: "100000-ZZ-A",
    customer: {
        name: "ABC Limited",
        address: "20 Main St, San Jose, CA"
    },
    orderdate: "2018-01-06T00:00:00Z",
    status: "Complete",
    destination: "San Jose",
    amount: 0,
    tax: 0,
    orderitems: [
    ]
};

export function growMockData(count){
    let data = [];
    for(let i=0;i<count;i++){
        let order = {
            ...MOCKORDER
        };
        order.orderitems = [];
        let orderamount = 0;
        for(let j=0;j<10;j++){
            let item = {
                ...MOCKORDERITEM
            };
            item.itemno = j+1;
            item.quantity = (j+1)*10;
            item.rate = (89 - (j+20));
            item.amount = item.quantity*item.rate;
            orderamount+=item.amount;
            order.orderitems.push(item);
        }
        order.orderid = order.orderid+"-"+i;
        order.amount = orderamount;
        order.tax = Math.round(orderamount*8)/100;
        data.push(order);
    }
    return data;
}
