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
#### 회원가입 및 로그인
<p align="center">
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/ffcb4201-c628-4d14-be13-a9c38c0be94f" width="30%" style="margin-right:10px;"/>
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/1982b3c6-ce3b-4f0a-9954-1654fb62140c" width="30%"/>
</p>

- **Major Features** : DB에 각 사용자별로 구성한 웹페이지가 모두 저장되어서, 언제 어디서든 자신이 커스터마이징한 페이지로 웹을 시작할 수 있습니다. 
- **기술 설명** : 사용한 모든 위젯들에 대해서 위치, 크기, 기타 정보 등을 DB에 모두 저장이 되며, 각 사용자 계정별 JWT 토큰을 이용해 사용자를 구분합니다. 

#### 편집 및 저장
<p align="center">
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/f5f76342-d827-486d-a466-cc2686951d06" width="30%"/>
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/c03442ae-3f3e-4529-a1b7-857545eb3b88" width="30%"/>

</p>

- **Major Features** : 사용자가 원하는 위젯을 원하는 위치에 원하는 크기로 배치하고, 원하는 북마크나 이미지를 업로드할 수 있습니다. 자신의
취향에 맞게 시작 페이지를 꾸밀 수 있습니다.
- **기술 설명** : React - draggable 라이브러리로 각 위젯을 드래그앤드롭으로 이동시킬 수 있게 하였고, 모든 위젯들은 recoil 상태 관리 라이브러리를 사용하여 새로운 위젯이 추가되거나 삭제되거나, 기존 위젯이 변경되었을 때 올바르게 서버에 동기화할 수 있도록하였습니다.  

#### 맛집로또
<p align="center">
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/82d0b487-db41-40b5-915e-30e63b9f13be" width="30%" style="margin-right:10px;"/>
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/6f7817fa-7061-437b-9dd2-eca49c358bcd" width="30%"/>
  <img src="https://github.com/JinwooJeon1024/Madcamp1stWeek/assets/104386015/26a81d06-0d65-4186-82b3-78558ea6d450" width="30%"/>

</p>

- **Major Features** : 먹고 싶은 음식 카테고리를 원하는 만큼 고르면, 해당하는 카테고리 중에서 랜덤으로 식당을 골라줍니다.
- **기술 설명** : ImageButton을 이용해서 각 음식 카테고리를 선택할 수 있게 했고, 애니메이션을 이용해 로또 공이 움직이는 것을 구현했습니다. 마찬가지로 Dialog를 이용해서 팝업을 구현했고 선택한 카테고리에 해당하는 음식들만 리스트에 추가해서 리스트 중 랜덤으로 골라서 나타나게 만들었습니다.
