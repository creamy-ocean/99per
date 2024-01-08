# 99per - 당신과 딱 맞는 게임 친구
## 프로젝트 소개
> 내가 원하는 게임 친구를 찾을 수 있는 웹 사이트입니다  
> 게임, 나이대 등의 필터링을 통해 나와 딱 맞는 게임 친구를 찾을 수 있습니다  

<br/>

## 제작 계기
- 평소에 게임을 즐겨 하는데, 친구들과 좋아하는 게임 장르가 달라서 게임을 같이 플레이할 친구를 구하고 싶었습니다  
- 검색해보니 원하는 기능을 제공하는 플랫폼이 없어서 직접 해당 웹 사이트를 제작하게 되었습니다  

<br/>

## 배포 링크
[https://99per.netlify.app/](https://99per.netlify.app/)

<br/>

## 기능
* 로그인, 회원가입
    ![99%_로그인](https://github.com/creamy-ocean/e-commerce/assets/93719660/dd4003fd-c648-4624-a027-dc469112fe8d)
    ![99%_회원가입_2](https://github.com/creamy-ocean/creamy-ocean/assets/93719660/169ba69d-eed0-4c21-92dc-5cbdd795935b)
  
* 게임 친구 필터링
  - 게임, 성별, 나이, 숙련도, 관심사에 따른 다중 필터링 제공
  - 필터 적용 시 해당하는 유저의 프로필만 노출
    ![99%_필터링_2](https://github.com/creamy-ocean/e-commerce/assets/93719660/0af3c01b-bfec-40ce-93c6-f8eb666eda06)
  
* 내 프로필
  - 나의 게임 프로필만 모아 볼 수 있음
  - 새로운 게임 프로필을 생성할 수 있음
    ![99%_프로필생성](https://github.com/creamy-ocean/e-commerce/assets/93719660/df65a452-9990-4a90-ab65-04538f2cf03a)

## 기술
### 프론트엔드(React.js)
* 반응형 디자인
  - CSS Flex, vw 등의 속성을 이용해 반응형 웹 구현  
  ![99%_반응형_2](https://github.com/creamy-ocean/e-commerce/assets/93719660/071a1645-a185-4d23-864a-6480061091eb)
  ![99%_반응형](https://github.com/creamy-ocean/e-commerce/assets/93719660/a603c664-0c72-4729-a489-a5db27ed0c50)
* Sass(SCSS)
  - 변수 및 mixin을 사용하여 코드의 재사용성 높임
  
### 백엔드(Node.js)
* express-validator
  - 로그인, 회원가입 유효성 검사 구현
* nodemailer
  - 회원가입 시 이메일 인증 구현
