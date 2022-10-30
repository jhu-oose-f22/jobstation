import { useContext, useState } from "react";
import { UserContext } from "../context/User";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";

export default function SearchGroup({ groups }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    // console.log(`before add: ${user.username}`);
    if (groups.length === 0) {
      await fetch("/group")
        .then((res) => res.json())
        .then((data) => {
          data.map((group) => {
            if (
              group.groupName.includes(searchInput) ||
              group.groupIntro.includes(searchInput)
            ) {
              setSearchResult([...searchResult, group]);
            }
          });
        });
    } else {
      // console.log("no db ")
      groups.map((group) => {
        if (
          group.groupName.includes(searchInput) ||
          group.groupIntro.includes(searchInput)
        ) {
          setSearchResult([...searchResult, group]);
        }
      });
    }
  };

  // console.log(searchResult);
  if (searchResult.length > 0) {
    // console.log(searchResult)

    navigate("/group/search-result", {
      state: {
        groups: searchResult,
      },
    });
  }

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
      {/* <Link
        to="./search-result"
        state={{
          fetched_groups: searchResult,
        }}
      > */}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleSearch()}
        >
          go
        </button>
      {/* </Link> */}
    </form>
  );
}
