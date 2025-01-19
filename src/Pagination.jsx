import React, { useState, useEffect } from 'react';

const Pagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Current Page:', currentPage);
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < Math.ceil(employees.length / rowsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          backgroundColor: 'darkgreen',
          padding: '10px',
          borderRadius: '2px',
        }}
      >
        Employee Data Table
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
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

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{
            marginRight: '10px',
            backgroundColor: currentPage === 1 ? 'gray' : 'darkgreen',
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            border: '2px',
          }}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === Math.ceil(employees.length / rowsPerPage)}
          style={{
            marginLeft: '10px',
            backgroundColor:
              currentPage === Math.ceil(employees.length / rowsPerPage) ? 'gray' : 'darkgreen',
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            border: '2px',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
