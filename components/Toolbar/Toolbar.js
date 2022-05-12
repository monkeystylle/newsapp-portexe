import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Toolbar = () => {
  const router = useRouter();

  return (
    <ToolbarWrapper>
      <Navlink onClick={() => router.push('/')}>Home</Navlink>
      <Navlink onClick={() => router.push('/feed/1')}>Feed</Navlink>
      <Navlink onClick={() => router.push('/eom')}>EOM</Navlink>
      <Navlink onClick={() => (window.location.href = 'https://twitter.com')}>
        Twitter
      </Navlink>
    </ToolbarWrapper>
  );
};

const ToolbarWrapper = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  gap: 48px;
  justify-content: center;
`;
const Navlink = styled.div`
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: rgb(168 168 168);
  }
`;

export default Toolbar;
