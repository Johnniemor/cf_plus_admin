interface Warehouse {
    _id: string;
    name: string;
    address: string;
    contract: string;
    owner: string;
    created_at: string;
    updated_at: string;
    __v: number;
}

interface IProductDetail {
    _id: string;
    warehouse_id: Warehouse;
    code: string;
    cf_code: string;
    name: string;
    pos_price: number;
    cf_price: number;
    online_price: number;
    photos: string[];
}

interface ApiResponse {
    status: string;
    data:IProductDetail;
}