import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { IColumn, ITicket } from 'types';
import Card from 'components/Card';

interface ContainerBodyPropTypes {
  isDraggingOver?: boolean;
  isDraggingFromThis?: boolean;
}

const Container = styled.div`
  width: 300px;
  padding: 0.5rem;
  min-height: 100px;
  background-color: rgb(235, 236, 240);
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #172b4d;
  padding: 1rem 0;
`;

const ContainerBody = styled.div<ContainerBodyPropTypes>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props?.isDraggingOver === true
      ? 'rgb(255, 235, 230)'
      : props?.isDraggingFromThis === true
      ? 'rgb(230, 252, 250)'
      : 'rgb(235, 236, 240)'};
`;

interface ColumnPropTypes {
  column: IColumn;
  tickets: ITicket[];
}

function Column({ column, tickets }: ColumnPropTypes): React.ReactElement {
  return (
    <Container>
      <Title>{column.name}</Title>
      <Droppable droppableId={String(column.id)}>
        {(provided, snapshot) => (
          <ContainerBody
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          >
            {tickets.map((ticket, index) => (
              <Card key={ticket.id} id={ticket.id} name={ticket.name} image={ticket.image} index={index} />
            ))}
            {provided.placeholder}
          </ContainerBody>
        )}
      </Droppable>
    </Container>
  );
}

export default Column;
