import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardView from '../components/CardView';
import styled from 'styled-components';
import CardViewSkeleton from '../components/CardViewSkeleton';
import projectImg from '../assets/project.png';

// TODO: 무한 스크롤? 페이지네이션? 구현
const List = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cardDatas, setCardDatas] = useState();
  // const [isFetching, setIsFetching] = useState(false);

  const params = new URLSearchParams(location.search);
  const item = params.get('item');
  const lostDate = params.get('lostDate');
  const lostLocation = params.get('lostLocation');

  console.log(item, lostDate, lostLocation);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/lost-items', {
          params: {
            lostDate,
            item,
            lostLocation,
          },
        });

        const data = response.data;
        console.log('lost-items', data);

        setCardDatas(data);
        setIsLoading(false);
      } catch (error) {
        console.error('API 호출 오류:', error);
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>카드 뷰 예제</h1>

      <GridWrapper>
        {isLoading ? (
          // 초기 데이터 로딩 중인 경우 스켈레톤 표시
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <CardViewSkeleton key={index} />
            ))}
          </>
        ) : (
          // 데이터 로딩이 완료된 경우 카드 데이터 표시
          cardData.map((card, index) => (
            <CardView
              key={index}
              title={card.item}
              content={card.content}
              img={card?.img}
            />
          ))
        )}
      </GridWrapper>
    </div>
  );
};

export default List;

// TODO: 데이터를 동적으로 불러오기
const cardData = Array.from({ length: 16 }, (_, index) => ({
  item: `카드 제목 ${index + 1}`,
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
