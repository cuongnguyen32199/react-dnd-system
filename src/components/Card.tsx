import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 1rem;
  background-color: white;
  color: rgb(9, 30, 66);
  font-weight: 500;
  align-items: flex-start;
  gap: 1rem;
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
  name: string;
  image: string;
}

function Card({ name, image }: CardPropTypes): React.ReactElement {
  return (
    <Container>
      <Image src={image} alt="" />
      <Title>{name}</Title>
    </Container>
  );
}

export default Card;
