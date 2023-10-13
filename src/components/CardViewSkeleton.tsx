import React from 'react';
import styled, { keyframes } from 'styled-components';

// 스켈레톤 애니메이션 효과 정의
const gradientAnimation = keyframes`
 0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -100% 0;
  }
 
`;

// 스켈레톤 스타일링
const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0; /* 스켈레톤 배경색 */
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  min-height: 300px;
  margin: 16px;
`;

const SkeletonImg = styled.div`
  width: 320px; /* 원하는 이미지 너비 */
  height: 170px; /* 원하는 이미지 높이 */
  margin-bottom: 16px; /* 이미지와 내용 간격 */
  background: linear-gradient(90deg, #ccc, #fff, #ccc);
  background-size: 200% 100%;
  animation: ${gradientAnimation} 5s linear infinite; /* 3초 간격으로 반복 */
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const SkeletonTitle = styled.div`
  height: 18px; /* 내용 높이 */
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #ccc, #fff, #ccc);
  background-size: 200% 100%;
  animation: ${gradientAnimation} 5s linear infinite; /* 3초 간격으로 반복 */
`;

const SkeletonContent = styled.div`
  height: 16px; /* 내용 높이 */
  margin-bottom: 1rem; /* 내용과 내용 간격 */
  background: linear-gradient(90deg, #ccc, #fff, #ccc);
  background-size: 200% 100%;
  animation: ${gradientAnimation} 5s linear infinite; /* 3초 간격으로 반복 */
`;

const SubInfo = styled.div`
  height: 12px; /* 서브 정보 높이 */
  width: 25%; /* 서브 정보 너비 */
  background: linear-gradient(90deg, #ccc, #fff, #ccc);
  background-size: 200% 100%;
  animation: ${gradientAnimation} 5s linear infinite; /* 3초 간격으로 반복 */
`;

// TODO: 실제 데이터 로딩 시에는 스켈레톤 UI 대신 데이터를 표시
const CardViewSkeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonImg />
      <ContentWrapper>
        <SkeletonTitle />
        <SkeletonContent></SkeletonContent>
        <SubInfo></SubInfo>
      </ContentWrapper>
    </SkeletonWrapper>
  );
};

export default CardViewSkeleton;
