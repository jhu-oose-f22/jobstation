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
    // console.log(`before add: ${user.username}`);
    // if (groups.length === 0) {
    await fetch("/group")
      .then((res) => res.json())
      .then((data) => {
        data.map((group) => {
          if (
            group.groupName.includes(searchInput) ||
            group.groupIntro.includes(searchInput)
          ) {
            searchResult = [...searchResult, group];

            // setSearchResult([...searchResult, group]);
          }
        });
      });
    done = true;
    // } else {
    //   console.log("no db ")
    //   groups.map((group) => {
    //     if (
    //       group.groupName.includes(searchInput) ||
    //       group.groupIntro.includes(searchInput)
    //     ) {
    //       console.log(group);
    //       // setSearchResult([...searchResult, group]);
    //       searchResult = [...searchResult, group];
    console.log(searchResult)
    //     }
    //   });
    //   done = true;
    // }

    if (done === true) {
      console.log(searchResult)

      navigate("/group/search-result", {
        state: {
          groups: searchResult,
        },
      });
    }
  };

  // console.log(searchResult);
  // if (done) {
  //   // console.log(searchResult)

  //   navigate("/group/search-result", {
  //     state: {
  //       groups: searchResult,
  //     },
  //   });
  // }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="groupName">Search</label>
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
