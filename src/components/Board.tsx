import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from 'components/Column';
import columns from 'scripts/columns.json';

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
  const handleDragEnd = (): void => {
    console.log('Handle drag end');
  };

  const columnIds: string[] = Object.keys(columns);

  return (
    <Container>
      <DragDropContext onDragEnd={handleDragEnd}>
        {columnIds.map((id) => (<Column key={id} column={columns[id as keyof typeof columns]} />))}
      </DragDropContext>
    </Container>
  );
}

export default Board;
