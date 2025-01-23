import React, { useState, useEffect } from "react";

const Pagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        alert("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate paginated data
  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Handle pagination logic
  const handleNext = () => {
    if (employees.length > currentPage * rowsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          backgroundColor: "darkgreen",
          padding: "10px",
          borderRadius: "2px",
          color: "white",
        }}
      >
        Employee Data Table
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button
          onClick={handlePrevious}
          style={{
            marginRight: "10px",
            backgroundColor: currentPage > 1 ? "darkgreen" : "gray",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            border: "2px",
            cursor: currentPage > 1 ? "pointer" : "not-allowed",
          }}
        >
          Previous
        </button>
        <span
          style={{
            marginRight: "10px",
            backgroundColor: "darkgreen",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            border: "2px",
          }}
        >
          {currentPage}
        </span>
        <button
          onClick={handleNext}
          style={{
            marginLeft: "10px",
            backgroundColor:
              employees.length > currentPage * rowsPerPage ? "darkgreen" : "gray",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            border: "2px",
            cursor: employees.length > currentPage * rowsPerPage ? "pointer" : "not-allowed",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

