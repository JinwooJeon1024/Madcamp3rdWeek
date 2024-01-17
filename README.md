# CAN, VAS
**사용자가 직접 커스터마이징이 가능한 시작 웹사이트**
<img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/36bf22fe-fdba-4ac4-aaa7-74b1af482f92" width="30%"/>



## 프로젝트 소개
<br>

## 개발 기간
* 24.1.11일 - 24.01.17일

### 맴버구성
 - 정우현 (카이스트 전기전자공학부 19학번)
 - 전진우 (카이스트 전산학부 21학번)

### 개발 환경
- **Front-end** : React, TypeScript
- **Back-end** : Node.js, Express
- **Database** : MongoDB
- **OS** : Cross Platform
- **IDE** : Visual Studio Code

## 주요 기능
#### 웹 커스터마이징
<p align="center">
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/f5f76342-d827-486d-a466-cc2686951d06" width="30%"/>
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/c03442ae-3f3e-4529-a1b7-857545eb3b88" width="30%"/>

</p>

- **Major Features** : 사용자는 원하는 위치에 원하는 크기로 위젯을 배치하고, 북마크나 이미지도 지원합니다. 자신의 취향에 맞게 시작 페이지를 꾸밀 수 있습니다. 
- **기술 설명** : React - draggable 라이브러리를 통해 각 위젯들의 위치를 변경할 수 있습니다. 위젯에 position:absolute, 부모 요소에 드래그의 bound를 선언하여 자유롭게 움직이되 영역 안에서만 움직이도록 하였습니다. 위젯 우측 하단의 icon의 MouseEvent를 관리하여 하단 icon을 드래그할 때 icon의 위치에 따라 위젯의 크기를 조정합니다. useEffect를 통해 size가 바뀔 때마다 위젯 크기를 업데이트합니다.

#### 커스터마이징 정보 저장
<p align="center">
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/ffcb4201-c628-4d14-be13-a9c38c0be94f" width="30%" style="margin-right:10px;"/>
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/1982b3c6-ce3b-4f0a-9954-1654fb62140c" width="30%"/>
</p>

- **Major Features** : DB에 사용자가 구성한 웹페이지가 저장되어 언제 어디서든 자신이 커스터마이징한 페이지로 웹을 시작할 수 있습니다. 
- **기술 설명** : recoil 라이브러리를 통해 위젯 정보를 관리합니다. 사용자가 내용을 편집하고 저장하면 DB에 저장됩니다. useEffect를 이용해 페이지가 마운트 될 때 DB에서 데이터를 받아오도록 하였습니다. 변경사항이 마음에 들지 않는다면 편집을 시작할 때 관리한 상태로 되돌아갑니다. 


#### 계정 관리
<p align="center">
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/82d0b487-db41-40b5-915e-30e63b9f13be" width="30%" style="margin-right:10px;"/>
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/6f7817fa-7061-437b-9dd2-eca49c358bcd" width="30%"/>
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/26a81d06-0d65-4186-82b3-78558ea6d450" width="30%"/>

</p>

- **Major Features** : 원활한 사용을 위해 로그인 유지, 로그아웃, 계정 삭제의 기능을 지원합니다.
- **기술 설명** : JWT 토큰을 이용해 사용자를 구분합니다. 
