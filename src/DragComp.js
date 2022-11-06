import React from 'react';
import {Rnd} from 'react-rnd';
import './App.css'

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

class DragComp extends React.Component{
  render(){  
      return(
            <Rnd
            style={style}
              default={{
                x: 0,
                y: 0,
                width: 320,
                height: 200
              }}
            >
              <table>
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Country</th>
                </tr>
                <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td>Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                </tr>
              </table>
            </Rnd>
      )
  }
}

export default DragComp;