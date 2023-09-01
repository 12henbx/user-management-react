import { useContext, useEffect, useState } from "react"
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import UserProvider from "../../store/user-context";

const ContentLayout = () => {
    const navigate = useNavigate();
    const itemsPerPage = 4
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [listOfUsers, setListOfUsers] = useContext(UserProvider);
    const [dataUser, setDataUser] = useState([]);
    useEffect(() => {
        if(listOfUsers.length === 0) {
            fetch('https://fakestoreapi.com/users')
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const users = []
    
                    for (const key in data) {
                        const product = {
                            ...data[key],
                        }
                        users.push(product)
                    }
                    setDataUser(users)
                    setListOfUsers(users)
                    // Set total pages for pagination
                    setTotalPages(Math.ceil(users.length / itemsPerPage))
                })
        } else { // If there is an update
            console.log(listOfUsers);
            setDataUser(listOfUsers)
            // Set total pages for pagination
            setTotalPages(Math.ceil(dataUser.length / itemsPerPage))
        }
    }, []);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // subset for list of data in one index of pagination
    const subset = dataUser.slice(startIndex, endIndex);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleDelete = (index) => {
        fetch(`https://fakestoreapi.com/users/${index}`,{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>console.log(`Delete user index: ${index} Success`))
    }

	return (
		<div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {subset.map((user, index) => (
                    <tr>
                        {/* Use Optional Chaining for anti-broken data */}
                        <td>{user?.id}</td>
                        <td><a href={`/users/${user?.id}`}>{user?.name?.firstname}</a></td> 
                        <td>{user?.address?.street}</td>
                        <td>{user?.email}</td>
                        <td>{user?.phone}</td>
                        <td>
                            <button onClick={() => navigate(`/user/edit/${user?.id}`)}>Edit</button>
                            <button onClick={() => handleDelete(user?.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <ReactPaginate
            containerClassName={"pagination-container"}
            activeClassName={"active-page"}
                pageCount={totalPages}
                onPageChange={handlePageChange}
                forcePage={currentPage}
            />
        </div>
	)
}

export default ContentLayout