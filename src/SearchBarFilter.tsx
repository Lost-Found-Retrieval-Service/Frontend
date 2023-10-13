import React from 'react';


  


export default function SearchBarFilter() {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

    const handleFilterButtonClick = () => {
    if (turnedOnInput !== null) {
      setLostItem((lostItem) => ({
        ...lostItem,
        [turnedOnInput]: inputValue,
      }));
      setTurnedOnInput(null);
    }
  };

    return {turnedOnInput && (
        <div>
          <input
            type="text"
            value={inputValue}
            placeholder={`${turnedOnInput}을 입력하세요`}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleFilterButtonClick}>
            클릭
          </button>
        </div>
      )};
    

}



