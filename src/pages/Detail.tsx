import React, { useContext, useEffect, useRef, useState } from 'react';
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
  const { isLost } = useContext(IsLostContext)!;

  const [detail, setDetail] = useState<DetailProps>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myLocation, setMyLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 37.4990008, longitude: 126.8966524 });

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
        setDetail(data.result[0]);
      } catch (error) {
        console.error('API 호출 오류:', error);
        // setIsLoading(false);
      }
    };

    fetchData();
  }, [atc_id]);

  const getMap = async (query: string) => {
    try {
      const response = await axios.get('/naver-api/v1/search/local.json', {
        params: { query },
        headers: {
          'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET,
        },
      });

      const address = response.data.items[0].roadAddress;

      // 좌표 변환
      window.naver.maps.Service.geocode(
        {
          query: address,
        },
        function (status: number, response: object) {
          if (status !== window.naver.maps.Service.Status.OK) {
            return alert('Something wrong!');
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result = (response as any).v2,
            items = result.addresses;

          if (items.length > 0) {
            const { x, y } = items[0];

            setMyLocation({
              latitude: parseFloat(y),
              longitude: parseFloat(x),
            });
          }
        },
      );
    } catch (error) {
      console.error('도로명 주소 변환 오류:', error);
    }
  };

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && myLocation) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(
          myLocation.latitude,
          myLocation.longitude,
        ),
        zoom: 18,
      });

      // 마커 위치 설정
      const markerPosition = new window.naver.maps.LatLng(
        myLocation.latitude,
        myLocation.longitude,
      );

      // 마커 생성
      const marker = new window.naver.maps.Marker({
        position: markerPosition,
        map: map,
      });

      // 정보 창에 표시할 텍스트
      const contentString = `
      <div style="padding:10px;">
        <b>${detail?.location_storing ?? '정확한 위치를 알 수 없습니다.'}</b>
      </div>
    `;

      // 정보 창 생성
      const infowindow = new window.naver.maps.InfoWindow({
        content: contentString,
      });

      infowindow.open(map, marker);

      // 지도의 중심을 마커의 위치로 설정
      map.setCenter(markerPosition);
    }
  }, [myLocation]);

  useEffect(() => {
    if (detail) {
      getMap(detail.location_storing);
    }
  }, [detail]);

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
      {detail?.location_storing && (
        <div
          id="map"
          ref={mapRef}
          style={{
            width: '900px',
            height: '600px',
            margin: 'auto',
            marginBottom: '5rem',
          }}
        ></div>
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
