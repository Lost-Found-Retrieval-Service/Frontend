import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CardView from '../components/CardView';
import CardViewSkeleton from '../components/CardViewSkeleton';
import { LostProps } from '../types/LostProps';
import { filteredItem } from '../types/FilteredItem';
import IsLostContext from '../contexts/IsLostContext';

// TODO: 무한 스크롤? 페이지네이션? 구현
const Lost = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cardDatas, setCardDatas] = useState([]);
  const { setIsLost } = useContext(IsLostContext)!;

  const params = new URLSearchParams(location.search);
  const item = params.get('item');
  const date = params.get('date');
  const location_detail = params.get('location_detail');
  const location_city = params.get('location_city');
  const office = params.get('office');

  useEffect(() => {
    console.log(item, typeof item);
    console.log(date, typeof date);
    console.log(location_detail, typeof location_detail);
    console.log(location_city, typeof location_city);
    console.log(office, typeof office);

    const fetchData = async () => {
      try {
        const response = await axios.get('/lost', {
          baseURL: process.env.REACT_APP_API_URL,
          params: {
            item,
            date,
            location_detail,
            location_city,
            office,
          },
        });

        const data = response.data;
        console.log('lost-items', data.result);
        const filteredResult = data.result.filter(
          // 이미지가 있는 item만 필터
          (item: filteredItem) =>
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
    setIsLost(true);
    navigate(`/detail?atc_id=${id}`);
  };

  return (
    <Container>
      <Title>분실물</Title>

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
          cardDatas?.map((card: LostProps, i: number) => (
            <CardView
              key={i}
              item={card.item}
              title={card.title}
              date={card.date}
              image={card?.image}
              atc_id={card.atc_id}
              onClick={() => onClick(card.atc_id)}
            />
          ))
        )}
      </GridWrapper>
    </Container>
  );
};

export default Lost;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-gap: 16px;
  grid-auto-flow: row;
  justify-content: center;
  margin: 2rem;
`;

const Title = styled.h1`
  padding-left: 8rem;
`;
