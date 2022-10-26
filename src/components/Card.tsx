import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  padding: 1rem;
  background-color: white;
  color: rgb(9, 30, 66);
  font-weight: 500;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

const Title = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: rgb(9, 30, 66);
`;

interface CardPropTypes {
  id: number;
  name: string;
  image: string;
  index: number;
}

function Card({ id, name, image, index }: CardPropTypes): React.ReactElement {
  const imageSrc = `${process.env.PUBLIC_URL}/${image}`.replace(/\/\//g, '/');

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Image src={imageSrc} alt="" />
          <Title>{name}</Title>
        </Container>
      )}
    </Draggable>
  );
}

export default Card;
