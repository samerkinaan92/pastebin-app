import axios from 'axios';
import './PastePage.css';
import {
  useParams,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';

function PastePage() {
    function handleSubmit(event) {
      event.preventDefault();
      const options = {
        headers: {'Content-Type': 'text/plain'}
      };
      axios.post('http://localhost:8080', event.target[0].value, options)
      .then((res) => {
        window.location.replace(`/${res.data}`);
      });
    }

    function handleDelete(event) {
      axios.delete(`http://localhost:8080/${hash}`, event.target[0].value)
      .then((res) => {
        window.location.replace('/');
      });
    }

    const [value, setValue] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [disableDelete, setDisableDelete] = useState(true);
    const { hash } = useParams();

    useEffect(() => {
      if (hash) {
        const fetchData = async () => {
          try {
          const res = await axios.get(`http://localhost:8080/${hash}`);
          setDisableSubmit(true);
          setValue(res.data.pasteValue);
          } catch(err) {
            if (err.response.status === 404) {
              await alert("Paste was not found");
              window.location.replace('/');
            }
            console.log(err);
          }
        }
        setDisableDelete(false);
        fetchData();
      } else {
        setDisableSubmit(false);
      }
    }, [hash]);
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <textarea className="text-area" id="pastebin" name="pastebin" rows="10" cols="50" defaultValue={value}></textarea>
            <div className='item-align-end'>
              <input disabled={disableDelete} className="button me-2" onClick={handleDelete} type="button" value="Delete"/>
              <input disabled={disableSubmit} className="button" type="submit" value="Submit"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  export default PastePage;