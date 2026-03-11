import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

const Home = () => {
    const token = "vZvNciqmBWGJi6nB"
    const [products, setProducts] = useState([])
    const fetchProducts = () => {
        axios.get("https://generateapi.techsnack.online/api/products", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                setProducts(res.data.Data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchProducts()
    }, [products])
    return (
        <div className='container'>
            <Row>
                {
                    products.map((item, index) => {
                        return (
                            <Col md="4" className='mt-3' key={index}>
                                <div className="p-3 rounded shadow-sm border border-1" key={index} >

                                    <div style={{ width: "100%", height: "220px", borderRadius: "8px", overflow: "hidden" }}>
                                        <img
                                            src={item.productimg}
                                            alt={item.productname}
                                            loading="lazy"
                                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        />
                                    </div>
                                    <h2>{item.productname}</h2>
                                    <div className="d-flex gap-2">
                                        <p><i className="fa-solid fa-indian-rupee-sign"></i>{item.productprice}</p>
                                        <p className="text-decoration-line-through text-muted"><i className="fa-solid fa-indian-rupee-sign"></i>{item.productdummyprice}</p>
                                    </div>
                                    <div className="mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i
                                                key={star}
                                                className={
                                                    star <= item.productrating
                                                        ? "fa-solid fa-star text-warning" // Filled star
                                                        : "fa-regular fa-star text-warning" // Empty star
                                                }
                                            ></i>
                                        ))}
                                    </div>
                                    <p>Rating : {item.productrating}</p>
                                    <hr />
                                    <div className="d-flex align-items-center gap-2">
                                        <span className='bg-dark text-white d-flex justify-content-center align-items-center rounded-circle' style={{ width: "40px", height: "40px" }}>{item.publisher.at(0).toUpperCase()}</span><span className='text-muted'>{item.publisher}</span>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default Home
