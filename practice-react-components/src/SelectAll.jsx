import React, { useState } from "react";
import styled from "styled-components";

const SelectAll = () => {
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Dogs", checked: false },
    { id: 2, label: "Cats", checked: false },
    { id: 3, label: "Cows", checked: false },
    { id: 4, label: "Deers", checked: false },
  ]);

  const handleChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxes(newCheckboxes);
  };

  const handleSelectAll = () => {
    const isCheckAll = checkboxes.every((checkbox) => checkbox.checked);
    const newCheckboxes = checkboxes.map((checkbox) => ({
      ...checkbox,
      checked: isCheckAll ? !checkbox.checked : true,
    }));
    setCheckboxes(newCheckboxes);
  };

  return (
    <Container>
      <CheckboxContainer data-testid="checkbox-container">
        {checkboxes.map((checkbox, index) => (
          <CheckboxLabel key={checkbox.id}>
            <input
              type="checkbox"
              checked={checkbox.checked}
              onChange={() => {
                handleChange(index);
              }}
            />
            {checkbox.label}
          </CheckboxLabel>
        ))}
      </CheckboxContainer>
      <SelectAllButton data-testid="button" onClick={handleSelectAll}>
        Select All
      </SelectAllButton>
    </Container>
  );
};

export default SelectAll;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin: 24px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  color: blue;
`;

const SelectAllButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  margin-top: 24px;

  &:hover {
    opacity: 0.8;
  }
`;
