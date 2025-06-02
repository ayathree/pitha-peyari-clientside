import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";

const UpdateItems = () => {
    const navigate = useNavigate();
    const items = useLoaderData();
    const {_id, title, description, imageUrl, adminEmail, customerSave, fakePrice, mainPrice, totalDiscount} = items || {};

    // State for all fields
    const [formData, setFormData] = useState({
        title: title || '',
        description: description || '',
        imageUrl: imageUrl || '',
        fakePrice: fakePrice || 0,
        mainPrice: mainPrice || 0,
        customerSave: customerSave || 0,
        totalDiscount: totalDiscount || 0
    });

    // Calculate savings and discount whenever prices change
    useEffect(() => {
        if (formData.fakePrice > 0 && formData.mainPrice > 0) {
            const savings = formData.fakePrice - formData.mainPrice;
            const discountPercent = Math.round((savings / formData.fakePrice) * 100);
            
            setFormData(prev => ({
                ...prev,
                customerSave: savings,
                totalDiscount: discountPercent
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                customerSave: 0,
                totalDiscount: 0
            }));
        }
    }, [formData.fakePrice, formData.mainPrice]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.includes('Price') ? Number(value) : value
        }));
    };

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        
        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/itemData/${_id}`,
                formData
            );
            console.log(data);
            toast.success('Product data updated successfully');
            navigate(`/allProduct/${adminEmail}`);
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Update failed');
        }
    };

    return (
        <div className="m-10">
            <h2 className="text-yellow-600 text-center capitalize text-2xl font-bold mt-10 underline">
                Update items
            </h2>
            
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <form onSubmit={handleFormSubmission}>
                    <div className="grid gap-6 mt-4 grid-cols-1">
                        {/* Product Name */}
                        <div>
                            <label className="text-yellow-600 dark:text-gray-200">Product Name</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                required
                            />
                        </div>

                        {/* Show Price */}
                        <div>
                            <label className="text-yellow-600 dark:text-gray-200">Show Price</label>
                            <input
                                name="fakePrice"
                                value={formData.fakePrice}
                                onChange={handleInputChange}
                                type="number"
                                min="0"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                required
                            />
                        </div>

                        {/* Offer Price */}
                        <div>
                            <label className="text-yellow-600 dark:text-gray-200">Offer Price</label>
                            <input
                                name="mainPrice"
                                value={formData.mainPrice}
                                onChange={handleInputChange}
                                type="number"
                                min="0"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                required
                            />
                        </div>

                        {/* Auto-calculated Saving Price */}
                        <div>
                            <label className="text-yellow-600 dark:text-gray-200">Saving Price</label>
                            <input
                                name="customerSave"
                                value={formData.customerSave}
                                type="number"
                                disabled
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        {/* Auto-calculated Discount */}
                        <div>
                            <label className="text-yellow-600 dark:text-gray-200">Discount</label>
                            <input
                                name="totalDiscount"
                                value={formData.totalDiscount}
                                type="number"
                                disabled
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-yellow-600 dark:text-gray-200">Description</label>
                            <input
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="text-yellow-600 dark:text-gray-200">Image Url</label>
                            <input
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 gap-2">
                        <button
                            type="submit"
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-yellow-600 rounded-md hover:bg-yellow-800 focus:outline-none focus:bg-gray-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default UpdateItems;