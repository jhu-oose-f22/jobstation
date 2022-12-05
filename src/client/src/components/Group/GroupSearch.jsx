import { useContext, useState } from "react";
import { UserContext } from "../../context/User";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../../context/Const";

export default function SearchGroup({ groups }) {
    const [searchInput, setSearchInput] = useState("");
    // const [searchResult, setSearchResult] = useState([]);
    let searchResult = [];
    const navigate = useNavigate();
    let done = false;
    const handleSearch = async (e) => {
        if (searchInput === '') return;
        await fetch(`${API_URL}/group/search/${searchInput}`)
            .then((res) => res.json())
            .then((data) => (searchResult = data));
        done = true;

        if (done === true) {
            //console.log(searchResult);

            navigate("/group/search-result", {
                state: {
                    groups: searchResult,
                },
            });
        }
    };

    return (
        <form className="m-2 border p-4 border-2 border-primary border-opacity-25 rounded-3">
            <label for="groupName">Search</label>
            <div className="form-group d-flex">
                <input
                    className="form-control"
                    id="groupName"
                    placeholder="search here"
                    autoComplete="off"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-primary col-1"
                    onClick={() => handleSearch()}
                >
                    go
                </button>
            </div>
        </form>
    );
}
