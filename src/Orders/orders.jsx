import React, { useState, useEffect } from 'react';
import './orders_module.css'

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://react-http-3e2dc-default-rtdb.firebaseio.com/order.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        const ordersData = Object.entries(data).map(([id, orderData]) => ({
          id: id,
          ...orderData
        }));
        console.log(ordersData);
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='ordersdiv1'> 

      <h1>New Orders</h1>
    
      {loading ? (
        <p>Loading orders...</p>
      ) : (
       
        <dl>
          {orders.map((order, index) => (
             <div className='ordersdiv2'>
            <li key={order.id}>
              <h3>Order {index + 1}</h3>
              <p>Name: {order.name}</p>
              <p>Price: {order.price}</p>
              <p>Size: {order.size}</p>
              <p>username: {order.username}</p>
              <p>email: {order.email}</p>
              <p>City: {order.city}</p>
              <p>state: {order.state}</p>
              <p>address: {order.address}</p>
              <p>Mobile no: {order.Mobileno}</p>
              <img src={order.Image} alt="Product Image" style={{ maxWidth: '200px' }} />
            </li>
            </div>
          ))}
        </dl>
        
      )}
    </div>
  );
}

export default Orders;
