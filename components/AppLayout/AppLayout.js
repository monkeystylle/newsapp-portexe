import React from 'react';
import styled from 'styled-components';
import Toolbar from '../Toolbar';

function AppLayout({ children }) {
  return (
    <Container>
      <Toolbar />
      <Content>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  flex: 1;
`;

const PageContainer = styled.div``;

export default AppLayout;
