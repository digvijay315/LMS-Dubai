import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import axios from "axios";
import { base_url } from "../Utils/base_url";
import { toast, ToastContainer } from "react-toastify";
import { FiEdit, FiTrash } from 'react-icons/fi';

function Region() {
  const [Region, setRegion] = useState({
    region: "",
  });

  const [All_Region, setAll_Region] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [totalPages, settotalPages] = useState();

  const Add_Region = async () => {
    try {
      const resp = await axios.post(`${base_url}/api/lookup/SaveLookup`, {
        lookup_id: lookup_id ? lookup_id : null,
        lookup_type: "region",
        lookup_value: Region.region,
      });
      if (resp.status === 200) {
        toast.success("Region Saved", { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRegion = async () => {
    try {
      const params = new URLSearchParams();

      // Pagination
      params.append("page", currentPage);
      params.append("limit", itemsPerPage);

      // Always include lookup_type
      params.append("lookup_type", "region");

      const resp = await axios.get(
        `${base_url}/api/lookup/LookupList?${params.toString()}`
      ); // replace with your API
      setAll_Region(resp.data.data);
      settotalPages(resp.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegion();
  }, [currentPage, itemsPerPage]);

//   handle edit
const[lookup_id,setlookup_id]=useState("")
const handleEdit=(item)=>
{
    setRegion({...Region,region:item.lookup_value})
    setlookup_id(item._id)
}



  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <Header />

        {/* Training Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-purple-900 mb-4">
            Region Form
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Training Category</label>
              <input
                type="text"
                placeholder="Region"
                className="w-full border border-gray-300 rounded-md p-2"
                value={Region.region}
                onChange={(e) =>
                  setRegion({
                    ...Region,
                    region: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-900"
            onClick={Add_Region}
          >
            Save
          </button>
        </div>

        {/* Training Types Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            All Region
          </h2>
          <table className="min-w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">S.No.</th>
                <th className="px-4 py-2 border">Region</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {All_Region.map((item, index) => (
                <tr key={index} className="text-left border-b">
                  <td className="px-4 py-2 border">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-4 py-2 border">{item.lookup_value}</td>
                  <td className="px-4 py-2 border flex space-x-3">
  {/* Edit Icon */}
  <i 
    className="fa fa-edit cursor-pointer text-gray-600 hover:text-blue-600"
    onClick={() => handleEdit(item)}
  ></i>

  {/* Delete Icon */}
  <i 
    className="fa fa-trash cursor-pointer text-gray-600 hover:text-red-600"
    // onClick={() => handleDelete(item)}
  ></i>
</td>

                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            {/* Limit Dropdown */}
            <div className="flex items-center space-x-2">
              <label
                htmlFor="itemsPerPage"
                className="text-gray-700 font-medium"
              >
                Items:
              </label>
              <select
                id="itemsPerPage"
                className="border rounded-md px-2 py-1"
                value={itemsPerPage}
                onChange={(e) => {
                  setitemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when limit changes
                }}
              >
                {[5, 10, 15, 20, 25].map((limit) => (
                  <option key={limit} value={limit}>
                    {limit}
                  </option>
                ))}
              </select>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>

               {(() => {
      let startPage = Math.max(currentPage - 1, 1);
      let endPage = Math.min(startPage + 2, totalPages);

      // Adjust startPage if near the end
      if (endPage - startPage < 2) {
        startPage = Math.max(endPage - 2, 1);
      }

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-purple-700 text-white font-semibold"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ));
    })()}

              <button
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Region;
