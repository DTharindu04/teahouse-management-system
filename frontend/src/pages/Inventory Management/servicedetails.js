
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "../../assets/css/InventoryMangement/servicedetails.css";
import inventoryLogo from "../../assets/img/inventory.jpg";



function Servicedetails() {
    const componentPDF = useRef();
    const [showcustomer, setshowcustomer] = useState([]);
    const [searchkey, setsearchkey] = useState("");

    // Fetch Data (Read)
    const getfetchdata = async () => {
        try {
            const data = await axios.get("http://localhost:5000/inventory/inventorydetails");
            if (data.data.success) {
                setshowcustomer(data.data.data);
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    // Delete Record
    const handledelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            const data = await axios.delete("http://localhost:5000/inventory/order_delete/" + id);
            if (data.data.success) {
                getfetchdata();
                alert("Deleted Successfully!");
            }
        }
    };

    // Generate PDF
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Service Details Report",
        onAfterPrint: () => alert("PDF saved successfully!"),
    });



    // Search Functionality
    const handlesearch = () => {
        filterdata(searchkey);
    };

    const filterdata = (searchKey) => {
        const filteredData = showcustomer.filter((customer) =>
            customer.name.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowcustomer(filteredData);
    };

    return (
        <div className="showservices">
            {/* Search Box */}
            <div className="searchbtn">
                <input
                    type="search"
                    onChange={(e) => setsearchkey(e.target.value)}
                    placeholder="Search"
                    className="in"
                />
                <button id="search-btn" onClick={handlesearch}>Search</button>
            </div>

            {/* PDF Content */}
            <div ref={componentPDF} className="pdf-container">
                {/* Logo and Sentence in Front of Logo */}
                <div className="logo-container">
                    <img
                        src={inventoryLogo}
                        alt="Inventory Logo"
                        className="pdf-logo"
                    />
                    <span className="logo-text"><h2>Tea  Factory  Management  System - Inventory  Report</h2></span>
                </div>

                {/* Table */}
                <table className="pdf-table">
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Unit Price (LKR)</th>
                            <th>Net Weight (g)</th>
                            <th>In Stock</th>
                            <th className="no-print">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showcustomer.map((e1) => (
                            <tr key={e1._id}>
                                <td>{e1.p_id}</td>
                                <td>{e1.name}</td>
                                <td>{e1.price}</td>
                                <td>{e1.quantity}</td>
                                <td>{e1.total}</td>
                                <td className="dback no-print">
                                    <a href={`/update_service/${e1._id}`} className="no-print">Edit</a>
                                    <button onClick={() => handledelete(e1._id)} className="no-print">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           
           {/* PDF Download Button */}
           <button onClick={generatePDF}>Download Report</button>
                 

        </div>
    );
}

export default Servicedetails;
