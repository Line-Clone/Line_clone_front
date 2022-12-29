# 카카오톡 클론 코딩

## 📝 개발 백그라운드

그 동안 기본적인 CRUD는 항해99에서 실행하는 과제와 미니 프로젝트를 통해 몇번 해봤기 때문에, 실전 프로젝트를 실행하기 전에 새로운 시도를 해보고 싶었습니다.

그 중에서도 채팅이 굉장히 challenging하기 때문에 도전해보았고, 1:1까지는 구현할 수 없었기 때문에 카카오톡 오픈 채팅부분을 클론 코딩 해보았습니다.

이번 클론 코딩 동안 구현한 기능은:

1. 로그인/회원가입
2. 채팅방 생성
3. 채팅방 입장 후 다수와 채팅
    - 채팅 방 입장 시 나와 타인의 말풍선이 구분됩니다.
 

<br />

## 👨‍👩‍👧‍👦 개발 기간 & 팀원

- 2022.12.23 ~ 2022.12.29

| 이름 | 개인 블로그 링크 | 개인 깃허브 링크 | FE / BE |
| --- | --- | --- | --- |
| 이상현 | https://velog.io/@dltkdgus1850 | https://github.com/Sangtriever | BE 📤 |
| 이상훈 | https://23hoon.tistory.com/ | https://github.com/leemeo3 | BE 📤 |
| 김아영 | https://isladaisy.tistory.com/ | https://github.com/isladaisy | BE 📤 |
| 이정민 | https://velog.io/@kkookk55 | https://github.com/kkookk55 | FE 📨 |
| 김현빈 | https://velog.io/@hailey199535 | https://github.com/kimmy199535 | FE 📨 |

<br />



## 🛠 기술 스택

### ✨ Back-End
- java
- gradle
- spring
- springboot
- sockjs
- stomp
- jwt
- mysql


### ✨ Front-End
- javascript
- react
- redux
- redux-toolkit
- axios
- sockjs
- stomp

<br />

## 📽 시연 영상
https://www.youtube.com/watch?v=hxPeeH3jkm4

<br />



## ❗️ 트러블 슈팅

1. 

```
const onValid = async (data) => {
    await postLogin(data).then((response) =>
      localStorage.setItem("id", response.headers.authorization)
    );
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onValid(data).then(() => {
          navigation("/main");
        });
      })}
    >
```

[문제]: 비동기 처리 한 함수의 결과 순서가 꼬여서 생긴 문제
    
[원인]: 로컬 스토리지에 토큰이 저장되기 전에 메인 페이지로 이동해서 채팅방 리스트가 불러지지 않음
    
[해결]: 로컬 스토리지에 토큰이 저장되는 함수가 온전히 끝나고 나서 메인 페이지로 이동하는 코드로 수정.

2. 

```
function recvMessage(recv) {
console.log("메세지 수신");
messages.push({
	type: recv.type,
	sender: recv.type === "ENTER" ? "" : recv.sender,
	message: recv.type === "ENTER" ? `[알림] ${recv.message}` : recv.message,
});
setViewMessages([messages]);
}
```

[문제]: 
- useState로 관리하는 viewMessages의 값을 배열을 담은 변수 messages로 변경할수 있도록 코드 설정.
- messages에 새로운 요소가 추가될때마다 viewMessages의  값이 바뀌어서 리랜더링이 일어나도록 설계하였는데 리렌더링이 일어나지 않음.

[원인]:
- messages가 참조하고 있는 주소의 값은 변하지않고 해당 주소의 데이터값만 변경 되었기 때문

[해결]:
- `setViewMessages([messages]);` 코드를    `setViewMessages([...messages]);`  로 바꾸어 문제 해결

<br />



## 🎨 와이어 프레임 (카카오톡으로 노선을 변경했기 때문에 거의 쓰이지 않았습니다...🫠)
![image](https://user-images.githubusercontent.com/113615839/209914986-c20a7c0a-6b50-4141-acac-74921212798f.png)

[피그마 링크 ](https://www.figma.com/file/MPfQUpfR0u5nVCw5Vf4Mvv/LINE-%ED%81%B4%EB%A1%A0-%EC%BD%94%EB%94%A9?node-id=0%3A1&t=cB9EpV2sFOEmLXnx-0)

<br />



## 📖 API 명세서

[API 명세서](https://www.notion.so/f5ee37fc5b664dad9bd9767653a88496)

---
