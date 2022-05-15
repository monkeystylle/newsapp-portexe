import React from 'react';
import styled from 'styled-components';

const EOM = ({ employee }) => {
  console.log(employee);
  return (
    <PageContainer>
      <Title>Employee of the Month</Title>
      <div>
        <h3>Name: {employee.name}</h3>
        <h6>Position: {employee.position}</h6>
        <Image src={employee.image} />
        <Info>The Purple Guy lol</Info>
      </div>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  margin: 64px 128px;
  padding: 32px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: gold;
`;
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 16px;
`;

const Image = styled.img`
  margin: 16px 0;
  border-radius: 8px;
`;

const Info = styled.p`
  font-size: 2rem;
`;

export const getServerSideProps = async pageContext => {
  const apiResponse = await fetch(
    'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth'
  );
  const employee = await apiResponse.json();

  return {
    props: {
      employee,
    },
  };
};

export default EOM;
