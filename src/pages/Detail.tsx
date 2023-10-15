import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface DetailProps {
  item: string;
  date: string;
  image: string;
  location_detail: string;
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
          <Item>{detail.item}</Item>

          <Content>
            <CardImg src={detail.image} />
            <Info>
              <Title>습득 시점</Title>
              <p>{detail.date}</p>
              <Title>분실 지역</Title>
              <p>{detail.location_detail}</p>
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
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 5rem;
`;

const CardImg = styled.img`
  width: 600px; /* 원하는 이미지 너비 */
  height: 400px; /* 원하는 이미지 높이 */
  object-fit: contain;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 40px;
`;
