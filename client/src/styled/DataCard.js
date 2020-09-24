import styled from 'styled-components';

const DataCard = styled.div`
max-width: 200px;
max-height: 500px;
border: 1px solid light-grey;
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
padding: 20px;
margin: 25px auto;
text-align: center;
img {
  margin: 0 auto;
  display block;
  width: 100%;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
   -o-appearance: none;
    appearance: none;
  height: 25px;
  border: none;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 4px;
}
`;

export default DataCard