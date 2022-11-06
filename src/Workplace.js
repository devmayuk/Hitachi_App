import React from 'react';
import DataView from './DataView';
import TableComp from './TableComp';
import { Box, boxesIntersect, useSelectionContainer } from '@air/react-drag-to-select'
import './Workplace.css'
import ViewSetting from './ViewSetting';
import TableEditable from './TableEditable';
import {AiOutlinePlus, AiOutlineCopy, AiOutlineDelete, AiOutlineSetting, AiOutlineBorder, AiOutlineCloseSquare} from "react-icons/ai";

function Workplace(){
    const [parentTags, setParentTags] = React.useState([
        {"text":"Label"}
    ]);
    const [parentRows, setParentRows] = React.useState([
        // { id: 'Image_cat_1', text: 'Image_cat_1' },
        // { id: 'Value_cat_1', text: 'Value_cat_1' }
    ]);
    const [SettingView, setSettingView] = React.useState(0);
    const [PlusView, setPlusView] = React.useState(0);
    const [DataSetView, setDataSetView] = React.useState(0);
    const [CheckboxView, setCheckboxView] = React.useState(0);
    const [InitTable, setInitTable] = React.useState(0);
    const [inputList, setInputList] = React.useState([]);
    const [selectedIndexes, setSelectedIndexes] = React.useState([]);
    const selectableItems = React.useRef([]);
    const elementsContainerRef = React.useRef(null);
    const { DragSelection } = useSelectionContainer({
        selectionProps: {
            style: {
              border: '2px dashed purple',
              borderRadius: 4,
              backgroundColor: 'white',
              opacity: 0.5,
            },
          },
        isEnabled: false,
        eventsElement: document.getElementById("root"),
        onSelectionChange: (box) => {
            const scrollAwareBox = {
                ...box,
                top: box.top + window.scrollY,
                left: box.left + window.scrollX
            };
            const indexesToSelect = [];
            selectableItems.current.forEach((item, index) => {
                if (boxesIntersect(scrollAwareBox, item)) {
                indexesToSelect.push(index);
                }
            });

            setSelectedIndexes(indexesToSelect);
        }
    }); 
        const onAddBtnClick = event => {
            setInputList(inputList.concat(<TableComp tags={parentTags} key={inputList.length} />));
            setPlusView(0);
            setSettingView(0);
        };
        const onDeleteBtnClick = event => {
            var element = document.getElementsByClassName('table-element');
            element[0].remove();
            setPlusView(0);
            setSettingView(0);
        };
        const onSettingBtnClick = event => {
            setSettingView(1);
            setPlusView(0);
        };
        const onPlusBtnClick = event => {
            setSettingView(0);
            setPlusView(0);
            setDataSetView(1);
            if(CheckboxView === 0){
                setCheckboxView(1);
            }
            else{
                setCheckboxView(0);
            }    
        };
        const onDataSetClick = event => {
            setDataSetView(1);
        };
        const onViewSetClick = event => {
            setDataSetView(0);
        };
        const onCheckboxBtnClick = event => {
            if(PlusView === 0){
                setPlusView(1);
            }
            else{
                setPlusView(0);
            } 
        };
        React.useEffect(() => {
            if (elementsContainerRef.current) {
              Array.from(elementsContainerRef.current.children).forEach((item) => {
                const { left, top, width, height } = item.getBoundingClientRect();
                selectableItems.current.push({
                  left,
                  top,
                  width,
                  height
                });
              });
            }
            var tempPr = []
            parentRows.forEach(function(item, index, arr){
                tempPr.push(item.text);
            })
            if(tempPr.includes('Image_cat_1') && tempPr.includes('Value_cat_1')){
                setInitTable(1);
            }
            else{
                setInitTable(0);
            }
          }, [parentRows]);
    //     if(parentRows.includes({id: 'Image_cat_1', text: 'Image_cat_1'})){
    //     setInitTable(0);
    // }
    // else{
    //     setInitTable(1);
    // }
      return(
            <div className="workplace">
                <div className="separator"></div>
                <div className='main-area'>
                    <div className='menu'>
                        <div className='head'> Menu </div>
                        <div className='second'></div>
                        <div className='second'></div>
                        <div className='second'></div>
                    </div>
                    <div className='workarea'>
                        <div className='btns'>
                            <button onClick={onPlusBtnClick}><AiOutlinePlus/></button>
                            <button onClick={onAddBtnClick}><AiOutlineCopy/></button>
                            <button onClick={onDeleteBtnClick}><AiOutlineDelete/></button>
                            { CheckboxView === 1 ?
                                PlusView === 0 ?
                                    <button onClick={onCheckboxBtnClick}><AiOutlineBorder/></button>
                                    :
                                    <button onClick={onCheckboxBtnClick}><AiOutlineCloseSquare/></button>
                                :
                                <div className='no-display'></div>
                            }
                            <button onClick={onSettingBtnClick} className='setting'><AiOutlineSetting/></button>
                        </div>
                        <div className='ptable'>
                        <DragSelection/>
                            { PlusView === 1 ?
                                <div className="tabbed">
                                    <div className='tb-btns'>
                                        <button onClick={onDataSetClick} className={`${DataSetView === 1 ? "active" : "" } `}>Data setting</button>
                                        <button onClick={onViewSetClick} className={`${DataSetView === 0 ? "active" : "" } `}>View setting</button>
                                    </div>
                                    { DataSetView === 1 ?
                                        <div className='tabContent'>
                                            <DataView setParentTags={setParentTags}  />
                                        </div>
                                        :
                                        <div className='tabContent'>
                                            <div className='radio-btns'>
                                                <input type="radio" id="tableview" name="rad1" value="Table" checked="checked"/>
                                                <label for="tableview">Table</label><br/>
                                                <input type="radio" id="graph" name="rad1" value="Graph"/>
                                                <label for="graph">Graph</label><br/>
                                            </div>
                                            <ViewSetting setParentRows={setParentRows}  />
                                        </div>
                                    }
                                </div>
                            :
                                <div className='no-display'></div>
                            }
                            { SettingView === 0 ?
                                InitTable === 1?
                                    <div
                                        id="elements-container"
                                        className="elements-container"
                                        ref={elementsContainerRef}
                                    >
                                        <TableComp tags={parentTags} selectedIndexes={selectedIndexes} keyv={1000} rowOrder={parentRows}/>
                                        {Array.from({ length: inputList.length }, (_, i) => (
                                                <TableComp tags={parentTags} selectedIndexes={selectedIndexes} keyv={i} rowOrder={parentRows}/>
                                        ))}
                                    </div>
                                :
                                <div className='no-display'></div>
                                :
                                    <TableEditable tags={parentTags} rowOrder={parentRows}/>

                            }
                        </div>
                    </div>
                </div>

            </div>
      )
}

export default Workplace;