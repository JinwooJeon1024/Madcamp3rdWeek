# CAN, VAS

<img src="https://github.com/JinwooJeon1024/Madcamp3rdWeek/assets/76899099/8ce11897-5bf2-4436-a201-87e0bcce84e5" width="30%"/>



## 프로젝트 소개
**사용자가 직접 커스터마이징이 가능한 시작 웹사이트**

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
 <img width="40%" alt="edit에서 위젯 추가" src="https://github.com/JinwooJeon1024/Madcamp3rdWeek/assets/76899099/64806633-7a09-45dd-a1a7-2d59b0e66a04" style="margin-right:30px">
 <img width="40%" alt="편집 저장" src="https://github.com/JinwooJeon1024/Madcamp3rdWeek/assets/76899099/0f00810e-dd14-4885-9692-302c6d76347d">
</p>
<p align="center">
 <img width="40%" alt="위젯 이동" src="https://github.com/JinwooJeon1024/Madcamp3rdWeek/assets/76899099/26b5514b-478b-44a2-8e58-192c64adf79d" style="margin-right:30px">
 <img width="40%" alt="edit 메뉴바 이동 " src="https://github.com/JinwooJeon1024/Madcamp3rdWeek/assets/76899099/fdf5204c-d35f-4b22-b70d-62b9cfe5855d">
</p>

- **Major Features** : 사용자는 원하는 위치에 원하는 크기로 위젯을 배치하고, 북마크나 이미지도 지원합니다. 자신의 취향에 맞게 시작 페이지를 꾸밀 수 있습니다. 
- **기술 설명** : React - draggable 라이브러리를 통해 각 위젯들의 위치를 변경할 수 있습니다. 위젯에 position:absolute, 부모 요소에 드래그의 bound를 선언하여 자유롭게 움직이되 영역 안에서만 움직이도록 하였습니다. 위젯 우측 하단의 icon의 MouseEvent를 관리하여 하단 icon을 드래그할 때 icon의 위치에 따라 위젯의 크기를 조정합니다. useEffect를 통해 size가 바뀔 때마다 위젯 크기를 업데이트합니다.

#### 커스터마이징 정보 저장
<p align="center">
  <img width="40%" alt="배경 이미지 설정" src="https://github.com/JinwooJeon1024/Madcamp3rdWeek/assets/76899099/c3e90623-d07c-4914-b415-dd4b0429782a" style="margin-right:30px">
  <img width="40%" alt="배경 이미지 적용" src="https://github.com/JinwooJeon1024/Madcamp3rdWeek/assets/76899099/36123645-9e22-42f7-b506-38c52b7d64b7">
</p>


- **Major Features** : DB에 사용자가 구성한 웹페이지가 저장되어 언제 어디서든 자신이 커스터마이징한 페이지로 웹을 시작할 수 있습니다. 
- **기술 설명** : recoil 라이브러리를 통해 위젯 정보를 관리합니다. 사용자가 내용을 편집하고 저장하면 DB에 저장됩니다. useEffect를 이용해 페이지가 마운트 될 때 DB에서 데이터를 받아오도록 하였습니다. 변경사항이 마음에 들지 않는다면 편집을 시작할 때 관리한 상태로 되돌아갑니다. 


#### 계정 관리
<p align="center">
  <img width="40%" alt="home" src="https://github.com/JinwooJeon1024/Madcamp3rdWeek/assets/76899099/05c2d3c8-fd89-4ee1-a17b-f23a0722977b" style="margin-right:30px";>
  <img width="40%" alt="login_email" src="https://github.com/JinwooJeon1024/Madcamp3rdWeek/assets/76899099/16b0aae9-5eca-4a95-a098-c4292a3829be">
</p>
<p align="center">
  <img width="40%" alt="password" src="https://github.com/JinwooJeon1024/Madcamp3rdWeek/assets/76899099/c116a973-6153-4bb2-96fd-069a854e2788" style="margin-right:30px";>
  <img width="40%" alt="setting" src="https://github.com/JinwooJeon1024/Madcamp3rdWeek/assets/76899099/31a2077e-1e0e-4664-8d6b-da5651491982">
</p>

- **Major Features** : 원활한 사용을 위해 로그인 유지, 로그아웃, 계정 삭제의 기능을 지원합니다.
- **기술 설명** : JWT 토큰을 이용해 사용자를 구분합니다. 
