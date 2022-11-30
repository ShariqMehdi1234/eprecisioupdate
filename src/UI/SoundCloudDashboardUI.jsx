import React, { useState, useMemo, useEffect } from "react";
import BreadCrumbSoundCloudUI from './BreadCrumbSoundCloudUI';
import DataTable from "react-data-table-component";
// import data from "../Api/Data1";
import FilterComponent from "./FilterComponent";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Form } from 'react-bootstrap';
// import { w3cwebsocket as W3CWebSocket } from "websocket";
import LoaderUI from './LoaderUI';
import axios from 'axios';
// import * as process from "process";

// const client = new W3CWebSocket('ws://52.56.232.213:9091/spotify-socket');

function SoundCloudDashboardUI() {

  const [dataSoundCloud, setdataSoundCloud] = useState([]);

  const [pending, setPending] = React.useState(true);

  useEffect(() => {
    // client.onopen = () => {
    //   console.log('WebSocket Client Connected');
    // };
    // client.onmessage = (message) => {
    //   const dataFromServer = JSON.parse(message.data);
    //       setTimeout(() => {
    //         setdataSoundCloud(dataFromServer);
    //         setPending(false);
    //       }, 10000);

    //   console.log(dataFromServer);
    // };

    axios.post('/previous-soundcloud-results/?user=ehtisham')
    .then(function (response) {
      setTimeout(() => {
        setdataSoundCloud(response.data);
        setPending(false);
      }, 2000);
    })
    .catch(function (error) {
      console.log(error);
    });

  }, []);

  const onButtonClicked = () => {
    // client.send(JSON.stringify({
    //   user: "username",
    //   search: "search"
    // }));
  }

  const columns = [
    {
      name: "Url",
      selector: row => row.url,
      value: 'url',
      sortable: true
    },
    {
      name: "Name",
      selector: row => row.name,
      value: 'name',
      sortable: true
    },
    {
      name: "Followers",
      selector: row => row.followers,
      value: 'followers',
      sortable: true
    },
    {
      name: "Email",
      selector: row => row.email,
      value: 'email',
      sortable: true
    },
    {
      name: "Other Emails",
      selector: row => row.other_emails,
      value: 'other_emails',
      sortable: true
    }
  ];

  const [filterText, setFilterText] = useState("");

  const [filterTextclick, setFilterTextclick] = useState("");

  const [filterTextSelect, setFilterTextSelect] = useState('');

  const ids = dataSoundCloud.map(o => o.search)
  const PreviousListText = dataSoundCloud.filter(({search}, index) => !ids.includes(search, index + 1))

  const [customSorttext, setcustomSorttext] = useState("");
  const [customSortcount, setcustomSortcount] = useState(2);

  const customSort = (rows, selector, direction) => {
    return rows.sort((rowA, rowB) => {
     const aField = selector(rowA)
     const bField = selector(rowB)
   
     let comparison = 0;
   
     if (aField > bField) {
      comparison = 2;
     } else if (aField < bField) {
      comparison = -2;
     }

     return direction === customSorttext ? comparison * -2 : comparison;
    });
   };
  

  const filteredItemsArray = [];
  const filteredItemsArrayRowsData = dataSoundCloud.filter(person => (filterTextSelect === '' ? person.search: person.search === filterTextSelect)).map((item,index) =>
    filteredItemsArray[index] = item.data
  );

  const filteredItems = filteredItemsArrayRowsData.filter(
    item => JSON.stringify(item).toLowerCase().indexOf(filterTextclick.toLowerCase()) !== -1
  );



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFilterTextOnClick = (e) => {
    setFilterTextclick(filterText);
  }

  const FilterValueOnClick = (event) => {
    if(event.target.value === '') {
      setcustomSortcount(3)
      setcustomSorttext('asc')
    }
    else if(event.target.value === 'By_Date') {
      setcustomSortcount(2)
      setcustomSorttext('desc')

    }
    else if(event.target.value === 'By_Group') {
      setcustomSortcount(2)
      setcustomSorttext('asc')
    }
    else if(event.target.value === 'By_Ascending_Order') {
      setcustomSortcount(2)
      setcustomSorttext('desc')
    }
    else if(event.target.value === 'By_Descending_Order') {
      setcustomSortcount(2)
      setcustomSorttext('asc')
    }
  }

  const onFilterOnClick = (e) => {
    if(e.target.value === '') {
      setFilterText(e.target.value);
      setFilterTextclick('');
    }
    else {
      setFilterText(e.target.value);
    }
  }

  const PreviousListFilterOnChange = (e) => {
    if(e.target.value === '') {
      setFilterTextSelect(e.target.value);
    }
    else {
      setFilterTextSelect(e.target.value);
    }
  }

  const subHeaderComponent = useMemo(() => {

    return (
      <FilterComponent
        onFilter={onFilterOnClick}
        filterText={filterText}
        filterTextclick={onFilterTextOnClick}
      />
    );
  }, [filterText, onFilterTextOnClick]);

  const column_data_for_export = ["url", "name", "artist_name", "email", "link"];

  const rows_data_for_export = filteredItems.map((d1) =>
      columns.slice(0, columns.length).map((d2) => d2.value).map((d3) => d1[d3])
  );

  const  download_pdf = () => {
    const doc = new jsPDF();

    const columns_data_for_export = columns.slice(0, columns.length).map((d) => d.name);

    const temp_rows = filteredItems.map((d1) =>
      columns.slice(0, columns.length).map((d2) => d2.value).map((d3) => d1[d3])
    );

    doc.autoTable({
      head: [columns_data_for_export],
      body: temp_rows
    });

    doc.save("SoundCloudlist.pdf");
  }

  setTimeout(() => {
    onButtonClicked();
  }, 1000);

  return (
    
    <React.Fragment>
      <div className='margin-left-right'>
        <BreadCrumbSoundCloudUI />
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-12 col-md-12 col-sm-12 container-fuild-margin'>
            <h1>Dashboard</h1>
          </div>
        </div>
        {subHeaderComponent}
        <div className='row container-fuild-margin'>
          <div className='col-lg-12 col-md-12 col-sm-12 container-padding'>
            <div className={'filter-div'}>
              <Form.Select className='filter-select' onChange={PreviousListFilterOnChange} >
                <option value={''}>All</option>
                {PreviousListText.map((item, index) => (
                    <option key={index} value={item.search}>{item.search}</option>
                ))}
              </Form.Select>
              <Form.Select className='filter-select' onChange={FilterValueOnClick}>
                <option value={''}>Filter</option>
                <option value={'By_Date'}>By Date</option>
                <option value={'By_Group'}>By Group</option>
                <option value={'By_Ascending_Order'}>By Ascending Order</option>
                <option value={'By_Descending_Order'}>By Descending Order</option>
              </Form.Select>
            </div>
              <DataTable columns={columns} data={filteredItems} defaultSortField="name" striped pagination defaultSortFieldId={customSortcount} sortFunction={customSort} progressPending={pending} progressComponent={<LoaderUI />}/>
              <button style={{marginTop: '20px'}} className='flaot-import-button flaot-border-radius float-button' onClick={download_pdf}>Download List PDF</button>
              <CSVLink style={{textDecoration: 'none', marginTop: '20px'}} className='flaot-import-button flaot-border-radius float-button' data={rows_data_for_export} headers={column_data_for_export} filename={"client_list.csv"}>Download List CSV</CSVLink>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SoundCloudDashboardUI;
