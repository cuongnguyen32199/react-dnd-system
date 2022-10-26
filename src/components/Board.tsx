import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import STATE from 'scripts/state.json';
import Column from 'components/Column';

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: rgb(76, 154, 255);
  gap: 1rem;
  padding: 0.5rem;
`;

function Board(): React.ReactElement {
  const [state, setState] = useState(STATE);

  const { columnsOrder, columns, tickets } = state;

  const handleDragEnd = (data: DropResult): void => {
    const { source, destination, draggableId } = data;

    if (destination === null) return;
    if (source.droppableId === destination?.droppableId && source.index === destination?.index) return;

    const start = columns[source.droppableId as keyof typeof columns];
    const end = columns[destination?.droppableId as keyof typeof columns];

    if (source.droppableId === destination?.droppableId) {
      const ticketIDs = Array.from(start.ticketIDs);
      ticketIDs.splice(source.index, 1);
      ticketIDs.splice(destination.index, 0, Number(draggableId));

      setState({ ...state, columns: { ...columns, [start.id]: { ...start, ticketIDs } } });
      return;
    }

    const ticketIDs = Array.from(start.ticketIDs);
    ticketIDs.splice(source.index, 1);

    const targetIDs = Array.from(end.ticketIDs);
    if (typeof destination?.index === 'number') targetIDs.splice(destination?.index, 0, Number(draggableId));

    setState({
      ...state,
      columns: { ...columns, [start.id]: { ...start, ticketIDs }, [end.id]: { ...end, ticketIDs: targetIDs } },
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container>
        {columnsOrder.map((id) => {
          const column = columns[String(id) as keyof typeof columns];
          const items = column.ticketIDs.map((ticketID) => tickets[String(ticketID) as keyof typeof tickets]);

          return <Column key={id} column={column} tickets={items} />;
        })}
      </Container>
    </DragDropContext>
  );
}

export default Board;
