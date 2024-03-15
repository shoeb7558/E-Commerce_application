import React, { useState } from 'react';

function UserInfo({ productInfo }) {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [address, setaddress] = useState('');
    const [Mobileno, setMobileno] = useState('');
    const [altMobileno, setaltMobileno] = useState('');

    const handleFormsubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const selectedSizeItem = {
                ...productInfo, // Include product information
                username,
                email,
                city,
                state,
                address,
                Mobileno,
                altMobileno
            };

            const response = await fetch(`https://react-http-3e2dc-default-rtdb.firebaseio.com/order.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedSizeItem),
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            console.log('Order placed successfully');
            console.log(selectedSizeItem)
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleFormsubmit}>
                <h1>Shipping information</h1>
                <p>Name</p>
                <input
                    placeholder='Name'
                    type='text'
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />
                <p>Email</p>
                <input
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
                <p>City Name</p>
                <input
                    placeholder='City'
                    type='text'
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                />
                <p>State</p>
                <input
                    placeholder='State'
                    type='text'
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                />
                <p>Address</p>
                <input
                    placeholder='Address'
                    type='text'
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                />
                <p>Mobile No</p>
                <input
                    placeholder='Mobile No'
                    type='text'
                    value={Mobileno}
                    onChange={(e) => setMobileno(e.target.value)}
                />
                <p>Alternate Mobile No</p>
                <input
                    placeholder='Alternate Mobile No'
                    type='text'
                    value={altMobileno}
                    onChange={(e) => setaltMobileno(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserInfo;
