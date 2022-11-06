import React from 'react';
import {Rnd} from 'react-rnd';

const style = {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
  border: "solid 1px #ddd",
//   background: "#f0f0f0"
};

function TableEditable(props){ 
      const images = ["Image_cat_1", "Image1.jpg", "Image2.jpg", "Image3.png", "Image4.jpg", "Image5.jpg"];
      const vals = ["Value_cat_1", "val1", "val2", "val3", "val4", "val5"];
      var final_images = [];
      var final_vals = [];
      for (let i = 0; i < props.tags.length; i++){
        let idx = i%images.length;
        final_images.push(images[idx]);
        final_vals.push(vals[idx]);
      }
      var baseOrder = 1;
      if (props.rowOrder[0].id === "Value_cat_1"){
        baseOrder = 0;
      }
      if (props.rowOrder[0].id === "Image_cat_1"){
        baseOrder = 1;
      }
      return(
            <div className="table-element editable">
                <Rnd
                    style={style}
                    default={{
                        x: 0,
                        y: 0,
                        width: 320,
                        height: 200
                    }}
                >
                    <table className="element">
                        <thead>
                            <tr>
                                {props.tags.map((tg, idxx) => (  
                                <th >{tg.text}</th>                  
                                ))} 
                            </tr>
                        </thead>

                            { baseOrder === 1 ?
                                <tbody>
                                    <tr>
                                        {final_images.map((im, idxx) => (  
                                        im === "Image_cat_1" ? <td><div contentEditable={true}>{im}</div></td> : <td ><img src={"/images/"+im} alt={im}/></td>                                          
                                        ))} 
                                    </tr>
                                    <tr>
                                        {final_vals.map( (vl, idxx) => (  
                                        <td><div contentEditable={true}>{vl}</div></td>           
                                        ))} 
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                    <tr>
                                        {final_vals.map( (vl, idxx) => (  
                                        <td><div contentEditable={true}>{vl}</div></td>                  
                                        ))} 
                                    </tr>
                                    <tr>
                                        {final_images.map((im, idxx) => (  
                                        im === "Image_cat_1" ? <td><div contentEditable={true}>{im}</div></td> : <td ><img src={"/images/"+im} alt={im}/></td>                                          
                                        ))} 
                                    </tr>
                                </tbody>
                            }
                        
                    </table>
                </Rnd>
            </div>
      )
}

export default TableEditable;