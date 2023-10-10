import React from 'react';
import styled from 'styled-components';
import { CardViewProps } from '../types/CardViewProps';

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
`;

const CardImg = styled.img`
  width: 320px; /* 원하는 이미지 너비 */
  height: 170px; /* 원하는 이미지 높이 */
  object-fit: contain;
  /* border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
`;

const ContentWrapper = styled.div`
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
const CardView = ({ title, content, img }: CardViewProps) => {
  return (
    <CardWrapper>
      {img && <CardImg src={img} alt="" />}
      <ContentWrapper>
        <CardTitle>{title}</CardTitle>
        <CardContent>{content}</CardContent>
        <SubInfo>2023년 10월 10일</SubInfo>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default CardView;
