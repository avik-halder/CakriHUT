// import React, { useState } from "react";
// import "./SearchBar.css";

// const SearchBar = ({ onSearch }) => {
//   const [category, setCategory] = useState("");
//   const [location, setLocation] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch(category, location);
//   };

//   return (
//     <div className="container" id="searchbg">
//       <div className="search_bar_text_1">
//         <p style={{ fontWeight: "600" }}>FIND YOUR DREAM JOB</p>
//       </div>
//       <div className="search_bar_text_2">
//         <p>Simple, Fast and Efficient</p>
//       </div>

//       <div className="customSearch">
//         <form className="d-flex" onSubmit={handleSearch}>
//           <select
//             className="form-control me"
//             id="leftSearch"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Select Job Category</option>
//             <option value="Web Development">Web Development</option>
//             <option value="Software Development">Software Development</option>
//             <option value="Marketing">Marketing</option>
//             <option value="Design">Design</option>
//             <option value="Sales">Sales</option>
//             <option value="Customer Support">Customer Support</option>
//             {/* Add more categories as needed */}
//           </select>

//           <select
//             className="form-control me"
//             id="rightSearch"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           >
//             <option value="">Select location</option>
//             <option value="Dhaka">Dhaka</option>
//             <option value="Kaliakoir">Kaliakoir</option>
//             <option value="Mirpur">Mirpur</option>
//             <option value="Uattara">Uattara</option>
//             <option value="New York">New York</option>
//             <option value="London">London</option>
//             {/* Add more locations as needed */}
//           </select>

//           <button className="btn btn-outline-info" id="searchBtn" type="submit">
//             <i className="fa-solid fa-magnifying-glass"></i> Search
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;



import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(category, location);
  };

  return (
    <div className="container" id="searchbg">
      <div className="search_bar_text_1">
        <p style={{ fontWeight: "600" }}>FIND YOUR DREAM JOB</p>
      </div>
      <div className="search_bar_text_2">
        <p>Simple, Fast and Efficient</p>
      </div>

      <div className="customSearch">
        <form className="d-flex" onSubmit={handleSearch}>
          <select
            className="form-control me"
            id="leftSearch"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Job Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Software Development">Software Development</option>
            <option value="Education">Education</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            <option value="Sales">Sales</option>
            <option value="Customer Support">Customer Support</option>
            <option value="Finance">Finance</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Healthcare">Healthcare</option>
          </select>

          <select
            className="form-control me"
            id="rightSearch"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select location</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Faridpur">Faridpur</option>
            <option value="Chittagong">Chittagong</option>
            <option value="Khulna">Khulna</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Barisal">Barisal</option>
            <option value="Comilla">Comilla</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Cox's Bazar">Cox's Bazar</option>
            <option value="Jessore">Jessore</option>
            <option value="London">London</option>
            <option value="New York">New York</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Singapore">Singapore</option>
            <option value="Sydney">Sydney</option>
          </select>

          <button className="btn btn-outline-info" id="searchBtn" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;