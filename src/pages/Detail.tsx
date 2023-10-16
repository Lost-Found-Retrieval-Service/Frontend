import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface DetailProps {
  item: string;
  date: string;
  detail: string;
  image?: string;
  location_detail: string;
  tel: string;
}

const Detail = () => {
  const params = new URLSearchParams(location.search);
  const atc_id = params.get('atc_id');
  console.log('id', atc_id);

  const [detail, setDetail] = useState<DetailProps>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/lost', {
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
      <h1>Detail Page</h1>

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
              <Title>분실 지역</Title>
              <p>{detail.location_detail}</p>
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
