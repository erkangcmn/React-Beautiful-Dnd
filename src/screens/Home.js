
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { axiosInstance as api } from '../utils/utils'


function Home() {

    const [data, setData] = useState("")

    useEffect(() => {
        async function fetchMyAPI() {
            await api.get('data').then(res => {
                let data = res.data
                setData(data)
            }).catch(e => {
                console.log("Hata => " + e)
            })
        }
        fetchMyAPI()
        
    }, [])

    //Droppable
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }
    async function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            data,
            result.source.index,
            result.destination.index
        )

        setData(items)
    }
    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: 16,
        margin: `0 0 16px 0`,
        textAlign:"center",
        borderRadius:"8px",
        justifyItems:"center",
        background: isDragging ? "#0A369D" : "#5E7CE2",
        color: isDragging ? "white" : "white",
        ...draggableStyle
    });


    return (
        <>
            <figure className="md:flex rounded-xl p-8 my-3">
                {
                    data ?
                        <DragDropContext onDragEnd={onDragEnd} className="flex-1 min-h-full rounded-lg">
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {data.map((element, index) => (

                                            <Draggable key={element.id} draggableId={element.id} index={index}>
                                                {(provided, snapshot) => (

                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        {element.header}
                                                        {provided.placeholder}
                                                    </div>

                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        : null
                }
                
                <div className="flex-grow"/>

                <div className="flex-none bg-indigo-900 text-white p-5 rounded-lg max-w-xs ">
                    <pre className="items-end overflow-ellipsis overflow-hidden">{JSON.stringify(data, null, 4)}</pre>
                </div>

            </figure>
        </>
    );

}

export default Home

