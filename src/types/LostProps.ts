// CardViewProps 타입 정의
export interface LostProps {
  item: string;
  title: string;
  date: string;
  atc_id: string;
  image?: string;
  onClick: () => void;
}
