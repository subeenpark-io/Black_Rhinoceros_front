import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppSelector } from 'app/hooks/useRedux';

const DagStateBar = () => {
  const { dagStatus, dagStatusLoading, dagStatusSuccessful } = useAppSelector(
    state => state.datapage,
  );

  // const renderedStatus = () => {
  //   switch (dagStatus) {
  //     case null:
  //       if (!dagStatusLoading) {
  //         return null;
  //       } else {
  //         return (
  //           <>
  //             <div>loading</div>
  //             <Spinner />
  //           </>
  //         );
  //       }

  //     case 'running':
  //       return (
  //         <>
  //           <div>running</div>
  //           <Spinner />
  //         </>
  //       );

  //     case 'finished':
  //       return (
  //         <>
  //           <div>finished</div>
  //           <Checkmark />
  //         </>
  //       );

  //     case 'failed':
  //       return 'failed';
  //   }
  // };

  const renderedStatus = () => {
    if (!dagStatusLoading && !dagStatusSuccessful) {
      return null;
    }
    if (dagStatusLoading && !dagStatusSuccessful) {
      return (
        <>
          <div>running</div>
          <Spinner />
        </>
      );
    }
    if (!dagStatusLoading && dagStatusSuccessful) {
      return (
        <>
          <div>finished</div>
          <Checkmark />
        </>
      );
    }
  };
  return (
    <Container>
      <Title></Title>
      <Status>{renderedStatus()}</Status>
    </Container>
  );
};

export default DagStateBar;

const Container = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
`;

const Status = styled.div`
  display: flex;
  width: 140px;
  justify-content: space-between;
  align-items: center;
`;

const rotate = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
	`;

const Spinner = styled.div`
  font-size: 2.5px;
  right: 18px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(176, 176, 176, 0.2);
  border-right: 1.1em solid rgba(176, 176, 176, 0.2);
  border-bottom: 1.1em solid rgba(176, 176, 176, 0.2);
  border-left: 1.1em solid #b0b0b0;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${rotate} 1.1s infinite linear;
  animation: ${rotate} 1.1s infinite linear;
  border-radius: 50%;
  width: 10em;
  height: 10em;

  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`;

const Checkmark = styled.div`
  position: relative;
  display: inline-block;
  width: 25px;
  height: 25px;
  right: 18px;
  bottom: 6px;

  &:before {
    position: absolute;
    left: 0;
    top: 50%;
    height: 50%;
    width: 3px;
    background-color: #56cc41;
    content: '';
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
  }

  &:after {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    background-color: #56cc41;
    content: '';
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
  }
`;
