import React from 'react';
import styled from 'styled-components';

import { IColumn } from 'types';
import Card from 'components/Card';
import tickets from 'scripts/tickets.json';

const Container = styled.div`
  width: 300px;
  padding: 0.5rem;
  min-height: 100px;
  background-color: rgb(235, 236, 240);
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #172B4D;
  padding: 1rem 0;
`;

const ContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface ColumnPropTypes {
  column: IColumn;
}

function Column({ column }: ColumnPropTypes): React.ReactElement {
  const { ticketIDs } = column;
  const items = ticketIDs.map((id) => tickets[String(id) as keyof typeof tickets]);
  return (
    <Container>
      <Title>{column.name}</Title>
      <ContainerBody>
        {items.map((item) => <Card key={item.id} name={item.name} image={item.image} />)}
      </ContainerBody>
    </Container>
  );
}

export default Column;
