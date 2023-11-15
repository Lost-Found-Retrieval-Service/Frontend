import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import IsLostContext from '../contexts/IsLostContext';

interface DetailProps {
  item: string;
  date: string;
  detail: string;
  image?: string;
  location_storing: string;
  tel: string;
}

const Detail = () => {
  const params = new URLSearchParams(location.search);
  const atc_id = params.get('atc_id');
  console.log('id', atc_id);
  const { isLost } = useContext(IsLostContext)!;

  const [detail, setDetail] = useState<DetailProps>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(isLost ? '/lost' : '/found', {
          baseURL: process.env.REACT_APP_API_URL,
          params: {
            atc_id,
          },
        });

        const data = response.data;
        console.log('lost-items detail', data.result[0]);
        setDetail(data.result[0]);
      } catch (error) {
        console.error('API 호출 오류:', error);
        // setIsLoading(false);
      }
    };

    fetchData();
  }, [atc_id]);

  // TODO: 데이터 동적으로 변경
  return (
    <div>
      {detail && (
        <Container>
          <Content>
            <CardImg src={detail.image} />
            <Info>
              <Title>물품 분류</Title>
              <p>{detail.item}</p>
              <Title>설명</Title>
              <p>{detail.detail}</p>
              <Title>습득 시점</Title>
              <p>{detail.date}</p>
              <Title>보관 위치</Title>
              <p>{detail.location_storing}</p>
              <Title>전화번호</Title>
              <p>{detail.tel}</p>
            </Info>
          </Content>
        </Container>
      )}
    </div>
  );
};

export default Detail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 3rem;
  gap: 1rem;
`;

const CardImg = styled.img`
  width: 600px; /* 원하는 이미지 너비 */
  height: 400px; /* 원하는 이미지 높이 */
  object-fit: contain;
  flex: 1;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 36px;
`;
