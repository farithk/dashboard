import React, { useState, useEffect } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  JsonToExcel
} from 'react-json-excel';
import { PieChart } from 'react-minimal-pie-chart';
import moment from 'moment';

const Dashboard = () => {

    const [userChild, setUserChild] = useState({});

    const reload = () => {
      window.location.reload(false);
    };

    const getToken = async () => {
      const options = {
        'key': ''
      };
      
      await axios.post('http://localhost:3000/dash_board/api/login', options)
          .then(res => {
            //console.log(res.data.token);
            getData(res.data.token);
          
      }).catch(error => {
        console.log(error)
      });

  }

    const getData = async (token) => {
   
      const options = {
        headers: {'authorization': token}
      };
        await axios.get('http://localhost:3000/dash_board', options)
            .then(res => {
              //console.log(res);
              setUserChild(res.data);
            
        });

    }

    let userChildList = {

    }

    let childPlan = {

    }

    let usersLong;
    let oneMonths = 0;
    let threeMonths= 0; 
    let sixMonths = 0; 
    let twelveMonths = 0;

    let oneMonthsPercent = 0;
    let threeMonthsPercent = 0; 
    let sixMonthsPercent = 0; 
    let twelveMonthsPercent = 0;

    if (userChild.usersToshow !== undefined) {
       
      usersLong = userChild.usersToshow.data.length;

        for (const property in userChild.childsToshow.data) {

          let age = moment().diff(userChild.childsToshow.data[property].attributes.birthdate, 'years') + ' Años';
          if (0 >=  moment().diff(userChild.childsToshow.data[property].attributes.birthdate, 'years') ){
            age = Math.round(moment().diff(userChild.childsToshow.data[property].attributes.birthdate, 'days')/30) + ' Meses';
          }

            userChildList[userChild.childsToshow.data[property].attributes.userId] = [userChild.childsToshow.data[property].attributes.name, 
                                                                                      userChild.childsToshow.data[property].attributes.id,
                                                                                      age];
        }

        for (const property in userChild.transactiomToshow.data){
          
          let plan;
          if(+userChild.transactiomToshow.data[property].attributes.amount <= 50000) {
            plan = 'Mensual';
            oneMonths = oneMonths + 1;
          }
      
          if(+userChild.transactiomToshow.data[property].attributes.amount > 50000 && +userChild.transactiomToshow.data[property].attributes.amount <= 150000) {
            plan = '3 Meses';
            threeMonths = threeMonths + 1;
          }

          if(+userChild.transactiomToshow.data[property].attributes.amount > 150000 && +userChild.transactiomToshow.data[property].attributes.amount <= 250000) {
            plan = '6 Meses';
            sixMonths = sixMonths + 1;
          }

          
          if(+userChild.transactiomToshow.data[property].attributes.amount > 250000) {
            plan = '12 Meses';
            twelveMonths = twelveMonths + 1;
          }

          childPlan[userChild.transactiomToshow.data[property].attributes.accountId] = plan;
        }

    }

    let rows;

    let datagot = [];
    if (userChild.usersToshow !== undefined) {
    
      //console.log(userChild.usersToshow.data);
      function compare(a, b) {
        // Use toUpperCase() to ignore character casing
       
        const bandA = parseInt(a.attributes.id);
        const bandB = parseInt(b.attributes.id);
      
        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison * - 1;
      }

      userChild.usersToshow.data.sort(compare);
      
      rows = Object.keys(userChild.usersToshow.data).map(function(keyName, keyIndex) {

        datagot.push(
          {number: (userChild.usersToshow.data[keyName].attributes.createdAt.split("T")[0]), 
          firstName: userChild.usersToshow.data[keyName].attributes.firstName, 
          lastName: userChild.usersToshow.data[keyName].attributes.lastName,
          email: userChild.usersToshow.data[keyName].attributes.email,
          phone: userChild.usersToshow.data[keyName].attributes.phone,
          child: userChildList[userChild.usersToshow.data[keyName].attributes.id][0],
          birthdate: userChildList[userChild.usersToshow.data[keyName].attributes.id][2],
          plan: childPlan[userChildList[userChild.usersToshow.data[keyName].attributes.id][1]]
        })
        
        return (
          <tr value={keyIndex}>
            <td>{userChild.usersToshow.data[keyName].attributes.createdAt.split("T")[0]}</td>
            <td>{userChild.usersToshow.data[keyName].attributes.firstName}</td>
            <td>{userChild.usersToshow.data[keyName].attributes.lastName}</td>
            <td>{userChild.usersToshow.data[keyName].attributes.email}</td>
            <td>{userChild.usersToshow.data[keyName].attributes.phone}</td>
            <td>{userChildList[userChild.usersToshow.data[keyName].attributes.id][0]}</td>
            <td>{userChildList[userChild.usersToshow.data[keyName].attributes.id][2]}</td>
            <td>{childPlan[userChildList[userChild.usersToshow.data[keyName].attributes.id][1]]}</td>
          </tr>
         )

        })

    }

    //console.log(datagot);
    const className = 'class-name-for-style',
    filename = 'users-data',
    fields = {
      "number": "Fecha",
      "firstName": "Nombre",
      "lastName": "Apellido",
      "email": "Correo",
      "phone": "Telefono",
      "child": "Hijo",
      "birthdate": "Edad",
      "plan": "Plan"
    },
    style = {
      padding: "5px"
    },
    data = datagot,
    text = "Convertir a Excel";

    oneMonthsPercent = Math.round(oneMonths * 100 / usersLong);
    threeMonthsPercent = Math.round(threeMonths * 100 / usersLong);
    sixMonthsPercent = Math.round(sixMonths * 100 / usersLong);
    twelveMonthsPercent =Math.round(twelveMonths * 100 / usersLong);
    
    //console.log(oneMonthsPercent, threeMonthsPercent, sixMonthsPercent, twelveMonthsPercent);
    //console.log(isNaN(oneMonthsPercent));

    useEffect(() => {
        getToken();  
        //getData();
      
        
    }, [])
 

  return (
    <div className="containerD" style={ data.length > 0 ? {opacity:"1"}:{opacity:"0.5", cursor:"wait"}}>
      <div className="reload"><div className="logout" onClick={reload}>Salir</div></div>
      <div className="title">
        <h1>Estadísticas</h1>
      </div>
     
      <div className="info">
        <div className="users">
          Cantidad de Usuarios: {usersLong}
        </div>
        <div className="plan">
          Planes:
        </div>
        <div className="statics">
          <div className="plans">
            <p className="planinner" style={{color:"#003f5c"}}>Mensual: {oneMonths}</p>
            <p className="planinner"  style={{color:"#58508d"}}>3 Meses: {threeMonths}</p>
            <p className="planinner"  style={{color:"#bc5090"}}>6 Meses: {sixMonths}</p>
            <p className="planinner"  style={{color:"#ff6361"}}>12 Meses: {twelveMonths}</p>
          </div>
          {
            isNaN(oneMonthsPercent) ?  null:

                                    <PieChart className="pieChart"
                                      data={[
                                        { title: 'oneMonths', value: oneMonthsPercent, color: '#003f5c' },
                                        { title: 'threeMonths', value: threeMonthsPercent, color: '#58508d' },
                                        { title: 'sixMonths', value: sixMonthsPercent, color: '#bc5090' },
                                        { title: 'twelveMonths', value: twelveMonthsPercent, color: '#ff6361' }
                                      ]}
                                    />
         
          }
        </div>
        
      </div>

      <div className="subtitle">
        <p>Datos del Usuario</p>
      </div>
      {
        
        data.length > 0 ?  
        <div className="excelButton">
          <JsonToExcel className="button"
          data={data}
          className={className}
          filename={filename}
          fields={fields}
          style={style}
          text={text}
        />
       </div>
     :null
      }
   
        <Table striped bordered hover className="tableContainer">
          <thead>
            <tr className="headTitles">
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Hijo</th>
              <th>Edad</th>
              <th>Plan</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {rows}
          </tbody>
          
        </Table>
    </div>
  );
};

export default Dashboard;
