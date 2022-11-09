import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../context/Const";


export default function TagList({ tag, isHidden = true, onClick = () => { } }) {
    return <div className="d-flex align-items-center">
        tags:
        {!tag || Object.keys(tag).length === 0 ?
            <span className="text-muted ms-2"> no tags</span>
            :
            <div className={`${isHidden ? "d-flex overflow-hidden" : "d-fluid"}`}>{tag.map((val, idx) => {
                return <button className="btn btn-light  btn-sm mx-1 w-auto my-1 border" type="button"
                    key={val} title={val}
                    onClick={() => onClick(idx)}
                >
                    <strong className="small text-dark">{val}</strong>
                </button>
            })}</div>}
    </div>
}

export function TagSelection({ tag, setTag, setError = () => { } }) {

    const [allTagList, setTagList] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const getTags = () => {
        axios.get(`${API_URL}/tags`).then(
            (res) => {
                setTagList(res.data);
            },
            (err) => {
                console.log(err.message);
            }
        );
    };

    useEffect(() => getTags(), []);

    return <div className="w-100">
        <label htmlFor="searchTag">Tags you like</label>
        <div className="input-group my-2">
            <input type="search" id="searchTag" className="form-control"
                list="tagList"
                placeholder="Search for tags"
                autoComplete="off"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
            />

            <div className="input-group-append h-100">
                <button className="btn btn-primary p-2 h-100 w-auto rounded-0" type="button"
                    onClick={
                        e => {
                            e.preventDefault();
                            setError('');
                            if (tagInput === '') {
                                setError('Please enter a tag');
                                return
                            }
                            if (tag.includes(tagInput)) {
                                setError('Tag already added');
                                return
                            }

                            if (allTagList.find(({ Name }) => Name === tagInput)) {
                                setTag([...tag, tagInput]);
                                setTagInput('');
                            } else {
                                setError('Tag not found');
                                return;
                            }
                        }
                    }
                >
                    <span className="p-1">Add</span>
                </button>
            </div>
        </div>
        <div className="w-100">
            <TagList tag={tag} isHidden={false} onClick={
                (idx) => {
                    setTag(tag.filter((val, i) => i !== idx));
                }
            } />
        </div>
        <datalist id="tagList" className="options align-self-end">
            {/* <option value="AA">AA</option> */}
            {allTagList.map(({ Name }, idx) => {
                return <option key={idx} value={Name}>{Name}</option>
            })}
        </datalist>
    </div>
}