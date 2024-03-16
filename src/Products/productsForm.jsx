import React, { useState } from 'react';
import './product_form.css';

function ProductsForm() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        Sex: '',
        Image: '',
        sizes: {
            small: false,
            medium: false,
            large: false,
        },
    });
    const handleChange = (e) => {
        if (e.target.id === 'name' || e.target.id === 'price' || e.target.id === 'Image' || e.target.id === 'Sex') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        } else {
            setFormData({
                ...formData,
                sizes: {
                    ...formData.sizes,
                    [e.target.id]: e.target.checked,
                },
            });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch('https://react-http-3e2dc-default-rtdb.firebaseio.com/products_item.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convert formData to JSON
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            console.log('Data submitted successfully');

            // Clear the form after submission
            setFormData({
                name: '',
                price: '',
                Sex: '',
                Image: '',
                sizes: {
                    small: false,
                    medium: false,
                    large: false,
                },
            });
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div>
            <div className='div2'>
                <form className='form1' onSubmit={handleSubmit}>
                    <label htmlFor="name" className='Labels1'>
                        Name
                    </label>
                    <input
                        id="name"
                        placeholder="Name"
                        className='input1'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="price" className='Labels1'>
                        Price
                    </label>
                    <input
                        id="price"
                        placeholder="Price"
                        className='input1'
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="Sex" className='Labels1'>
                        Sex
                    </label>
                    <input
                        id="Sex"
                        placeholder="Male/Female"
                        className='input1'
                        value={formData.Sex}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="description" className='Labels1'>
                        Image URL
                    </label>
                    <input
                        id="Image"
                        placeholder="Image URL"
                        className='input1'
                        value={formData.Image}
                        onChange={handleChange}
                        required
                    />

                    <label className='Labels1'>Sizes:</label>
                    <div className='sizediv'>
                        <label htmlFor="small" className='Labels1'>
                            S
                            <input
                                id="small"
                                type="checkbox"
                                checked={formData.sizes.s}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="medium" className='Labels1'>
                            M
                            <input
                                id="medium"
                                type="checkbox"
                                checked={formData.sizes.m}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="large" className='Labels1'>
                            L
                            <input
                                id="large"
                                type="checkbox"
                                checked={formData.sizes.l}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <button type="submit" className='submitbutton'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductsForm;
