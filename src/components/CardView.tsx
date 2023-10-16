import React from 'react';
import styled from 'styled-components';
import { LostProps } from '../types/LostProps';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  min-height: 300px;
  margin: 16px;
  cursor: pointer;

  transition: transform 0.2s ease-in-out; /* duration을 0.2초로 변경 */
  &:hover {
    transform: translateY(-5px); /* 떠오르는 애니메이션 */
  }
`;

const CardImg = styled.img`
  width: 320px; /* 원하는 이미지 너비 */
  height: 170px; /* 원하는 이미지 높이 */
  object-fit: contain;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardContent = styled.div`
  font-size: 16px;
  margin-bottom: 1rem;
`;

const SubInfo = styled.div`
  color: gray;
  font-size: 12px;
`;

// TODO: 데이터를 동적으로 불러오기
// TODO: 데이터 형식 수정하기
const CardView = ({ item, title, date, image, atc_id, onClick }: LostProps) => {
  return (
    <CardWrapper key={`id-${atc_id}`} onClick={onClick}>
      {image && <CardImg src={image} alt="" />}
      <ContentWrapper>
        <CardTitle>{item}</CardTitle>
        <CardContent>{title}</CardContent>
        <SubInfo>{date}</SubInfo>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default CardView;
