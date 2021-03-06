import styled from 'styled-components';
import Toolbar from '../components/Toolbar/Toolbar';

export default function Home() {
  return (
    <PageWrapper>
      <Wrapper>
        <Title>Next.js News App</Title>
        <SubTitle>A simple news app for the latest news article</SubTitle>
      </Wrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3rem;
`;
const SubTitle = styled.h3`
  font-size: 1.5rem;
`;
