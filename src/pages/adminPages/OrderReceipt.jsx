import jsPDF from "jspdf";
import { useLoaderData } from "react-router";


const OrderReceipt = () => {
    const item = useLoaderData()
    console.log(item);

    const generatePDF = () => {
        const doc = new jsPDF();

        //  Set initial styles
doc.setFont('helvetica');
doc.setFontSize(12);

// Title
doc.setFontSize(16);
doc.setFont('helvetica', 'bold');
        doc.text(`Pitha Peyari Order Receipt for ${item.customerInfo.name} `, 105, 20, { align: 'center' });

       // Reset font for body
doc.setFontSize(12);
doc.setFont('helvetica', 'normal');

// Customer information section
let yPos = 40;
doc.text(`Customer Name: ${item.customerInfo?.name || "N/A"}`, 20, yPos);
doc.text(`Address: ${item.customerInfo?.address || "N/A"}`, 20, yPos + 10);
doc.text(`Phone: ${item.customerInfo?.phone || "N/A"}`, 20, yPos + 20);

// Format date properly
const orderDate = item.orderDetails?.date ? 
  new Date(item.orderDetails.date).toLocaleDateString() : "N/A";
doc.text(`Order Date: ${orderDate}`, 20, yPos + 30);

// Payment method
doc.text(`Payment Method: ${item.orderDetails?.method || "N/A"}`, 20, yPos + 40);

// Pricing section with proper alignment
yPos += 60;
doc.setFont('helvetica', 'bold');
doc.text('Order Summary', 20, yPos);
doc.setFont('helvetica', 'normal');

// Format currency values
const formatCurrency = (amount) => isNaN(amount) ? "0 BDT" : `${amount}`;

doc.text(`Subtotal: ${formatCurrency(item.orderDetails?.subtotal)} BDT`, 20, yPos + 10);
doc.text(`Shipping Fee: ${formatCurrency(item.orderDetails?.shippingFee)} BDT`, 20, yPos + 20);
doc.text(`Discount: ${formatCurrency(item.orderDetails?.totalDiscounting.toFixed(2))} %`, 20, yPos + 30);

// Total with emphasis
doc.setFont('helvetica', 'bold');
doc.text(`Grand Total: ${formatCurrency(item.orderDetails?.total)} BDT`, 20, yPos + 45);

        // Save the PDF
        doc.save(`order-receipt of ${item.customerInfo.name}.pdf`);
    };
    return (
        <div className="mt-20">
            
                <div className="mb-8 p-4 border rounded-lg border-yellow-800 bg-amber-100 dark:bg-black">
                    <h2 className=" font-bold text-2xl text-yellow-600 mb-2">
                        Order for:
                    </h2>
                    <p><span className="font-bold text-xl">Customer:</span> {item.customerInfo.name}</p>
                    <p><span className="font-bold text-xl">Phone:</span> {item.customerInfo.phone}</p>
                    <p><span className="font-bold text-xl">Address:</span> {item.customerInfo.address}</p>
                    <p><span className="font-bold text-xl">Method:</span> {item.orderDetails.method}</p>
                    
                    <div className="mt-3">
                        <h3 className="font-bold text-xl text-yellow-600 ">Ordered Items:</h3>
                        <ul className="list-disc pl-5">
                            {item.products.map((product) => (
                                <li key={product._id}>
                                    {product.name} ({product.quantity})
                                </li>
                            ))}
                        </ul>
                    </div>

                     <h3 className="font-bold text-xl mt-3 text-yellow-600">Order Details:</h3>

                    <li >
                        <span className=" font-bold">Sub Total:</span> {item.orderDetails.subtotal} BDT</li>
                        
                        <li><span className="font-bold">Shipping Fee:</span> {item.orderDetails.shippingFee} BDT</li>
                        
                        <li><span className=" font-bold">Discount:</span>{item.orderDetails.totalDiscounting.toFixed(2)}%</li>
                        
                       <li> <span className=" font-bold">Grand Total:</span> {item.orderDetails.total} BDT</li>


                    
                </div>
            

            <button onClick={generatePDF} className="btn bg-yellow-600 hover:bg-amber-800 text-white">Download Pdf</button>
        </div>
    );
};

export default OrderReceipt;