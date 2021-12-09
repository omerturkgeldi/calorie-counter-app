import React from 'react'
import ProductForm from '../../components/Products/ProductForm'
import ProductList from '../../components/Products/ProductList'

const Products = () => {
    return (
        <div>
            <div className="col-md-12">
                <ProductForm />
            </div>
            <div className="col-md-12">
                <ProductList />
            </div>
        </div>
    )
}

export default Products
