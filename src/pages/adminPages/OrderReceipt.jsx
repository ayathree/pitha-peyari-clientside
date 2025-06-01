import jsPDF from "jspdf";
import { useLoaderData } from "react-router";


const OrderReceipt = () => {
    const items = useLoaderData()

    const generatePDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.setTextColor(40, 40, 40);
        doc.text(`Pitha Peyari Order Receipt for ${items.map(item=>(item.customerInfo.name))} `, 105, 20, { align: 'center' });

        let yPos = 40; // Vertical position tracker

       items.forEach((order, index) => {
            // Order Header
            doc.setFontSize(14);
            doc.text(`Order #${index + 1}`, 14, yPos);
            
            // Customer Info
            doc.setFontSize(12);
            doc.text(`Customer: ${order.customerInfo.name || "N/A"}`, 14, yPos + 10);
            doc.text(`City: ${order.customerInfo.city}`, 14, yPos + 20);

            // Products Table
            doc.text("Items Ordered:", 14, yPos + 30);
            
            // Simple Table-like Structure
            order.products.forEach((product, pIndex) => {
                doc.text(
                    `- ${product.name} (${product.quantity}) -  Price: ${product.price || "N/A"} BDT`,
                    20,
                    yPos + 40 + (pIndex * 10)
                );
            });

            // Total Amount
            doc.setFontSize(12);
            doc.text(
                `Total Price: ${order.orderDetails.total} BDT`,
                14,
                yPos + 40 + (order.products.length * 10)
            );

            yPos += 60 + (order.products.length * 10); // Adjust for next order

            // Add new page if needed
            if (yPos > 250 && index <items.length - 1) {
                doc.addPage();
                yPos = 20;
            }
        });

        // Save the PDF
        doc.save(`order-receipt of ${items.map(item=>(item.customerInfo.name))}.pdf`);
    };
    return (
        <div>
            {items.map((order) => (
                <div key={order._id} className="mb-8 p-4 border rounded-lg">
                    <h2 className="text-lg font-semibold">
                        Order for {order.customerInfo.name}
                    </h2>
                    <p>City: {order.customerInfo.city}</p>
                    
                    <div className="mt-3">
                        <h3 className="font-medium">Items:</h3>
                        <ul className="list-disc pl-5">
                            {order.products.map((product) => (
                                <li key={product._id}>
                                    {product.name} ({product.quantity})
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="mt-2 font-bold">
                        Total: {order.orderDetails.total} BDT
                    </p>
                </div>
            ))}

            <button onClick={generatePDF} className="btn">Download Pdf</button>
        </div>
    );
};

export default OrderReceipt;