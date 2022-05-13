import React from 'react';
import styled from 'styled-components';

const Feed = ({ pageNumber, articles }) => {
  console.log('page:', pageNumber);
  console.log('artickes:', articles);

  return (
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
  width: 100%;
`;

export default Feed;
