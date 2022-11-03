import { useContext, useState } from "react";
import { UserContext } from "../../context/User";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";

export default function SearchGroup({ groups }) {
    const [searchInput, setSearchInput] = useState("");
    // const [searchResult, setSearchResult] = useState([]);
    let searchResult = [];
    const navigate = useNavigate();
    let done = false;
    const handleSearch = async (e) => {
<<<<<<< HEAD
=======
        if (searchInput === "") return;
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
        await fetch(`/group/search/${searchInput}`)
            .then((res) => res.json())
            .then((data) => (searchResult = data));
        done = true;

        if (done === true) {
            console.log(searchResult);

            navigate("/group/search-result", {
                state: {
                    groups: searchResult,
                },
            });
        }
    };

    return (
        <form>
            <div className="form-group">
                <label for="groupName">Search</label>
                <input
                    className="form-control"
                    id="groupName"
                    placeholder="search here"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>

            <button
                type="button"
                className="btn btn-success"
                onClick={() => handleSearch()}
            >
                go
            </button>
        </form>
    );
}
