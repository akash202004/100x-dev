interface Order {
    price: number;
    quantity: number;
    orderId: number;
}

interface Bid extends Order {
    side: "BID"
}

interface Ask extends Order {
    side: "ASK"
}   

interface OrderBook {
    bids: Bid[];
    asks: Ask[];
}   

export const orderbook: OrderBook = {
    bids: [],
    asks: []
}

export const bookWithQuantity: {bids: {[price: number]: number}; asks: {[price: number]: number}} = {
    bids: {},
    asks: {}
}