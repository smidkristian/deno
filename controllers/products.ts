import { v4 } from 'https://deno.land/std@0.88.0/uuid/mod.ts';
import { Product } from '../types.ts';

let products: Product [] = [
    {
        id: "1",
        name: "Product One",
        description: "This is product one",
        price: 29.99,
    },
    {
        id: "2",
        name: "Product Two",
        description: "This is product two",
        price: 39.99,
    },
    {
        id: "3",
        name: "Product Three",
        description: "This is product three",
        price: 49.99,
    },
    {
        id: "4",
        name: "Product Four",
        description: "This is product four",
        price: 59.99,
    },
];

// @desc    Get all products
// @route   GET /products

const getProducts = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: products
    }
}

// @desc    Get single product
// @route   GET /products/:id

const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {

    const product: Product | undefined = products.find( p => p.id === params.id )

    if (product) {
        response.status = 200;
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}
const addProduct = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body();

    if (!request.hasBody) {
        response.status = 400;
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        const product: Product = body.value;
        product.id = v4.generate();
        products.push(product);
        response.status = 201;
        response.body = {
            success: true,
            data: product
        }

    }
}

export { getProducts, getProduct, addProduct }