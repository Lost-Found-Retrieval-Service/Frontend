import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CardView from '../components/CardView';
import CardViewSkeleton from '../components/CardViewSkeleton';
import { FoundProps } from '../types/Foundprops';

// TODO: 무한 스크롤? 페이지네이션? 구현
const Found = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cardDatas, setCardDatas] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);

  const params = new URLSearchParams(location.search);
  const item = params.get('item');
  const date = params.get('date');
  const location_storing = params.get('location_storing');
  const location_found = params.get('location_found');
  const office = params.get('office');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + '/found',
          {
            params: {
              date,
              item,
              location_storing,
              location_found,
              office,
            },
          },
        );

        const data = response.data;
        console.log('lost-items', data.result);

        const filteredResult = data.result.filter(
          (item: { image: string }) =>
            item.image !==
            'https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif',
        );

        setCardDatas(filteredResult);

        // setCardDatas(data.result);
        setIsLoading(false);
      } catch (error) {
        console.error('API 호출 오류:', error);
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onClick = (id: string) => {
    console.log(id);
    navigate(`/detail?atc_id=${id}`);
  };

  return (
    <div>
      <h1>습득물</h1>

      <GridWrapper>
        {isLoading ? (
          // 초기 데이터 로딩 중인 경우 스켈레톤 표시
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <CardViewSkeleton key={i} />
            ))}
          </>
        ) : (
          // 데이터 로딩이 완료된 경우 카드 데이터 표시
          cardDatas &&
          cardDatas?.map((card: FoundProps, i: number) => (
            <CardView
              key={i}
              item={card.item}
              title={card.detail}
              date={card.date}
              image={card?.image}
              atc_id={card.atc_id}
              onClick={() => onClick(card.atc_id)}
            />
          ))
        )}
      </GridWrapper>
    </div>
  );
};

export default Found;

// TODO: 데이터를 동적으로 불러오기
// const cardData = Array.from({ length: 16 }, (_, index) => ({
//   item: `카드 제목 ${index + 1}`,
//   content: `카드 내용 ${index + 1}`,
//   img: projectImg,
// }));

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-gap: 16px;
  grid-auto-flow: row;
  justify-content: center;
  margin: 2rem;
`;
