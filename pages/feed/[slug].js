import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/dist/client/router';

const Feed = ({ pageNumber, articles }) => {
  console.log('page:', pageNumber);
  console.log('artickes:', articles);

  const router = useRouter();

  return (
    <>
      <FeedWrapper>
        {articles.map((article, index) => (
          <ArticleWrapper key={index}>
            <Title onClick={() => (window.location.href = article.url)}>
              {article.title}
            </Title>
            <p>{article.description}</p>
            {!!article.urlToImage && <ArticleImage src={article.urlToImage} />}
          </ArticleWrapper>
        ))}
      </FeedWrapper>
      <PaginatorWrapper>
        <PreviousPage
          onClick={() => {
            if (pageNumber > 1) {
              router
                .push(`/feed/${pageNumber - 1}`)
                .then(() => window.scrollTo(0, 0));
            }
          }}
          pageNumber={pageNumber}
        >
          Previous
        </PreviousPage>
        <PageNumber>#{pageNumber}</PageNumber>
        <NextPage
          onClick={() => {
            if (pageNumber < 5) {
              router
                .push(`/feed/${pageNumber + 1}`)
                .then(() => window.scrollTo(0, 0));
            }
          }}
          pageNumber={pageNumber}
        >
          Next
        </NextPage>
      </PaginatorWrapper>
    </>
  );
};

export const getServerSideProps = async pageContext => {
  const pageNumber = pageContext.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );

  const apiJson = await apiResponse.json();
  const { articles } = apiJson;

  return {
    props: {
      articles: articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

//STYLED COMPONENTS

const FeedWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ArticleWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid black;
  width: 500px;
`;

const Title = styled.h1`
  font-size: 1.5rem;

  cursor: pointer;
`;

const ArticleImage = styled.img`
  margin-top: 16px;
  width: 100%;
`;

const PaginatorWrapper = styled.div`
  padding: 32px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 32px;
  font-size: 1.2rem;
`;

const PreviousPage = styled.div`
  cursor: ${({ pageNumber }) => (pageNumber === 1 ? 'not-allowed' : 'pointer')};
  color: ${({ pageNumber }) => pageNumber === 1 && '#b3b3b3'};
`;

const NextPage = styled.div`
  cursor: ${({ pageNumber }) => (pageNumber === 5 ? 'not-allowed' : 'pointer')};
  color: ${({ pageNumber }) => pageNumber === 5 && '#b3b3b3'};
`;

const PageNumber = styled.div`
  cursor: pointer;
`;

const Disabled = styled.div`
  cursor: not-allowed;
  color: #b3b3b3;
`;

const Active = styled.div`
  cursor: pointer;
`;

export default Feed;
