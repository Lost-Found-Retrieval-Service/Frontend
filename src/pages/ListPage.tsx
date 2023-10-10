import React from 'react';
import CardView from '../components/CardView';
import styled from 'styled-components';

import projectImg from '../assets/project.png';

// TODO: 무한 스크롤? 페이지네이션? 구현
const ListPage = () => {
  return (
    <div>
      <h1>카드 뷰 예제</h1>
      <GridWrapper>
        {cardData.map((card, index) => (
          <CardView
            key={index}
            title={card.title}
            content={card.content}
            img={card?.img}
          />
        ))}
      </GridWrapper>
    </div>
  );
};

export default ListPage;

// TODO: 데이터를 동적으로 불러오기
const cardData = Array.from({ length: 16 }, (_, index) => ({
  title: `카드 제목 ${index + 1}`,
  content: `카드 내용 ${index + 1}`,
  img: projectImg,
}));

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-gap: 16px;
  grid-auto-flow: row;
  justify-content: center;
  margin: 2rem;
`;
